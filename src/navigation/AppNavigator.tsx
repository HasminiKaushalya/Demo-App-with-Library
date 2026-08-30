import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Platform } from "react-native";
import { AuthProvider } from "../context/AuthContext";

import AuthScreen from "../screens/AuthScreen";
import BatteryAdaptiveDemoScreen from "../screens/BatteryAdaptiveDemoScreen";
import CareerDiscoveryScreen from "../screens/CareerDiscoveryScreen";
import ExploreCareersScreen from "../screens/ExploreCareersScreen";
import FindJobsScreen from "../screens/FindJobsScreen";
import HomeChoiceScreen from "../screens/HomeChoiceScreen";
import JobDetailsScreen from "../screens/JobDetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import RecommendationScreen from "../screens/RecommendationScreen";
import SavedJobsScreen from "../screens/SavedJobsScreen";
import SplashScreen from "../screens/SplashScreen";

import type { RootStackParamList } from "../types/navigations";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
            animation: Platform.OS === "web" ? "none" : "slide_from_right",
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />

          <Stack.Screen name="Auth" component={AuthScreen} />

          <Stack.Screen name="HomeChoice" component={HomeChoiceScreen} />

          <Stack.Screen
            name="ExploreCareers"
            component={ExploreCareersScreen}
          />

          <Stack.Screen
            name="CareerDiscovery"
            component={CareerDiscoveryScreen}
          />

          <Stack.Screen name="FindJobs" component={FindJobsScreen} />

          <Stack.Screen name="JobDetails" component={JobDetailsScreen} />

          <Stack.Screen name="SavedJobs" component={SavedJobsScreen} />

          <Stack.Screen
            name="Recommendation"
            component={RecommendationScreen}
          />

          <Stack.Screen name="Profile" component={ProfileScreen} />

          <Stack.Screen
            name="BatteryAdaptiveDemo"
            component={BatteryAdaptiveDemoScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
