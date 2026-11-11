import { phase1Projects } from '@/data/miniProjects/phase1';
import { phase2Projects } from '@/data/miniProjects/phase2';
import { phase3Projects } from '@/data/miniProjects/phase3';
import { phase4Projects } from '@/data/miniProjects/phase4';
import { phase5Projects } from '@/data/miniProjects/phase5';
import { phase6Projects } from '@/data/miniProjects/phase6';
import type { Project } from '@/types/content';

export const projects: Project[] = [
  ...phase1Projects,
  ...phase2Projects,
  ...phase3Projects,
  ...phase4Projects,
  ...phase5Projects,
  ...phase6Projects,
];