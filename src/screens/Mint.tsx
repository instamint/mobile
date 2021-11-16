
import React from 'react';
import { SafeAreaView, StyleSheet, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import { MINT_DONE } from "../navigations/screens";
import { InstagramMedia, MintData } from "../types";
import { processMint } from "../api/instamint/NFT";
import { showErrorAlert } from "../helpers/errorHelper";
import { MintForm } from "../components/organisms";

type Props = {
  route: RouteProp<{params: {
    items: InstagramMedia[]
  }}, 'params'>,
  navigation: NavigationProp<any, string, any, any>;
};

const Mint: React.FC<Props> = (props) => {
  const { navigation, route } = props
  const items = route.params.items

  const onSubmit = async (formData: any) => {
    const instaId = Number(items[0].id) //Is this OKAY? we are sending one id for a list of IG images

    const data: MintData = {
      description: formData.description || '',
      instaId: instaId,
      instaUrl: items.map(x => x.media_url),
      instaUserName: items[0].username,
      mediaType: items[0].media_type,
      name: formData.title,
      timestamp: items[0].timestamp,
      title: formData.title,
    }

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
          <MintForm onSubmit={onSubmit} onCancel={onCancel} />
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
