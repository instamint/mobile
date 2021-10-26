import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {LabelInputText} from '../molecules';

type Mint = {
  title: string;
  description?: string
}

type Props = {
  onSubmit: (mint: Mint) => void;
  onCancel: () => void;
};

const MintForm: React.FC<Props> = props => {
  const {onSubmit, onCancel} = props;

  //Form initial value
  const initialValues = {
    title: '',
    description: '',
  };

  //Validation schema
  const MintSchema = Yup.object().shape({
    title: Yup.string().required('*Required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={MintSchema}
      onSubmit={onSubmit}>
      {({handleSubmit, handleBlur, handleChange, values, errors, touched}) => (
        <>
          <LabelInputText
            label={'Title'}
            onChangeText={handleChange('title')}
            onBlur={handleBlur('title')}
            value={values.title}
            autoCapitalize={'sentences'}
            labelWidth={100}
            autoFocus={true}
            error={errors.title && touched.title ? errors.title : ''}
          />
          <LabelInputText
            label={'Description'}
            onChangeText={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
            autoCapitalize={'sentences'}
            labelWidth={100}
            height={230}
            multiline={true}
          />

          <View style={styles.bottonContainer}>
            <Button
              mode="contained"
              style={{marginHorizontal: 5}}
              onPress={onCancel}>
              Cancel
            </Button>
            <Button
              mode="contained"
              style={{marginHorizontal: 5}}
              onPress={handleSubmit}>
              Mint
            </Button>
          </View>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  bottonContainer: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 30,
    justifyContent: 'flex-end',
  },
});

export default MintForm;
