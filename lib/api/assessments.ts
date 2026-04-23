import apiClient from "../api-client";
import { Assessment, PaginatedResponse, AssessmentDetails, AssessmentLevel, AssessmentAnswerDraft } from "@/types/assessment";

export const assessmentApi = {
  getUserAssessments: async (page = 0, size = 10) => {
    const response = await apiClient.get<PaginatedResponse<Assessment>>(
      `/assessments`,
      {
        params: { page, size },
      }
    );
    return response.data;
  },

  getAssessmentDetails: async (uuid: string) => {
    const response = await apiClient.get<AssessmentDetails>(`/assessments/${uuid}`);
    return response.data;
  },

  getQuestions: async () => {
    const response = await apiClient.get<AssessmentDetails>("/assessments/details");
    return response.data;
  },

  saveAnswers: async (uuid: string, answers: AssessmentAnswerDraft[]) => {
    const response = await apiClient.post(`/assessments/answers/${uuid}/drafts`, answers);
    return response.data;
  },

  getLevels: async () => {
    const response = await apiClient.get<AssessmentLevel[]>("/assessments/levels");
    return response.data;
  },
};
