import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SignUp from "./page";
import { useRouter } from "next/navigation";

// Mock dependencies
vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock("../components/Header", () => ({
  default: () => <div data-testid="mock-header">Header</div>,
}));

describe("SignUp Component", () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({ push: mockPush });
  });

  it("should render the sign-up form", () => {
    render(<SignUp />);
    expect(screen.getByText("Sign up")).toBeDefined();
    expect(screen.getByLabelText("Full Name")).toBeDefined();
    expect(screen.getByLabelText("Email")).toBeDefined();
    expect(screen.getByLabelText("Password")).toBeDefined();
    expect(screen.getByLabelText("Verify Password")).toBeDefined();
    expect(screen.getByRole("button", { name: "Create Account" })).toBeDefined();
  });

  it("should show validation errors for empty fields", async () => {
    render(<SignUp />);
    const submitButton = screen.getByRole("button", { name: "Create Account" });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Name must be at least 5 characters long")).toBeDefined();
      expect(screen.getByText("Invalid email format")).toBeDefined();
      expect(screen.getByText("Password must be at least 8 characters long")).toBeDefined();
      expect(screen.getByText("Please verify your password")).toBeDefined();
    });
  });

  it("should show error if passwords do not match", async () => {
    render(<SignUp />);

    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Verify Password"), {
      target: { value: "different" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Create Account" }));

    await waitFor(() => {
      expect(screen.getByText("Passwords must match")).toBeDefined();
    });
  });

  it("should call register (console.log) on successful submission", async () => {
    const consoleSpy = vi.spyOn(console, "log");
    render(<SignUp />);

    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Verify Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Create Account" }));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(expect.objectContaining({
        name: "John Doe",
        email: "john@example.com",
      }));
    });
  });
});
