import React from 'react';
import {View, StyleSheet} from 'react-native';

const Divider = () => (
    <View style={styles.divider}/>
)
    
const styles = StyleSheet.create({
  divider: {
    borderWidth: 0.5,
    borderColor: '#231F20',
    marginVertical: 3,
  },
});

export default Divider