export interface ProjectProgressRecord {
  projectId: string;
  phaseId: string;
  completedItems: number[];
  total: number;
  updatedAt: Date | null;
}