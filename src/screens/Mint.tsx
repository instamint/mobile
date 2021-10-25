
import React from 'react';
import { SafeAreaView, StyleSheet, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button } from "react-native-paper";
import {NavigationProp, RouteProp} from '@react-navigation/native';
import { LabelInputText } from "../components/molecules";
import { MINT_DONE } from "../navigations/screens";
import { InstagramMedia, MintData } from "../types";
import { processMint } from "../api/instamint/NFT";
import { showErrorAlert } from "../helpers/errorHelper";

type MintForm = {
  title: string;
  description?: string
}

type Props = {
  route: RouteProp<{params: {
    item: InstagramMedia
  }}, 'params'>,
  navigation: NavigationProp<any, string, any, any>;
};

const Mint: React.FC<Props> = (props) => {
  const { navigation, route } = props
  const item = route.params.item

  const initialValues = {
    title: '',
    description: '',
  };

  //Validation schema
  const MintSchema = Yup.object().shape({
    title: Yup.string().required('*Required'),
  });

  const onSubmit = async (formData: MintForm) => {
    const instaId = Number(item.id)

    const data: MintData = {
      description: formData.description || '',
      instaId: instaId,
      instaUrl: item.media_url,
      instaUserName: item.username,
      mediaType: item.media_type,
      name: formData.title,
      timestamp: item.timestamp,
      title: formData.title,
    }

    //
    console.log(data)

    try {
      const response = await processMint(data)  
      console.log(response.data)
      navigation.navigate(MINT_DONE)
    } catch (error) {
      showErrorAlert(error)
    } 
  }

  const onCancel = () => {
    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Formik
            initialValues={initialValues}
            validationSchema={MintSchema}
            onSubmit={onSubmit}>
            {({
              handleSubmit,
              handleBlur,
              handleChange,
              values,
              errors,
              touched,
            }) => (
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
                  <Button mode="contained" style={{ marginHorizontal: 5 }} onPress={onCancel}>
                    Cancel
                  </Button>
                  <Button mode="contained" style={{ marginHorizontal: 5 }} onPress={handleSubmit}>
                    Mint
                  </Button>
                </View>
              </>
            )}
          </Formik>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'flex-start', 
    paddingHorizontal: 20,
    paddingTop: 15,
  },

  bottonContainer: {
    width: '100%',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginTop: 30,
    justifyContent: 'flex-end',
  },
});

export default Mint;
