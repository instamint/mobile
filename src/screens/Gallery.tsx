import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { Button } from "react-native-paper";
import { useDispatch } from 'react-redux';
import { InstagramMedia, InstagramMediaResponse } from "../types";
import { showErrorAlert } from "../helpers/errorHelper";
import {NavigationProp} from '@react-navigation/native';
import * as instagramApi from "../api/instagram/instagram";
import { MINT } from "../navigations/screens";
import * as instagramSession from "../helpers/instagramSessionHelper";

const EXPIRED_SESSION_CODE = 190

type Props = {
  navigation: NavigationProp<any, string, any, any>;
};

const Gallery: React.FC<Props> = (props) => {
    const dispatch = useDispatch()
    const { navigation } = props

    const [instagramMedia, setInstagramMedia] = useState<InstagramMedia[]>([])
    const [username, setUsername] = useState('')
    const [showNext, setShowNext] = useState(false)

    useEffect(()=>{
        //Get media from instagram
        getMedia()
    }, [])

    useLayoutEffect(()=>{
        if (username){
            //Update header title with username
            setTitle(username)
        }
    }, [username])

    useEffect(()=>{
      const isItemChecked = instagramMedia.filter(x => x.checked).length > 0 ? true : false
      setShowNext(isItemChecked)
  }, [instagramMedia])

    const getMedia = async () => {
      try {
        const instagramImages = await instagramApi.getImages();
        if (instagramImages) {
          if (instagramImages.length > 0) {
            setUsername(instagramImages[0].username);
          }

          setInstagramMedia(instagramImages);
        }
      } catch (error: any) {
        const errorCode = error.response?.data?.error?.code

        if(errorCode === EXPIRED_SESSION_CODE){
          showErrorAlert({message: 'Session has expired'}, async ()=>logoutInstagram());
        }else{
          showErrorAlert({message: 'Error retrieving media from Instagram'});
        }
        
      }
    };

    const setTitle = (title: string)=>{
        navigation.setOptions({
            title: title
        })
    }

    const logoutInstagram = async () => {
      try {
        await instagramSession.clear()
      } catch (error) {
        console.log(error);
      }
    };

    const navigateToNextScreen = () => {
      const items = instagramMedia.filter(x => x.checked)
      navigation.navigate(MINT, {items})
    };

    const onItemPress = (item: InstagramMedia)=>{
      // navigation.navigate(MINT, {item})
      setInstagramMedia((prevMedia)=>{
        const newMedia = prevMedia.map((x)=>({...x, checked: x.id === item.id ? !x.checked : x.checked}))
        return newMedia
      })
    }

    const renderItem = (item: InstagramMedia) => (
      <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
        <Image
          style={[styles.image, selectionStyles(item.checked).imageChecked]}
          source={{uri: item.media_url}}
        />
      </TouchableOpacity>
    );
 
  return (
    <SafeAreaView style={styles.container}>
      <Button
        icon={'logout'}
        style={styles.button}
        mode="contained"
        onPress={logoutInstagram}>
        Logout of Instagram
      </Button>
      <FlatList
        style={{alignSelf: 'stretch'}}
        data={instagramMedia}
        keyExtractor={x => x.id.toString()}
        renderItem={({item}) => renderItem(item)}
        numColumns={3}
      />
      {showNext && (
        <Button
          icon={'arrow-right-bold'}
          style={styles.button}
          mode="contained"
          onPress={navigateToNextScreen}>
          Next
        </Button>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start'},
  item: {width: '33.33%', height: 120, padding: 5},
  image: {flex: 1},
  button: {alignSelf: 'flex-end', margin: 5}
});

const selectionStyles = (checked: boolean) =>
  StyleSheet.create({
    imageChecked: {
      opacity: checked ? 0.28 : 1,
      borderColor: 'blue',
      borderWidth: checked ? 2 : 0,
    },
  });

export default Gallery;
