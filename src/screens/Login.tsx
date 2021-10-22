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
import {useDispatch} from 'react-redux';
import {storeSessionInMemory} from '../redux/reducers/session';
import {REGISTER, DRAWER_NAVIGATOR} from '../navigations/screens';
import {User, UserSession} from '../types';
import {login} from '../api/authentication';
import {Logo} from '../components/atoms';
import {LoginForm} from "../components/organisms";
import { showErrorAlert } from "../helpers/errorHelper";

import * as userSessionStorage from '../storage/userSession';
import { Button } from 'react-native-paper';
// import nodejs from "nodejs-mobile-react-native";

// nodejs.start("main.js");

type Props = {
  navigation: NavigationProp<any, string, any, any>;
};

const Home: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();

  const onRegisterPress = () => {
    //Go to sign up screen
    navigation.navigate(REGISTER);
  };

  useEffect(()=>{
    // nodejs.start("main.js");
    // nodejs.channel.addListener(
    //   "message",
    //   (msg) => {
    //     console.log("From node: " + msg);
    //   },
    //   this
    // );
  },[])

  //Submit form
  const onSubmit = async (user: User) => {
    try {
      //request login
      const response = await login(user);

      if (response.data.token) {
        //Store session in disk
        let session: UserSession = {...response.data, username: user.username};
        await storeUserSession(session);

        //Store in Redux
        dispatch(storeSessionInMemory(session));

        //Go to home
        navigation.navigate(DRAWER_NAVIGATOR);
      }
    } catch (error) {
      showErrorAlert({message: 'User unauthorized'})
    }
  };

  const sendtoNode = async () => {
    // const userHashTags = "#republicadominicana"
    // if (userHashTags) {
    //   //const cred = await AsyncStorage.getItem("igAuth");
    //   const cred = {username: 'jsmr04@gmail.com', password: 'Sarah01!'};
    //   // if (!cred) {
    //   //   alert("Please save your Instagram Credentials in your Settings!");
    //   //   return;
    //   // }
    //   let userHashTagsFinal;
    //   if (userHashTags.includes(",")) {
    //     const userHashTagsFixed = userHashTags.split(",").map((x) => x.trim());
    //     userHashTagsFinal = [...new Set(userHashTagsFixed)];
    //   } else {
    //     userHashTagsFinal = [userHashTags];
    //   }
    //   const data = {
    //     content: userHashTagsFinal,
    //     limit: Number(10),
    //     func: "likeByMedia",
    //     cred: cred//JSON.parse(cred)
    //   };
    //   const finalData = JSON.stringify(data);
    //   nodejs.channel.send(finalData);
    //   //setLoading(true);
    // } else {
    //   //alert("Please enter a hashtag or hashtags.");
    // }
  };

  const storeUserSession = async (session: UserSession) => {
    await userSessionStorage.save(session);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Button onPress={sendtoNode} >INSTAGRAM</Button>
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
