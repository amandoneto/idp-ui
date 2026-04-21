"use client";

import { z } from "zod";
import { loginSchema } from "@/app/schemas/login";

export type LoginCredentials = z.infer<typeof loginSchema>;

export interface AuthState {
  user: import("./user").User | null;
  isPending: boolean;
}
