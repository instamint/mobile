import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { DASHBOARD } from "./screens";

//Screens
import Dashboardcreen from '../screens/Dashboard';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName={DASHBOARD}>
      <Drawer.Screen name={DASHBOARD} component={Dashboardcreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
