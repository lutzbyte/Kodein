export interface LearningProgress {
  completedLessonIds: ReadonlySet<string>;
  startedLessonIds: ReadonlySet<string>;
  lastLessonId: string | null;
  isLoading: boolean;
}

export interface ProgressSummary {
  completed: number;
  total: number;
  percent: number;
}

export interface OverallProgress extends ProgressSummary {
  completedPhases: number;
  totalPhases: number;
}

export type PhaseStatusLabel = 'Belum dimulai' | 'Sedang berlangsung' | 'Selesai';