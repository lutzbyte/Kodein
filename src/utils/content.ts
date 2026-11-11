import { exercises } from '@/data/exercises';
import { lessonContents } from '@/data/lessonContent';
import { phases } from '@/data/phases';
import { projects } from '@/data/projects';
import { resources } from '@/data/resources';
import type {
  Exercise,
  ExerciseKind,
  LessonContent,
  LessonSummary,
  LevelFilter,
  Phase,
  PhaseLevel,
  Project,
  Resource,
} from '@/types/content';

export const TOTAL_LESSONS = phases.reduce((total, phase) => total + phase.lessons.length, 0);

export function getPhaseById(id: string | undefined): Phase | undefined {
  return phases.find((phase) => phase.id === id);
}

export function findLesson(
  lessonId: string | undefined | null,
): { lesson: LessonSummary; phase: Phase; index: number } | undefined {
  if (!lessonId) return undefined;

  for (const phase of phases) {
    const index = phase.lessons.findIndex((lesson) => lesson.id === lessonId);
    if (index >= 0) {
      return { lesson: phase.lessons[index], phase, index };
    }
  }
  return undefined;
}

export function getLessonContent(lessonId: string): LessonContent | undefined {
  const content: LessonContent | undefined = lessonContents[lessonId];
  return content;
}

export function getExercises(phaseId?: string): Exercise[] {
  return phaseId ? exercises.filter((exercise) => exercise.phaseId === phaseId) : exercises;
}

export function getExerciseById(id: string | undefined): Exercise | undefined {
  return exercises.find((exercise) => exercise.id === id);
}

export function getProjectsByPhase(phaseId: string): Project[] {
  return projects.filter((project) => project.phaseId === phaseId);
}

export function getProjectById(id: string | undefined): Project | undefined {
  return projects.find((project) => project.id === id);
}

export function getResourcesByPhase(phaseId: string): Resource[] {
  return resources.filter((resource) => resource.phaseIds.includes(phaseId));
}

export function getResourcesByLesson(lessonId: string): Resource[] {
  return resources.filter((resource) => resource.lessonIds.includes(lessonId));
}

export function matchesLevel(level: PhaseLevel, filter: LevelFilter): boolean {
  return filter === 'Semua' || level.includes(filter);
}

export function getExerciseKindLabel(kind: ExerciseKind): string {
  switch (kind) {
    case 'multiple-choice':
      return 'Pilihan Ganda';
    case 'true-false':
      return 'Benar / Salah';
    case 'predict-output':
      return 'Prediksi Output';
  }
}