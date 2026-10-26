import test from "node:test";
import assert from "node:assert/strict";
import { prisma } from "../lib/prisma";

test("Database contains seeded vehicles", async () => {
  const count = await prisma.vehicle.count();
  assert.ok(count >= 10, `Expected at least 10 vehicles, found ${count}`);

  const corolla = await prisma.vehicle.findUnique({
    where: { slug: "toyota-corolla-sedan" },
  });
  assert.ok(corolla);
  assert.equal(corolla?.category, "economy");
  assert.equal(corolla?.dailyRate, 39.0);
});

test("Database contains international service hubs across US, UK, and Canada", async () => {
  const locations = await prisma.location.findMany();
  assert.ok(locations.length >= 8);

  const countries = new Set(locations.map((l) => l.country));
  assert.ok(countries.has("US"));
  assert.ok(countries.has("UK"));
  assert.ok(countries.has("CA"));
});

test("Booking status transition and reference lookup", async () => {
  // Query a sample booking
  const booking = await prisma.booking.findFirst({
    where: { bookingReference: "RC-849201" },
  });
  assert.ok(booking);
  assert.equal(booking?.bookingReference, "RC-849201");
  assert.ok(["Pending", "Under Review", "Confirmed"].includes(booking?.status || ""));
});
