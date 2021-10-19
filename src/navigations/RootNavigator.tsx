import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

//Screens
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';

//Navigators
import HomeDrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="register" component={RegisterScreen} />
        <Stack.Screen name="home" component={HomeDrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
