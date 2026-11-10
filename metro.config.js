const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Kompatibilitas Firebase JS SDK
config.resolver.sourceExts.push('cjs');

// Gunakan package.json exports untuk resolusi modul React Native
config.resolver.unstable_enablePackageExports = true;

module.exports = config;

