import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';

import { AdaptiveProvider } from 'battery-aware-adaptive-ui';


import AdaptivePermissionHandler from './src/components/AdaptivePermissionHandler';


export default function App() {


  // CHANGE THIS NUMBER DURING DEMO
  // 20 = Performance
  // 50 = Balanced
  // 75 = Power Saver
  // 90 = Ultra Saver


  return (

    <AdaptiveProvider>

      {/* Checks Ultra Saver mode and asks user permission */}
      <AdaptivePermissionHandler />


      <AppNavigator />

    </AdaptiveProvider>

  );
}
