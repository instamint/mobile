import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  MARKET,
  NFT
} from './screens';

//Screens
import MarketScreen from '../screens/Market';
import NFTScreen from '../screens/NFT';

const Stack = createStackNavigator();

const MarketStack = () => {

  return (
    <Stack.Navigator>
        <Stack.Screen name={MARKET} component={MarketScreen} options={{headerShown: false}} />
        <Stack.Screen name={NFT} component={NFTScreen}  />
    </Stack.Navigator>
  );
};

export default MarketStack;
