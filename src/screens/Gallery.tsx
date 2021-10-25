import React, { useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import { Button } from "react-native-paper";
import { useDispatch } from 'react-redux';
import { InstagramMedia, InstagramMediaResponse } from "../types";
import { showErrorAlert } from "../helpers/errorHelper";
import {NavigationProp} from '@react-navigation/native';
import CookieManager from '@react-native-community/cookies';
import * as storage from '../storage';
import { logoutInstagramAccount } from "../redux/reducers/instagramSession";
import * as instagramApi from "../api/instagram/instagram";
import { MINT } from "../navigations/screens";

type Props = {
  navigation: NavigationProp<any, string, any, any>;
};

const Gallery: React.FC<Props> = (props) => {
    const dispatch = useDispatch()
    const { navigation } = props

    const [instagramMedia, setInstagramMedia] = useState<InstagramMedia[]>([])
    const [username, setUsername] = useState('')

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


    const getMedia = async () => {
      try {
        const instagramImages = await instagramApi.getImages();
        if (instagramImages) {
          if (instagramImages.length > 0) {
            setUsername(instagramImages[0].username);
          }

          setInstagramMedia(instagramImages);
        }
      } catch (error) {
        console.log(error);
        showErrorAlert({message: 'Error retrieving media from Instagram'});
      }
    };

    const setTitle = (title: string)=>{
        navigation.setOptions({
            title: title
        })
    }

    const logoutInstagram = async () => {
      try {
        //Clean cookies
        await CookieManager.clearAll(true);
        //Remove instagram session
        await storage.remove('instagramSession');
        //Clean Redux
        dispatch(logoutInstagramAccount())
      } catch (error) {
        console.log(error);
      }
    };

    const onItemPress = (item: InstagramMedia)=>{
      navigation.navigate(MINT, {item})
    }

    const renderItem = (item: InstagramMedia) => (
      <TouchableOpacity style={{width: '33.33%', height: 120, padding: 5}} onPress={()=>onItemPress(item)}>
          <Image style={{flex: 1}} source={{uri: item.media_url}} />
      </TouchableOpacity>
    );
 
  return (
    <SafeAreaView style={styles.container}>
        <Button icon={"logout"} style={{ alignSelf: 'flex-end', margin: 5 }} mode="contained" onPress={logoutInstagram}>
            Logout of Instagram
        </Button>
        <FlatList style={{ alignSelf: 'stretch' }}
            data={instagramMedia}
            keyExtractor={(x)=>x.id.toString()}
            renderItem={({ item })=> renderItem(item)}
            numColumns={3}
        />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' },
});

export default Gallery;
