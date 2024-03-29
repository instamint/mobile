import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { LOGIN, REGISTER, DRAWER_NAVIGATOR, NFT } from "./screens";
import { UserSession } from "../types";
import { useDispatch, useSelector } from 'react-redux';
import { storeSessionInMemory } from "../redux/reducers/session";
import { RootState } from "../redux/store";
import * as instamintSession from "../helpers/instamintSessionHelper";

//Screens
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import NFTScreen from "../screens/NFT";

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
    const sessionString = await instamintSession.get()
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
          <>
            <Stack.Screen name={DRAWER_NAVIGATOR} component={HomeDrawerNavigator} options={{ headerShown: false, title: 'Home' }}/>
            <Stack.Screen name={NFT} component={NFTScreen} options={{title: 'NFT'}}/>
          </>
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
