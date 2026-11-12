import { useContext } from 'react';

import {
  ExerciseResultsContext,
  type ExerciseResultsValue,
} from '@/store/ExerciseResultsContext';

export function useExerciseResults(): ExerciseResultsValue {
  const context = useContext(ExerciseResultsContext);
  if (!context) {
    throw new Error('useExerciseResults harus dipakai di dalam ExerciseResultsProvider.');
  }
  return context;
}