import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useAuth } from '@/hooks/useAuth';
import { AuthProvider } from '@/store/AuthContext';
import { DialogProvider } from '@/store/DialogContext';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

function RootNavigator() {
  const { status } = useAuth();
  const router = useRouter();
  const isAuthenticated = status === 'authenticated';
  const previousAuthenticated = useRef<boolean | null>(null);

  // Saat status login berubah (login/logout), kembali ke Splash ("/")
  // yang akan mengarahkan ke Beranda atau Onboarding.
  useEffect(() => {
    if (status === 'loading') return;

    if (previousAuthenticated.current !== null && previousAuthenticated.current !== isAuthenticated) {
      router.replace('/');
    }
    previousAuthenticated.current = isAuthenticated;
  }, [status, isAuthenticated, router]);

  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="index" />

      <Stack.Protected guard={!isAuthenticated}>
        <Stack.Screen name="onboarding" />
      </Stack.Protected>

      <Stack.Protected guard={isAuthenticated}>
        <Stack.Screen name="(main)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync().catch(() => undefined);
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <DialogProvider>
        <AuthProvider>
          <StatusBar style="auto" />
          <RootNavigator />
        </AuthProvider>
      </DialogProvider>
    </SafeAreaProvider>
  );
}