import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LabelInputText } from '../molecules';
import { OneLine, Link, CustomText } from '../atoms';
import { User } from '../../types';

type Props = {
  onSubmit: (user: User) => void,
  onRegisterPress: () => void,
}

const LoginForm: React.FC<Props> = (props) => {
  const { onSubmit, onRegisterPress } = props
  const [ loading, setLoading ] = React.useState(false)

  //Form initial value
  const initialValues: User = {
    username: __DEV__ ? 'adminuser1' : '',
    password: __DEV__ ? '12345' : '',
  };

  //Validation schema
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('*Required'),
    password: Yup.string().required('*Required'),
  });

  const onSubmitForm = async (user: User)=>{
    setLoading(true)
    await onSubmit(user)
    setLoading(false)
  }

  return <Formik
    initialValues={initialValues}
    validationSchema={LoginSchema}
    onSubmit={onSubmitForm}>
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
          <Button icon="login" mode="contained" onPress={handleSubmit} loading={loading}>
            Login
          </Button>
        </View>

        <OneLine>
          <CustomText>Don't have an account? </CustomText>
          <Link text={'Register'} onPress={onRegisterPress} />
          <CustomText> here</CustomText>
        </OneLine>
      </>
    )}
  </Formik>
}

const styles = StyleSheet.create({
  link: {
    color: '#0645AD',
    textDecorationLine: 'underline',
    fontSize: 17,
  },
  bottonContainer: {
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
});

export default LoginForm