import Constants from 'expo-constants';

export function getAppVersion(): string {
  return Constants.expoConfig?.version ?? '1.0.0';
}

export function getAndroidPackage(): string {
  return Constants.expoConfig?.android?.package ?? 'com.kodein.app';
}