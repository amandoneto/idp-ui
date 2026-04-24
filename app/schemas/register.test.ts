import { describe, it, expect } from "vitest";
import { registerSchema } from "./register";

describe("registerSchema", () => {
  it("should validate a correct registration object", () => {
    const result = registerSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      verifyPassword: "password123",
    });
    expect(result.success).toBe(true);
  });

  it("should fail if name is too short", () => {
    const result = registerSchema.safeParse({
      name: "John",
      email: "john@example.com",
      password: "password123",
      verifyPassword: "password123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Name must be at least 5 characters long");
    }
  });

  it("should fail if name contains invalid characters", () => {
    const result = registerSchema.safeParse({
      name: "John 123",
      email: "john@example.com",
      password: "password123",
      verifyPassword: "password123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Name must only contain Latin characters");
    }
  });

  it("should fail if password is too short", () => {
    const result = registerSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      password: "1234567",
      verifyPassword: "1234567",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Password must be at least 8 characters long");
    }
  });

  it("should fail if passwords do not match", () => {
    const result = registerSchema.safeParse({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      verifyPassword: "different-password",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Passwords must match");
    }
  });
});
