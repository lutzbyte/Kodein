import { phase1Projects } from '@/data/miniProjects/phase1';
import { phase2Projects } from '@/data/miniProjects/phase2';
import type { Project } from '@/types/content';

export const projects: Project[] = [...phase1Projects, ...phase2Projects];