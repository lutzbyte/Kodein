import type { Difficulty, Resource, ResourceLanguage, ResourceType } from '@/types/content';

export type TypeFilter = 'Semua' | ResourceType;
export type LanguageFilter = 'Semua' | ResourceLanguage;
export type DifficultyFilter = 'Semua' | Difficulty;

export interface ResourceFilters {
  query: string;
  type: TypeFilter;
  language: LanguageFilter;
  difficulty: DifficultyFilter;
  phaseId: string | null;
  lessonId: string | null;
}

export const DEFAULT_RESOURCE_FILTERS: ResourceFilters = {
  query: '',
  type: 'Semua',
  language: 'Semua',
  difficulty: 'Semua',
  phaseId: null,
  lessonId: null,
};

/** Jumlah filter lanjutan (di luar pencarian dan jenis) yang sedang aktif. */
export function countAdvancedFilters(filters: ResourceFilters): number {
  let count = 0;
  if (filters.language !== 'Semua') count += 1;
  if (filters.difficulty !== 'Semua') count += 1;
  if (filters.phaseId) count += 1;
  if (filters.lessonId) count += 1;
  return count;
}

export function hasActiveFilters(filters: ResourceFilters): boolean {
  return (
    filters.query.trim().length > 0 || filters.type !== 'Semua' || countAdvancedFilters(filters) > 0
  );
}

export function filterResources(list: Resource[], filters: ResourceFilters): Resource[] {
  const keyword = filters.query.trim().toLowerCase();

  return list.filter((resource) => {
    if (filters.type !== 'Semua' && resource.type !== filters.type) return false;
    if (filters.language !== 'Semua' && resource.language !== filters.language) return false;
    if (filters.difficulty !== 'Semua' && resource.difficulty !== filters.difficulty) return false;
    if (filters.phaseId && !resource.phaseIds.includes(filters.phaseId)) return false;
    if (filters.lessonId && !resource.lessonIds.includes(filters.lessonId)) return false;
    if (keyword.length === 0) return true;

    return `${resource.title} ${resource.publisher} ${resource.description}`
      .toLowerCase()
      .includes(keyword);
  });
}

/** Rekomendasi untuk satu fase: sumber berbahasa Indonesia didahulukan. */
export function getRecommendedResources(list: Resource[], phaseId: string, limit = 3): Resource[] {
  return list
    .filter((resource) => resource.phaseIds.includes(phaseId))
    .sort((a, b) => Number(b.language === 'Indonesia') - Number(a.language === 'Indonesia'))
    .slice(0, limit);
}