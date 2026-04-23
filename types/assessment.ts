export type AssessmentStatus = "OPEN" | "DONE" | "draft" | "completed" | string;

export interface Assessment {
  uuid: string;
  project: string;
  position: string;
  leaderName: string;
  employee: string;
  status: AssessmentStatus;
  year: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Level {
  levelDescription: string;
  levelValue: number;
  levelUuid: string;
}

export interface AssessmentLevel {
  value: number;
  description: string;
}

export interface AssessmentAnswerDraft {
  uuid: string;
  level: number;
}

export interface AssessmentAnswer {
  uuid: string;
  question: string;
  employeeComment: string | null;
  leaderComment: string | null;
  employeeLevelValue: number | null;
  leaderLevelValue: number | null;
}

export interface AssessmentSubCategory {
  uuid: string;
  name: string;
  answers: AssessmentAnswer[];
}

export interface AssessmentCategory {
  uuid: string;
  name: string;
  subcategories: AssessmentSubCategory[];
}

export interface AssessmentDetails {
  uuid: string;
  year: number;
  status: AssessmentStatus;
  categories: AssessmentCategory[];
  knowledgeLevels?: Level[]; // Keeping this if we need to fetch labels separately
  leaderName?: string | null;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: Sort;
  unpaged: boolean;
}

export interface PaginatedResponse<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  size: number;
  sort: Sort;
  totalElements: number;
  totalPages: number;
}
