import test from "node:test";
import assert from "node:assert/strict";

function calculateRentalDaysAndTotal(pickupDateStr: string, returnDateStr: string, dailyRate: number) {
  const pickup = new Date(pickupDateStr);
  const returnD = new Date(returnDateStr);
  if (returnD < pickup) throw new Error("Return date before pickup");

  const diffTime = Math.abs(returnD.getTime() - pickup.getTime());
  const days = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  const total = Number((days * dailyRate).toFixed(2));
  return { days, total };
}

test("Rental duration and total calculation computes accurately", () => {
  const { days, total } = calculateRentalDaysAndTotal("2026-11-01", "2026-11-05", 58.0);
  assert.equal(days, 4);
  assert.equal(total, 232.0);
});

test("Same-day rental returns at least 1 minimum billing day", () => {
  const { days, total } = calculateRentalDaysAndTotal("2026-11-01", "2026-11-01", 69.0);
  assert.equal(days, 1);
  assert.equal(total, 69.0);
});

test("Inverted dates throw an error", () => {
  assert.throws(() => {
    calculateRentalDaysAndTotal("2026-11-05", "2026-11-01", 45.0);
  });
});
