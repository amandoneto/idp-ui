import z from "zod";

export const registerSchema = z.object({
    name: z.string()
        .min(5, "Name must be at least 5 characters long")
        .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Name must only contain Latin characters"),
    email: z.email("Invalid email format"),
    password: z.string()
        .min(8, "Password must be at least 8 characters long")
        .max(20, "Password must be at most 20 characters long"),
    verifyPassword: z.string().min(1, "Please verify your password"),
}).refine((data) => data.password === data.verifyPassword, {
    message: "Passwords must match",
    path: ["verifyPassword"],
});

