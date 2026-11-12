import { Stack } from 'expo-router';

import { colors } from '@/constants/theme';
import { BookmarksProvider } from '@/store/BookmarksContext';
import { ExerciseResultsProvider } from '@/store/ExerciseResultsContext';
import { ProgressProvider } from '@/store/ProgressContext';

export const unstable_settings = {
  anchor: '(tabs)',
  initialRouteName: '(tabs)',
};

export default function MainLayout() {
  return (
    <ProgressProvider>
      <ExerciseResultsProvider>
        <BookmarksProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
              contentStyle: { backgroundColor: colors.background },
            }}
          />
        </BookmarksProvider>
      </ExerciseResultsProvider>
    </ProgressProvider>
  );
}