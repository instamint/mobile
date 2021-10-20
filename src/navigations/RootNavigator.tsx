import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { LOGIN, REGISTER, DRAWER_NAVIGATOR } from "./screens";
import * as userSessionStorage from "../storage/userSession";
import { UserSession } from "../types/userSession";
import { useDispatch, useSelector } from 'react-redux';
import { storeSessionInMemory } from "../redux/reducers/session";
import { RootState } from "../redux/store";

//Screens
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';

//Navigators
import HomeDrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

const RootStack = () => {
  const dispatch = useDispatch()
  const { userSession: userSessionInMemory } = useSelector((state: RootState) => state.session)

  useEffect(() => {
    getAndStoreUserSessionInMemory()
  }, [])

  //Authentication control
  const getAndStoreUserSessionInMemory = async () => {
    //Get from storage
    const sessionString = await userSessionStorage.get()
    if (sessionString) {
      //Store in redux
      const session: UserSession = JSON.parse(sessionString)
      dispatch(storeSessionInMemory(session))
    }
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Authenticated */}
        {userSessionInMemory.token ? (
          <Stack.Screen name={DRAWER_NAVIGATOR} component={HomeDrawerNavigator}
          />
        ) : (
          <>
            <Stack.Screen name={LOGIN} component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name={REGISTER} component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
