import crypto from "crypto";

const SALT_LENGTH = 16;
const KEY_LENGTH = 64;
const ITERATIONS = 100000;
const DIGEST = "sha512";

/**
 * Hash a password using PBKDF2 with a random salt.
 */
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(SALT_LENGTH).toString("hex");
  const derivedKey = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST)
    .toString("hex");
  return `${salt}:${derivedKey}`;
}

/**
 * Verify a plain password against the stored salt:hash.
 */
export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, key] = storedHash.split(":");
    if (!salt || !key) return false;
    const derivedKey = crypto
      .pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST)
      .toString("hex");
    return crypto.timingSafeEqual(Buffer.from(key), Buffer.from(derivedKey));
  } catch {
    return false;
  }
}

/**
 * Simple signed session token generator for admin auth.
 */
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET || "rentalscarz-production-admin-secret-key-2026";

export function createAdminSessionToken(email: string, role = "admin"): string {
  const payload = JSON.stringify({
    email,
    role,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  const encodedPayload = Buffer.from(payload).toString("base64url");
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(encodedPayload)
    .digest("base64url");
  return `${encodedPayload}.${signature}`;
}

export function verifyAdminSessionToken(
  token: string
): { valid: boolean; email?: string; role?: string } {
  try {
    if (!token || !token.includes(".")) return { valid: false };
    const [encodedPayload, signature] = token.split(".");
    const expectedSignature = crypto
      .createHmac("sha256", SESSION_SECRET)
      .update(encodedPayload)
      .digest("base64url");

    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return { valid: false };
    }

    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf-8"));
    if (Date.now() > payload.expiresAt) {
      return { valid: false };
    }

    return { valid: true, email: payload.email, role: payload.role };
  } catch {
    return { valid: false };
  }
}
