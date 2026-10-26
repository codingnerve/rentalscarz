import test from "node:test";
import assert from "node:assert/strict";
import {
  hashPassword,
  verifyPassword,
  createAdminSessionToken,
  verifyAdminSessionToken,
} from "../lib/auth";

test("Password hashing creates a verified PBKDF2 hash", () => {
  const password = "AdminPassword2026!";
  const hash = hashPassword(password);

  assert.ok(hash.includes(":"));
  assert.equal(verifyPassword(password, hash), true);
  assert.equal(verifyPassword("WrongPassword123", hash), false);
});

test("Session token generation & cryptographic verification", () => {
  const email = "admin@rentalscarz.co";
  const token = createAdminSessionToken(email, "admin");

  const verified = verifyAdminSessionToken(token);
  assert.equal(verified.valid, true);
  assert.equal(verified.email, email);
  assert.equal(verified.role, "admin");
});

test("Tampered session token fails verification", () => {
  const token = createAdminSessionToken("admin@rentalscarz.co", "admin");
  const tamperedToken = token + "xyz";

  const verified = verifyAdminSessionToken(tamperedToken);
  assert.equal(verified.valid, false);
});
