import test from "node:test";
import assert from "node:assert/strict";
import { sendBookingEnquiryNotification } from "../lib/email";

test("Email notification fallback safely records audit trail without crashing", async () => {
  const result = await sendBookingEnquiryNotification({
    bookingReference: "RC-TEST99",
    customerName: "Jane Doe",
    customerEmail: "jane.doe@example.com",
    vehicleName: "Toyota RAV4 AWD",
    pickupLocation: "JFK Airport",
    pickupDate: "2026-11-01",
    pickupTime: "10:00",
    returnLocation: "JFK Airport",
    returnDate: "2026-11-05",
    returnTime: "10:00",
    rentalDays: 4,
    dailyRate: 69.0,
    estimatedTotal: 276.0,
    currency: "USD",
  });

  assert.equal(result.success, true);
  assert.ok(["resend", "brevo", "local_audit_log"].includes(result.provider));
  assert.ok(result.messageId);
});
