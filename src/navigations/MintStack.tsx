import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {
  MINT,
  INSTAGRAM_LOGIN,
  MINT_DONE,
  GALLERY,
} from './screens';
import {InstagramSession} from '../types';
import {storeInstagramSessionInMemory} from '../redux/reducers/instagramSession';
import * as instagramSession from "../helpers/instagramSessionHelper";

//Screens
import ConnectInstagramScreen from '../screens/ConnectInstagram';
import GalleryScreen from '../screens/Gallery';
import MintScreen from '../screens/Mint';
import MintDoneScreen from '../screens/MintDone';

const Stack = createStackNavigator();

const MintStack = () => {
  const dispatch = useDispatch();
  const {instaSession} = useSelector(
    (state: RootState) => state.instagramSession,
  );

  useEffect(() => {
    getAndStoreInstagramSessionInMemory()
  }, [])

  //Instagram Authentication control
  const getAndStoreInstagramSessionInMemory = async () => {
    //Get from storage
    const sessionString = await instagramSession.get()
    if (sessionString) {
      //Store in redux
      const session: InstagramSession = JSON.parse(sessionString);
      dispatch(storeInstagramSessionInMemory(session));
    }
  };

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* Authenticated */}
      {instaSession.token ? (
        <>
          <Stack.Screen name={GALLERY} component={GalleryScreen} />
          <Stack.Screen name={MINT} component={MintScreen} />
          <Stack.Screen name={MINT_DONE} component={MintDoneScreen} />
        </>
      ) : (
        <Stack.Screen name={INSTAGRAM_LOGIN} component={ConnectInstagramScreen} />
      )}
    </Stack.Navigator>
  );
};

export default MintStack;
