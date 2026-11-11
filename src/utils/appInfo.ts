import Constants from 'expo-constants';

export function getAppVersion(): string {
  return Constants.expoConfig?.version ?? '0.0.1';
}

export function getAndroidPackage(): string {
  return Constants.expoConfig?.android?.package ?? 'com.kodein.app';
}