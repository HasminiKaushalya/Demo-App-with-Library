import React from 'react';
import { Platform } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import AuthScreen from '../screens/AuthScreen';
import HomeChoiceScreen from '../screens/HomeChoiceScreen';
import ExploreCareersScreen from '../screens/ExploreCareersScreen';
import CareerDiscoveryScreen from '../screens/CareerDiscoveryScreen';
import FindJobsScreen from '../screens/FindJobsScreen';
import JobDetailsScreen from '../screens/JobDetailsScreen';
import SavedJobsScreen from '../screens/SavedJobsScreen';

export type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  HomeChoice: undefined;
  ExploreCareers: undefined;
  CareerDiscovery: undefined;
  FindJobs: undefined;
  JobDetails: undefined;
  SavedJobs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: Platform.OS === 'web' ? 'none' : 'slide_from_right',
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Auth" component={AuthScreen} />
        <Stack.Screen name="HomeChoice" component={HomeChoiceScreen} />
        <Stack.Screen name="ExploreCareers" component={ExploreCareersScreen} />
        <Stack.Screen name="CareerDiscovery" component={CareerDiscoveryScreen} />
        <Stack.Screen name="FindJobs" component={FindJobsScreen} />
        <Stack.Screen name="JobDetails" component={JobDetailsScreen} />
        <Stack.Screen name="SavedJobs" component={SavedJobsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}