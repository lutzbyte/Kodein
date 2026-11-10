import { Box } from 'lucide-react-native';

import { EmptyState } from '@/components/ui/EmptyState';
import { Screen } from '@/components/ui/Screen';
import { colors } from '@/constants/theme';

export default function ResourcesScreen() {
  return (
    <Screen edges={['top']}>
      <EmptyState
        icon={<Box color={colors.primary} size={30} strokeWidth={2} />}
        title="Resource"
        description="Kumpulan sumber belajar lengkap dengan pencarian dan filter akan tersedia setelah Fase 4 selesai."
      />
    </Screen>
  );
}