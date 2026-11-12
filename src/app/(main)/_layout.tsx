import { Stack } from 'expo-router';

import { colors } from '@/constants/theme';
import { AdsProvider } from '@/store/AdsContext';
import { BookmarksProvider } from '@/store/BookmarksContext';
import { ExerciseResultsProvider } from '@/store/ExerciseResultsContext';
import { ProgressProvider } from '@/store/ProgressContext';
import { ProjectProgressProvider } from '@/store/ProjectProgressContext';

export const unstable_settings = {
  anchor: '(tabs)',
  initialRouteName: '(tabs)',
};

export default function MainLayout() {
  return (
    <ProgressProvider>
      <ExerciseResultsProvider>
        <ProjectProgressProvider>
          <BookmarksProvider>
            <AdsProvider>
              <Stack
                screenOptions={{
                  headerShown: false,
                  animation: 'slide_from_right',
                  contentStyle: { backgroundColor: colors.background },
                }}
              />
            </AdsProvider>
          </BookmarksProvider>
        </ProjectProgressProvider>
      </ExerciseResultsProvider>
    </ProgressProvider>
  );
}