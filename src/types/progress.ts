import type { Difficulty } from '@/types/content';

export interface LearningProgress {
  completedLessonIds: ReadonlySet<string>;
  startedLessonIds: ReadonlySet<string>;
  lastLessonId: string | null;
  isLoading: boolean;
  error: string | null;
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

export type LessonProgressStatus = 'in_progress' | 'completed';

export interface LessonProgressRecord {
  lessonId: string;
  phaseId: string;
  status: LessonProgressStatus;
  updatedAt: Date | null;
}

export type HistoryEntry =
  | {
      id: string;
      type: 'lesson_started' | 'lesson_completed';
      lessonId: string;
      phaseId: string;
      createdAt: Date;
    }
  | {
      id: string;
      type: 'exercise_submitted';
      exerciseId: string;
      phaseId: string;
      correct: boolean;
      createdAt: Date;
    };

export interface ExerciseResultRecord {
  exerciseId: string;
  phaseId: string;
  difficulty: Difficulty;
  attempts: number;
  solved: boolean;
  points: number;
  lastAnswer: string;
  lastCorrect: boolean;
  updatedAt: Date | null;
}