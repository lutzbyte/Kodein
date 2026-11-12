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
  saveProjectChecklist,
  subscribeToProjectProgress,
} from '@/services/firestore/projectService';
import type { Project } from '@/types/content';
import type { ProjectProgressRecord } from '@/types/project';

export interface ProjectProgressValue {
  records: ReadonlyMap<string, ProjectProgressRecord>;
  isLoading: boolean;
  error: string | null;
  isPending: (projectId: string) => boolean;
  toggleItem: (project: Project, index: number) => Promise<void>;
}

export const ProjectProgressContext = createContext<ProjectProgressValue | null>(null);

export function ProjectProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const dialog = useDialog();
  const uid = user?.uid ?? null;

  const [records, setRecords] = useState<ReadonlyMap<string, ProjectProgressRecord>>(new Map());
  const [pendingIds, setPendingIds] = useState<ReadonlySet<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const latest = useRef(records);
  latest.current = records;

  useEffect(() => {
    if (!uid) {
      setRecords(new Map());
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    return subscribeToProjectProgress(
      uid,
      (items) => {
        setRecords(new Map(items.map((item) => [item.projectId, item])));
        setIsLoading(false);
      },
      () => {
        setError('Gagal memuat progress proyek. Periksa koneksi internet.');
        setIsLoading(false);
      },
    );
  }, [uid]);

  const toggleItem = useCallback(
    async (project: Project, index: number) => {
      if (!uid) return;

      const current = new Set(latest.current.get(project.id)?.completedItems ?? []);
      if (current.has(index)) current.delete(index);
      else current.add(index);

      const next = Array.from(current)
        .filter((value) => value >= 0 && value < project.checklist.length)
        .sort((a, b) => a - b);

      setPendingIds((previous) => new Set(previous).add(project.id));
      try {
        // Selesai hanya setelah Firestore mengonfirmasi penulisan.
        await saveProjectChecklist(uid, project, next);
      } catch {
        await dialog.alert({
          title: 'Checklist gagal disimpan',
          message: 'Perubahan belum tersimpan. Periksa koneksi internet lalu coba lagi.',
          tone: 'danger',
        });
      } finally {
        setPendingIds((previous) => {
          const updated = new Set(previous);
          updated.delete(project.id);
          return updated;
        });
      }
    },
    [uid, dialog],
  );

  const value = useMemo<ProjectProgressValue>(
    () => ({
      records,
      isLoading,
      error,
      isPending: (projectId) => pendingIds.has(projectId),
      toggleItem,
    }),
    [records, isLoading, error, pendingIds, toggleItem],
  );

  return <ProjectProgressContext.Provider value={value}>{children}</ProjectProgressContext.Provider>;
}