import { useContext } from 'react';

import { ProgressContext, type LearningActions } from '@/store/ProgressContext';

export function useLearningActions(): LearningActions {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useLearningActions harus dipakai di dalam ProgressProvider.');
  }
  return context.actions;
}