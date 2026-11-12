import { phase1Exercises } from '@/data/exerciseBank/phase1';
import { phase2to4Exercises } from '@/data/exerciseBank/phase2to4';
import { phase5to8Exercises } from '@/data/exerciseBank/phase5to8';
import type { Exercise } from '@/types/content';

export const exercises: Exercise[] = [
  ...phase1Exercises,
  ...phase2to4Exercises,
  ...phase5to8Exercises,
];