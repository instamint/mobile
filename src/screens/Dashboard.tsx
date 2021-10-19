import React from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';

const Dashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>INSTAMINT - HOME</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default Dashboard;
