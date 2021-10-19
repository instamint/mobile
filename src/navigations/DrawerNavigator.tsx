import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';

//Screens
import Dashboardcreen from '../screens/Dashboard';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={Dashboardcreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
