import React, { useEffect, useRef } from 'react';
import {SafeAreaView, Text, StyleSheet, Button} from 'react-native';
import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { RootState } from "../redux/store";
import {logoutUser} from '../redux/reducers/session';
import * as userSessionStorage  from "../storage/userSession";

const Dashboard = () => {

  const dispatch = useDispatch()
  const { userSession } = useSelector((state: RootState) => state.session)

  const onLogutPress = async ()=>{
    await userSessionStorage.remove()
    dispatch(logoutUser())
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>{userSession.username}</Text>
      <Button title={"LOGOUT"} onPress={onLogutPress}  />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default Dashboard;
