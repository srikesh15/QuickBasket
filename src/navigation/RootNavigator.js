
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';

import {
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

import HomeScreen from '../screens/home/HomeScreen';
import CategoryScreen from '../screens/category/CategoryScreen';
import CategoryListScreen from '../screens/category/CategoryListScreen';
import ProductDetailsScreen from '../screens/product/ProductDetailsScreen';
import CartScreen from '../screens/cart/CartScreen';

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

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Category"
          component={CategoryScreen}
        />

        <Stack.Screen
          name="CategoryList"
          component={CategoryListScreen}
        />

        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
        />

        <Stack.Screen
          name="Location"
          component={PlaceholderScreen}
        />

        <Stack.Screen
          name="Cart"
          component={CartScreen}
        />

        <Stack.Screen
          name="Search"
          component={PlaceholderScreen}
        />

        <Stack.Screen
          name="Orders"
          component={PlaceholderScreen}
        />

        <Stack.Screen
          name="Profile"
          component={PlaceholderScreen}
        />

        <Stack.Screen
          name="Checkout"
          component={PlaceholderScreen}
        />
        

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
