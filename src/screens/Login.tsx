import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {NavigationProp} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from 'react-redux';
import {storeSessionInMemory} from '../redux/reducers/session';
import {REGISTER, DRAWER_NAVIGATOR} from '../navigations/screens';
import {User, UserSession} from '../types';
import {login} from '../api/authentication';
import {Logo, OneLine, Link} from '../components/atoms';
import {LabelInputText} from '../components/molecules';
import * as userSessionStorage from '../storage/userSession';

type Props = {
  navigation: NavigationProp<any, string, any, any>;
};

const Home: React.FC<Props> = ({navigation}) => {
  const dispatch = useDispatch();

  //Form initial value
  const initialValues: User = {
    username: '',
    password: '',
  };

  //Validation schema
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('*Required'),
    password: Yup.string().required('*Required'),
  });

  const onRegisterPress = () => {
    //Go to sign up screen
    navigation.navigate(REGISTER);
  };

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
      Alert.alert('User unauthorized');
    }
  };

  const storeUserSession = async (session: UserSession) => {
    await userSessionStorage.save(session);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Logo />
          <Formik
            initialValues={initialValues}
            validationSchema={LoginSchema}
            onSubmit={onSubmit}>
            {({
              handleSubmit,
              handleBlur,
              handleChange,
              values,
              errors,
              touched,
            }) => (
              <>
                <LabelInputText
                  label={'Username'}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  autoCapitalize={'none'}
                  error={
                    errors.username && touched.username ? errors.username : ''
                  }
                />
                <LabelInputText
                  label={'Password'}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={true}
                  autoCapitalize={'none'}
                  error={
                    errors.password && touched.password ? errors.password : ''
                  }
                />

                <View style={styles.bottonContainer}>
                  <Button icon="login" mode="contained" onPress={handleSubmit}>
                    Login
                  </Button>
                </View>

                <OneLine>
                  <Text style={{ fontSize: 17 }}>Don't have an account? </Text>
                  <Link text={'Register'} onPress={onRegisterPress} />
                  <Text style={{ fontSize: 17 }}> here</Text>
                </OneLine>
              </>
            )}
          </Formik>
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
  bottonContainer: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
});

export default Home;
