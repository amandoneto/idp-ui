import { describe, it, expect, vi, beforeEach } from 'vitest';
import { assessmentApi } from './assessments';
import apiClient from '../api-client';

vi.mock('../api-client', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe('assessmentApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch user assessments', async () => {
    const mockData = { content: [], number: 0, size: 10, totalElements: 0 };
    (apiClient.get as any).mockResolvedValueOnce({ data: mockData });

    const result = await assessmentApi.getUserAssessments(0, 10);

    expect(apiClient.get).toHaveBeenCalledWith('/assessments', { params: { page: 0, size: 10 } });
    expect(result).toEqual(mockData);
  });

  it('should fetch assessment details', async () => {
    const mockDetails = { uuid: '123', categories: [] };
    (apiClient.get as any).mockResolvedValueOnce({ data: mockDetails });

    const result = await assessmentApi.getAssessmentDetails('123');

    expect(apiClient.get).toHaveBeenCalledWith('/assessments/123');
    expect(result).toEqual(mockDetails);
  });

  it('should save answers as draft', async () => {
    const answers = [{ uuid: 'q1', level: 3 }];
    (apiClient.post as any).mockResolvedValueOnce({ data: { success: true } });

    await assessmentApi.saveAnswers('123', answers);

    expect(apiClient.post).toHaveBeenCalledWith('/assessments/answers/123/drafts', answers);
  });

  it('should fetch assessment levels', async () => {
    const mockLevels = [{ value: 1, description: 'Basic' }];
    (apiClient.get as any).mockResolvedValueOnce({ data: mockLevels });

    const result = await assessmentApi.getLevels();

    expect(apiClient.get).toHaveBeenCalledWith('/assessments/levels');
    expect(result).toEqual(mockLevels);
  });
});
