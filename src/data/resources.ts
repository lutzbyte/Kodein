import { articleResources } from '@/data/resourceCatalog/articles';
import { bookResources } from '@/data/resourceCatalog/books';
import { courseResources } from '@/data/resourceCatalog/courses';
import { documentationResources } from '@/data/resourceCatalog/documentation';
import { youtubeResources } from '@/data/resourceCatalog/youtube';
import type { Resource } from '@/types/content';

export const resources: Resource[] = [
  ...youtubeResources,
  ...articleResources,
  ...documentationResources,
  ...bookResources,
  ...courseResources,
];