import React from 'react';
import {SafeAreaView, StyleSheet, View, TouchableOpacity} from 'react-native';
import {TextInput, Text, Button} from 'react-native-paper';
import { NavigationProp } from "@react-navigation/native";

type Props = {
    navigation: NavigationProp<any, string, any, any>
}

const Home:React.FC<Props> = ({ navigation }) => {
  const onRegisterPress = () => {navigation.navigate("register")};

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.inputLabel}>{'Username'}</Text>
          <View style={styles.inputContainer}>
            <TextInput mode={'outlined'} style={styles.input} />
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.inputLabel}>{'Password'}</Text>
          <View style={styles.inputContainer}>
            <TextInput mode={'outlined'} style={styles.input} />
          </View>
        </View>
        <View style={{alignSelf: 'flex-end'}}>
          <Button
            icon="login"
            mode="contained"
            onPress={() => console.log('Pressed')}>
            Login
          </Button>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingTop: 30,
          }}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={onRegisterPress}>
            <Text>Register</Text>
          </TouchableOpacity>
          <Text> here</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 20,
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 1,
  },
  input: {
    height: 40,
    borderRadius: 15,
  },
  inputLabel: {
    fontSize: 17,
    marginRight: 10,
    width: 85,
    marginBottom: 5,
  },
});

export default Home;
