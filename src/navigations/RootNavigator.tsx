import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import { LOGIN, REGISTER, DRAWER_NAVIGATOR } from "./screens";

//Screens
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';

//Navigators
import HomeDrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={LOGIN} component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name={REGISTER} component={RegisterScreen} />
        <Stack.Screen name={DRAWER_NAVIGATOR} component={HomeDrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
