import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import CustomText from '../components/atoms/CustomText';

type Props = {
  navigation: NativeStackNavigationProp<{}>;
};

const MintDone: React.FC<Props> = props => {
  const {navigation} = props;

  return (
    <SafeAreaView style={styles.container}>
      <CustomText>Success</CustomText>
      <View style={styles.bottonContainer}>
        <Button mode="contained" onPress={() => navigation.popToTop()}>
          Another One
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottonContainer: {
    alignSelf: 'flex-end',
    marginTop: 30,
    marginRight: 20,
    backgroundColor: 'black'
  },
});

export default MintDone;
