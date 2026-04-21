import apiClient from "../api-client";
import { Employee } from "@/types/employee";

export const employeesApi = {
  getProfile: async (): Promise<Employee> => {
    const { data } = await apiClient.get<Employee>("/employees");
    return data;
  },
};
