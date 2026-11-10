import { phase1Lessons } from '@/data/lessons/phase1';
import { phase2Lessons } from '@/data/lessons/phase2';
import type { LessonContent } from '@/types/content';

const allLessons: LessonContent[] = [...phase1Lessons, ...phase2Lessons];

export const lessonContents: Record<string, LessonContent> = Object.fromEntries(
  allLessons.map((lesson) => [lesson.id, lesson]),
);