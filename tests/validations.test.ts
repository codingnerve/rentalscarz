import test from "node:test";
import assert from "node:assert/strict";
import { BookingEnquirySchema } from "../lib/validations";

test("BookingEnquirySchema validates a correct booking enquiry", () => {
  const validData = {
    vehicleId: "toyota-corolla-sedan",
    customerName: "Alice Walker",
    customerEmail: "alice@example.com",
    customerPhone: "+1 (555) 234-5678",
    pickupLocationId: "jfk-airport-new-york",
    pickupLocationName: "John F. Kennedy International Airport (JFK)",
    returnLocationId: "jfk-airport-new-york",
    returnLocationName: "John F. Kennedy International Airport (JFK)",
    pickupDate: "2026-11-01",
    pickupTime: "10:00",
    returnDate: "2026-11-05",
    returnTime: "10:00",
    customerNotes: "Arriving on flight AA 100",
    driverAgeConfirmed: true,
    policyAcknowledged: true,
  };

  const result = BookingEnquirySchema.safeParse(validData);
  assert.equal(result.success, true);
});

test("BookingEnquirySchema rejects invalid email address", () => {
  const invalidData = {
    vehicleId: "toyota-corolla-sedan",
    customerName: "Alice Walker",
    customerEmail: "not-an-email",
    customerPhone: "+1 (555) 234-5678",
    pickupLocationId: "jfk-airport-new-york",
    pickupLocationName: "JFK Airport",
    returnLocationId: "jfk-airport-new-york",
    returnLocationName: "JFK Airport",
    pickupDate: "2026-11-01",
    pickupTime: "10:00",
    returnDate: "2026-11-05",
    returnTime: "10:00",
    driverAgeConfirmed: true,
    policyAcknowledged: true,
  };

  const result = BookingEnquirySchema.safeParse(invalidData);
  assert.equal(result.success, false);
  if (!result.success) {
    const emailError = result.error.issues.find((i) => i.path.includes("customerEmail"));
    assert.ok(emailError);
  }
});

test("BookingEnquirySchema rejects submission without policy acknowledgement", () => {
  const unacknowledged = {
    vehicleId: "toyota-corolla-sedan",
    customerName: "Alice Walker",
    customerEmail: "alice@example.com",
    customerPhone: "+1 (555) 234-5678",
    pickupLocationId: "jfk-airport-new-york",
    pickupLocationName: "JFK Airport",
    returnLocationId: "jfk-airport-new-york",
    returnLocationName: "JFK Airport",
    pickupDate: "2026-11-01",
    pickupTime: "10:00",
    returnDate: "2026-11-05",
    returnTime: "10:00",
    driverAgeConfirmed: true,
    policyAcknowledged: false, // rejected!
  };

  const result = BookingEnquirySchema.safeParse(unacknowledged);
  assert.equal(result.success, false);
});
