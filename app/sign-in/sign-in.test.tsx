import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import SignIn from "./page";
import { useAuth } from "../context/auth-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

// Mock the dependencies
vi.mock("../context/auth-context", () => ({
  useAuth: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("sonner", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

// Mock Header component to avoid issues with its internal dependencies
vi.mock("../components/Header", () => ({
  default: () => <div data-testid="mock-header">Header</div>,
}));

describe("SignIn Component", () => {
  const mockPush = vi.fn();
  const mockLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({ push: mockPush });
    (useAuth as any).mockReturnValue({
      login: mockLogin,
      isPending: false,
    });
  });

  it("should render the sign-in form", () => {
    render(<SignIn />);
    expect(screen.getByText("Sign In", { selector: '[data-slot="card-title"]' })).toBeDefined();
    expect(screen.getByLabelText("Email")).toBeDefined();
    expect(screen.getByLabelText("Password")).toBeDefined();
    expect(screen.getByRole("button", { name: "Sign In" })).toBeDefined();
  });

  it("should show validation errors for invalid input", async () => {
    render(<SignIn />);
    const submitButton = screen.getByRole("button", { name: "Sign In" });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText("Invalid email format")).toBeDefined();
      expect(screen.getByText("Password is required")).toBeDefined();
    });
  });

  it("should call login and redirect on successful submission", async () => {
    mockLogin.mockResolvedValueOnce(undefined);
    render(<SignIn />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
      expect(toast.success).toHaveBeenCalledWith("Signed in successfully");
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });
  });

  it("should show error toast on login failure", async () => {
    const errorMessage = "Invalid credentials";
    mockLogin.mockRejectedValueOnce({
      isAxiosError: true,
      response: { data: { message: errorMessage } },
    });

    // Mock axios.isAxiosError since it's used in the catch block
    vi.mock("axios", async () => {
      const actual = await vi.importActual("axios") as any;
      return {
        ...actual,
        default: {
          ...actual.default,
          isAxiosError: (err: any) => err?.isAxiosError === true,
        },
        isAxiosError: (err: any) => err?.isAxiosError === true,
      };
    });

    render(<SignIn />);

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(errorMessage);
    });
  });

  it("should show loading state when isPending is true", () => {
    (useAuth as any).mockReturnValue({
      login: mockLogin,
      isPending: true,
    });

    render(<SignIn />);
    expect(screen.getByText("Signing in...")).toBeDefined();
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
