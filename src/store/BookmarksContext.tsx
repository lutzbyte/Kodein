import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { useAuth } from '@/hooks/useAuth';
import { useDialog } from '@/hooks/useDialog';
import {
  addBookmark,
  removeAllBookmarks,
  removeBookmark,
  subscribeToBookmarks,
  type BookmarkKind,
} from '@/services/firestore/bookmarkService';

export interface BookmarksContextValue {
  resourceIds: ReadonlySet<string>;
  lessonIds: ReadonlySet<string>;
  isLoading: boolean;
  error: string | null;
  isClearing: boolean;
  isBookmarked: (resourceId: string) => boolean;
  isPending: (resourceId: string) => boolean;
  toggleResource: (resourceId: string) => Promise<void>;
  isLessonBookmarked: (lessonId: string) => boolean;
  isLessonPending: (lessonId: string) => boolean;
  toggleLesson: (lessonId: string) => Promise<void>;
  clearAll: () => Promise<void>;
}

export const BookmarksContext = createContext<BookmarksContextValue | null>(null);

const pendingKey = (kind: BookmarkKind, id: string) => `${kind}:${id}`;

export function BookmarksProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const dialog = useDialog();
  const uid = user?.uid ?? null;

  const [resourceIds, setResourceIds] = useState<ReadonlySet<string>>(new Set());
  const [lessonIds, setLessonIds] = useState<ReadonlySet<string>>(new Set());
  const [pendingKeys, setPendingKeys] = useState<ReadonlySet<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isClearing, setIsClearing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const latest = useRef({ resourceIds, lessonIds });
  latest.current = { resourceIds, lessonIds };

  useEffect(() => {
    if (!uid) {
      setResourceIds(new Set());
      setLessonIds(new Set());
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    return subscribeToBookmarks(
      uid,
      (bookmarks) => {
        setResourceIds(new Set(bookmarks.resourceIds));
        setLessonIds(new Set(bookmarks.lessonIds));
        setIsLoading(false);
      },
      () => {
        setError('Gagal memuat bookmark. Periksa koneksi internet.');
        setIsLoading(false);
      },
    );
  }, [uid]);

  const toggle = useCallback(
    async (kind: BookmarkKind, targetId: string) => {
      if (!uid) return;

      const key = pendingKey(kind, targetId);
      const current = kind === 'resource' ? latest.current.resourceIds : latest.current.lessonIds;

      setPendingKeys((previous) => new Set(previous).add(key));
      try {
        // Selesai hanya setelah Firestore mengonfirmasi penulisan.
        if (current.has(targetId)) {
          await removeBookmark(uid, kind, targetId);
        } else {
          await addBookmark(uid, kind, targetId);
        }
      } catch {
        await dialog.alert({
          title: 'Bookmark gagal disimpan',
          message: 'Perubahan belum tersimpan. Periksa koneksi internet lalu coba lagi.',
          tone: 'danger',
        });
      } finally {
        setPendingKeys((previous) => {
          const next = new Set(previous);
          next.delete(key);
          return next;
        });
      }
    },
    [uid, dialog],
  );

  const clearAll = useCallback(async () => {
    if (!uid) return;

    const entries = [
      ...Array.from(latest.current.resourceIds).map((targetId) => ({
        kind: 'resource' as const,
        targetId,
      })),
      ...Array.from(latest.current.lessonIds).map((targetId) => ({
        kind: 'lesson' as const,
        targetId,
      })),
    ];
    if (entries.length === 0) return;

    setIsClearing(true);
    try {
      await removeAllBookmarks(uid, entries);
    } catch {
      await dialog.alert({
        title: 'Bookmark gagal dihapus',
        message: 'Sebagian bookmark mungkin belum terhapus. Periksa koneksi internet lalu coba lagi.',
        tone: 'danger',
      });
    } finally {
      setIsClearing(false);
    }
  }, [uid, dialog]);

  const value = useMemo<BookmarksContextValue>(
    () => ({
      resourceIds,
      lessonIds,
      isLoading,
      error,
      isClearing,
      isBookmarked: (resourceId) => resourceIds.has(resourceId),
      isPending: (resourceId) => pendingKeys.has(pendingKey('resource', resourceId)),
      toggleResource: (resourceId) => toggle('resource', resourceId),
      isLessonBookmarked: (lessonId) => lessonIds.has(lessonId),
      isLessonPending: (lessonId) => pendingKeys.has(pendingKey('lesson', lessonId)),
      toggleLesson: (lessonId) => toggle('lesson', lessonId),
      clearAll,
    }),
    [resourceIds, lessonIds, pendingKeys, isLoading, isClearing, error, toggle, clearAll],
  );

  return <BookmarksContext.Provider value={value}>{children}</BookmarksContext.Provider>;
}