import { phase1Lessons } from '@/data/lessons/phase1';
import { phase2Lessons } from '@/data/lessons/phase2';
import { phase3Lessons } from '@/data/lessons/phase3';
import { phase4Lessons } from '@/data/lessons/phase4';
import { phase5Lessons } from '@/data/lessons/phase5';
import { phase6Lessons } from '@/data/lessons/phase6';
import type { LessonContent } from '@/types/content';

const allLessons: LessonContent[] = [
  ...phase1Lessons,
  ...phase2Lessons,
  ...phase3Lessons,
  ...phase4Lessons,
  ...phase5Lessons,
  ...phase6Lessons,
];

export const lessonContents: Record<string, LessonContent> = Object.fromEntries(
  allLessons.map((lesson) => [lesson.id, lesson]),
);