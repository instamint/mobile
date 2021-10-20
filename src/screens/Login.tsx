import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { Text, Button} from 'react-native-paper';
import {NavigationProp} from '@react-navigation/native';
import {Formik} from 'formik';
import * as Yup from "yup";
import {REGISTER, DRAWER_NAVIGATOR} from '../navigations/screens';
import {User} from '../types';
import {login} from '../api/authentication';
import {Logo, OneLine, Link} from '../components/atoms';
import {LabelInputText} from '../components/molecules';


type Props = {
  navigation: NavigationProp<any, string, any, any>;
};

const Home: React.FC<Props> = ({navigation}) => {
  //Form initial value
  const initialValues: User = {
    username: '',
    password: '',
  }

  //Validation schema
  const LoginSchema = Yup.object().shape({
    username: Yup.string()
              .required('*Required'),
    password: Yup.string()
              .required('*Required')
  })

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
        //is it valid? go to dashboard
        navigation.navigate(DRAWER_NAVIGATOR);
      }
    } catch (error) {
      Alert.alert('User unauthorized');
    }
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

            {({handleSubmit, handleBlur, handleChange, values, errors, touched}) => (
              <>
                <LabelInputText
                  label={'Username'}
                  autoFocus={true}
                  onChangeText={handleChange('username')}
                  onBlur={handleBlur('username')}
                  value={values.username}
                  autoCapitalize={'none'}
                  error={errors.username && touched.username ? errors.username : ''}
                />
                <LabelInputText
                  label={'Password'}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry={true}
                  autoCapitalize={'none'}
                  error={errors.password && touched.password ? errors.password : ''}
                />

                <View style={styles.bottonContainer}>
                  <Button icon="login" mode="contained" onPress={handleSubmit}>
                    Login
                  </Button>
                </View>

                <OneLine>
                  <Text>Don't have an account? </Text>
                  <Link text={"Register"} onPress={onRegisterPress} />
                  <Text> here</Text>
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
    marginBottom: 30
  }
});

export default Home;
