import type { OverallProgress } from '@/types/progress';

/**
 * Level pembelajaran dihitung dari jumlah fase yang sudah selesai.
 * Belum ada fase selesai = Level 1, dan mentok di jumlah total fase.
 */
export function getLearnerLevel(overall: OverallProgress): number {
  return Math.min(overall.completedPhases + 1, overall.totalPhases);
}