import { useContext } from 'react';

import { BookmarksContext, type BookmarksContextValue } from '@/store/BookmarksContext';

export function useBookmarks(): BookmarksContextValue {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error('useBookmarks harus dipakai di dalam BookmarksProvider.');
  }
  return context;
}