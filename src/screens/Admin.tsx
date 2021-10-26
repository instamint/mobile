import React, {useState} from 'react';
import {SafeAreaView, Text, StyleSheet, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';

type Options = 'Users' | 'Transactions' | 'Logins'

const Admin = () => {
  const [selectedItem, setSelectedItem] = useState<Options>('Users')
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: 200 }} >
        <Picker
          selectedValue={selectedItem}
          onValueChange={(itemValue, itemIndex) => setSelectedItem(itemValue)}>
          <Picker.Item label="Users" value="users" />
          <Picker.Item label="Transactions" value="transactions" />
          <Picker.Item label="Logins" value="logins" />
        </Picker>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'flex-start', alignItems: 'center'},
});

export default Admin;
