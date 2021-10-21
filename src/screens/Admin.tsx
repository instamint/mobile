import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

const Admin = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>ADMINISTRATOR</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default Admin;
