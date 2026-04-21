import apiClient from "../api-client";
import { LoginCredentials } from "@/types/auth";

export const authApi = {
  login: async (credentials: LoginCredentials) => {
    const response = await apiClient.post("/auth/login", credentials);
    return response.data;
  },
  getMe: async () => {
    const response = await apiClient.get("/auth/me");
    return response.data;
  },
};
