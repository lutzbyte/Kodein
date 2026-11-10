const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Konfigurasi kompatibilitas Firebase JS SDK dengan Metro/Expo.
config.resolver.sourceExts.push('cjs');
config.resolver.unstable_enablePackageExports = false;

module.exports = config;