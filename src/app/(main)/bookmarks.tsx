import { Bookmark } from 'lucide-react-native';

import { EmptyState } from '@/components/ui/EmptyState';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { colors } from '@/constants/theme';

export default function BookmarksScreen() {
  return (
    <Screen edges={['top', 'bottom']}>
      <ScreenHeader />
      <EmptyState
        icon={<Bookmark color={colors.primary} size={30} strokeWidth={2} />}
        title="Bookmark"
        description="Belum ada bookmark. Materi dan resource yang kamu simpan akan tampil di sini setelah Fase 5."
      />
    </Screen>
  );
}