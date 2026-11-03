
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import LocationScreen from '../screens/location/LocationScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import OTPScreen from '../screens/auth/OTPScreen';
import HomeScreen from '../screens/home/HomeScreen';

import PlaceholderScreen from '../screens/PlaceholderScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}>

        <Stack.Screen name="Location" component={LocationScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OTP" component={OTPScreen} />

        <Stack.Screen name="Home" component={HomeScreen} />

        <Stack.Screen name="Category" component={PlaceholderScreen} />
        <Stack.Screen name="CategoryList" component={PlaceholderScreen} />
        <Stack.Screen name="ProductDetails" component={PlaceholderScreen} />
        <Stack.Screen name="Cart" component={PlaceholderScreen} />
        <Stack.Screen name="Search" component={PlaceholderScreen} />
        <Stack.Screen name="Orders" component={PlaceholderScreen} />
        <Stack.Screen name="Profile" component={PlaceholderScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
