import { Stack } from 'expo-router';

import { colors } from '@/constants/theme';
import { BookmarksProvider } from '@/store/BookmarksContext';

export const unstable_settings = {
  anchor: '(tabs)',
  initialRouteName: '(tabs)',
};

export default function MainLayout() {
  return (
    <BookmarksProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          contentStyle: { backgroundColor: colors.background },
        }}
      />
    </BookmarksProvider>
  );
}