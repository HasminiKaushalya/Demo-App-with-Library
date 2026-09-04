import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';

import { AdaptiveProvider } from 'battery-aware-adaptive-ui';

import AdaptivePermissionHandler from './src/components/AdaptivePermissionHandler';


export default function App() {

  // Simulation modes:
  // ABS 20 = Ultra Saver
  // ABS 50 = Power Saver
  // ABS 75 = Balanced
  // ABS 90 = Normal

  return (

    <AdaptiveProvider>

      {/* Handles permissions for Ultra Saver mode */}
      <AdaptivePermissionHandler />

      <AppNavigator />

    </AdaptiveProvider>

  );
}