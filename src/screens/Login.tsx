import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';

import {NavigationProp} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {storeSessionInMemory} from '../redux/reducers/session';
import {REGISTER, DRAWER_NAVIGATOR} from '../navigations/screens';
import {User, UserSession} from '../types';
import {login} from '../api/instamint/authentication';
import {setToken} from '../api/instamint/instamintAxios';
import {Logo} from '../components/atoms';
import {LoginForm} from "../components/organisms";
import { showErrorAlert } from "../helpers/errorHelper";
import * as instamintSession from "../helpers/instamintSessionHelper";

type Props = {
  navigation: NavigationProp<any, string, any, any>;
};

const Home: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();

  const onRegisterPress = () => {
    //Go to sign up screen
    navigation.navigate(REGISTER);
  };

  //Submit form
  const onSubmit = async (user: User) => {
    try {

      // let session: UserSession = { token: '-FAKE TOKEN-', userId: 0, username: user.username};
      // await storeUserSession(session);

      // //Store in Redux
      // dispatch(storeSessionInMemory(session));
      // navigation.navigate(DRAWER_NAVIGATOR);

      //request login
      const response = await login(user);

      if (response.data.token) {
        //Store session in disk
        let session: UserSession = {...response.data, username: user.username};
        await storeUserSession(session);

        console.log(response.data)

        //Set token 
        setToken(response.data.token)

        //Store in Redux
        dispatch(storeSessionInMemory(session));

        //Go to home
        navigation.navigate(DRAWER_NAVIGATOR);
      }
    } catch (error) {
      console.log(error)
      showErrorAlert({message: 'User unauthorized'})
    }
  };

  const storeUserSession = async (session: UserSession) => {
    await instamintSession.init(session)
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Logo />
          <LoginForm onSubmit={onSubmit} onRegisterPress={onRegisterPress} />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
});

export default Home;
