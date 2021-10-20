import React from 'react';
import {StyleSheet, View} from 'react-native';
import { TextInput, Text } from 'react-native-paper';

//TODO: Refactor component

type Props = {
    label: string,
    onChangeText?: any,
    onBlur?: any,
    value?: any,
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined,
    autoFocus?: boolean,
    secureTextEntry?: boolean
    error?: string
}

 const LabelInputText: React.FC<Props> = props => {
   const {label, onChangeText, onBlur, value, autoCapitalize, autoFocus, secureTextEntry, error} =
     props;

   return (
       <View style={styles.row}>
         <Text style={styles.inputLabel}>{label}</Text>
         <View style={styles.inputContainer}>
           <TextInput
             mode={'outlined'}
             style={styles.input}
             autoFocus={autoFocus}
             onChangeText={onChangeText}
             onBlur={onBlur}
             value={value}
             autoCapitalize={autoCapitalize}
             secureTextEntry={secureTextEntry}
           />
           {/* {error != undefined ? <Text style={styles.error}>{error}</Text> : null} */}
           {error != undefined && <Text style={styles.error}>{error}</Text>}
         </View>
       </View>
   );
 };

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
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
  error: {
    color: 'red'
  },
});


export default LabelInputText