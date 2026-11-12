import type { ProjectProgressRecord } from '@/types/project';

export function getProjectPercent(record: ProjectProgressRecord | undefined, total: number): number {
  if (!record || total <= 0) return 0;
  return Math.round((Math.min(record.completedItems.length, total) / total) * 100);
}

export function isProjectDone(record: ProjectProgressRecord | undefined, total: number): boolean {
  return record !== undefined && total > 0 && record.completedItems.length >= total;
}