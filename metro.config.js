const { getDefaultConfig } = require('@react-native/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

const libraryPath = path.resolve(
  __dirname,
  '../LIBRARY/BatteryAwareAdaptiveUI'
);

config.watchFolders = [
  libraryPath,
];

// ─── Duplicate-React prevention ──────────────────────────────────────────────
// The library is installed as a "file:" junction that points at
// D:\LIBRARY\BatteryAwareAdaptiveUI, which has its own node_modules/react
// installed for local development/testing.  When Metro resolves `import react`
// from inside the library it would find that second physical copy, giving a
// different ReactCurrentDispatcher singleton → "useState of null" crash.
//
// Fix (two layers):
//   1. extraNodeModules — redirect every `react` / `react-native` import to
//      the app's single copy, regardless of where the importer lives.
//   2. blockList — prevent Metro from ever resolving files inside the library's
//      own node_modules so the redirect cannot be bypassed.
//      Metro accepts a single RegExp as blockList (no exclusionList helper
//      needed in Metro 0.81 / React Native 0.76).
// ─────────────────────────────────────────────────────────────────────────────

// Build an escaped path string safe for use inside a RegExp literal.
const escapedLibPath = libraryPath
  .replace(/\\/g, '\\\\')   // backslashes → \\
  .replace(/\./g, '\\.');   // dots        → \.

config.resolver = {
  ...config.resolver,

  extraNodeModules: {
    // Always resolve react/react-native to the app's single installed copy.
    react: path.resolve(__dirname, 'node_modules/react'),
    'react-native': path.resolve(__dirname, 'node_modules/react-native'),
  },

  // Prevent Metro from resolving anything inside the library's own
  // node_modules.  This blocks the second React runtime from ever loading.
  blockList: new RegExp(
    `${escapedLibPath}[\\\\]node_modules[\\\\](react|react-native)[\\\\].*`
  ),
};

module.exports = config;