# Implementation Plan - Retrieve Assessment Levels

Create a new API function and interface to retrieve assessment levels from the `/assessments/levels` endpoint.

## Proposed Changes

### [types/assessment.ts](file:///home/amandos/projetos/app/idp-ui/types/assessment.ts)
- Add a new interface `AssessmentLevel` that matches the requested JSON structure:
  ```typescript
  export interface AssessmentLevel {
    value: number;
    description: string;
  }
  ```

### [lib/api/assessments.ts](file:///home/amandos/projetos/app/idp-ui/lib/api/assessments.ts)
- Add a new function `getLevels` to the `assessmentApi` object:
  ```typescript
  getLevels: async () => {
    const response = await apiClient.get<AssessmentLevel[]>("/assessments/levels");
    return response.data;
  },
  ```

## Verification Plan

### Manual Verification
- Verify that the code compiles without errors.
- Ensure the `AssessmentLevel` interface correctly represents the JSON structure provided by the user.
