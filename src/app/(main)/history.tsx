import { History } from 'lucide-react-native';

import { EmptyState } from '@/components/ui/EmptyState';
import { Screen } from '@/components/ui/Screen';
import { ScreenHeader } from '@/components/ui/ScreenHeader';
import { colors } from '@/constants/theme';

export default function HistoryScreen() {
  return (
    <Screen edges={['top', 'bottom']}>
      <ScreenHeader />
      <EmptyState
        icon={<History color={colors.primary} size={30} strokeWidth={2} />}
        title="Riwayat Belajar"
        description="Belum ada riwayat belajar. Riwayat materi dan latihan yang kamu selesaikan akan tampil di sini setelah Fase 5."
      />
    </Screen>
  );
}