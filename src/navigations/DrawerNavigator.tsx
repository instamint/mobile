import React from 'react';
import { Alert, View, StyleSheet } from "react-native";
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerContentComponentProps, DrawerItemList} from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "react-native-paper";
import { DASHBOARD, MARKET, PORTFOLIO, MINT, ADMIN } from "./screens";
import { RootState } from "../redux/store";
import { CustomText } from "../components/atoms";
import * as userSessionStorage  from "../storage/userSession";
import {logoutUser} from '../redux/reducers/session';

//Screens
import DashboardScreen from '../screens/Dashboard';
import MarketScreen from '../screens/Market';
import PortfolioScreen from '../screens/Portfolio';
import MintScreen from '../screens/Mint';
import AdminScreen from '../screens/Admin';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName={DASHBOARD} 
      drawerContent={(props) => <CustomDrawerContent {...props}/>}>
      <Drawer.Screen options={{ title: "Dashboard" }} name={DASHBOARD} component={DashboardScreen} />
      <Drawer.Screen options={{ title: "Market" }} name={MARKET} component={MarketScreen} />
      <Drawer.Screen options={{ title: "Portfolio" }} name={PORTFOLIO} component={PortfolioScreen} />
      <Drawer.Screen options={{ title: "Mint Factory" }} name={MINT} component={MintScreen} />
      <Drawer.Screen options={{ title: "Admin" }} name={ADMIN} component={AdminScreen} />
    </Drawer.Navigator>
  );
};

//Customizations
const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const { userSession } = useSelector((state: RootState) => state.session)
  const dispatch = useDispatch()

  const onLogoutPress = async ()=>{
    await userSessionStorage.remove()
    dispatch(logoutUser())
  }

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.itemContainer}>
        <CustomText>{userSession.username}</CustomText>
      </View>
      <DrawerItemList {...props} />
      <View style={styles.itemContainer}>
        <Button icon="logout" onPress={onLogoutPress} >Logout</Button>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'center',
    marginVertical: 20,
  }
})

export default DrawerNavigator;
