import type { LessonStatus, LessonSummary, Phase } from '@/types/content';
import type {
  LearningProgress,
  OverallProgress,
  PhaseStatusLabel,
  ProgressSummary,
} from '@/types/progress';

export function getLessonStatus(progress: LearningProgress, lessonId: string): LessonStatus {
  if (progress.completedLessonIds.has(lessonId)) return 'completed';
  if (progress.startedLessonIds.has(lessonId)) return 'in_progress';
  return 'not_started';
}

function toPercent(completed: number, total: number): number {
  return total > 0 ? Math.round((completed / total) * 100) : 0;
}

export function getPhaseProgress(phase: Phase, progress: LearningProgress): ProgressSummary {
  const total = phase.lessons.length;
  const completed = phase.lessons.filter((lesson) =>
    progress.completedLessonIds.has(lesson.id),
  ).length;
  return { completed, total, percent: toPercent(completed, total) };
}

export function getPhaseStatusLabel(phase: Phase, progress: LearningProgress): PhaseStatusLabel {
  const summary = getPhaseProgress(phase, progress);
  if (summary.total > 0 && summary.completed === summary.total) return 'Selesai';

  const started = phase.lessons.some((lesson) => progress.startedLessonIds.has(lesson.id));
  if (summary.completed > 0 || started) return 'Sedang berlangsung';

  return 'Belum dimulai';
}

export function getOverallProgress(phases: Phase[], progress: LearningProgress): OverallProgress {
  let completed = 0;
  let total = 0;
  let completedPhases = 0;

  for (const phase of phases) {
    const summary = getPhaseProgress(phase, progress);
    completed += summary.completed;
    total += summary.total;
    if (summary.total > 0 && summary.completed === summary.total) completedPhases += 1;
  }

  return {
    completed,
    total,
    percent: toPercent(completed, total),
    completedPhases,
    totalPhases: phases.length,
  };
}

export function getNextLesson(phase: Phase, progress: LearningProgress): LessonSummary {
  const next = phase.lessons.find((lesson) => !progress.completedLessonIds.has(lesson.id));
  return next ?? phase.lessons[0];
}