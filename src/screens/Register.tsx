import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

const Register = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>INSTAMINT - REGISTER</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default Register;
