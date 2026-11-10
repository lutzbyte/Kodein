import { BookOpen } from 'lucide-react-native';

import { EmptyState } from '@/components/ui/EmptyState';
import { Screen } from '@/components/ui/Screen';
import { colors } from '@/constants/theme';

export default function RoadmapScreen() {
  return (
    <Screen edges={['top']}>
      <EmptyState
        icon={<BookOpen color={colors.primary} size={30} strokeWidth={2} />}
        title="Roadmap Belajar"
        description="Delapan fase dari Programming Fundamentals hingga Specialization akan tampil di sini setelah Fase 2 dan Fase 3 selesai."
      />
    </Screen>
  );
}