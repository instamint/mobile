import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from 'react-native';
import { Button } from "react-native-paper";

const optionsPerPage = [2, 3, 4];

const Mint = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent:'space-between' }} >
        <Image source={require('../../assets/instagram.png')} style={{ width: 75, height: 75 }}/>
        <View style={{ justifyContent: 'center' }} >
          <Button mode='contained' >Connect to instagram</Button>
        </View>
        
      </View>
      
    </SafeAreaView>
      
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default Mint;
