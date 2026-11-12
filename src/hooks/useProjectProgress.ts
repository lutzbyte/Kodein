import { useContext } from 'react';

import {
  ProjectProgressContext,
  type ProjectProgressValue,
} from '@/store/ProjectProgressContext';

export function useProjectProgress(): ProjectProgressValue {
  const context = useContext(ProjectProgressContext);
  if (!context) {
    throw new Error('useProjectProgress harus dipakai di dalam ProjectProgressProvider.');
  }
  return context;
}