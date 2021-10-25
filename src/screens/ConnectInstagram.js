import React, { Component } from 'react';
import { View, Image, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from "react-native-paper";
import InstagramLogin from 'react-native-instagram-login';
import { connect } from "react-redux";
import * as storage from "../storage";
import { storeInstagramSessionInMemory } from "../redux/reducers/instagramSession";
import { INSTAGRAM_APP_ID, INSTAGRAM_SECRET_KEY, WEBSITE } from "../configuration";

class App extends Component {
    
  constructor(props) {
    super(props);

  }

  setIgToken = async (data) => {
    try {

        instagramSession = {
            token: data.access_token,
            userId: data.user_id
        }

        //Store in local storage
        await storage.save("instagramSession", instagramSession) 

        // console.log(instagramSession)
        
        //Store in memory (redux)
        this.props.storeInstagramSessionInMemory(instagramSession)
        // this.props.navigation.replace()
        
    } catch (error) {
        console.log(error)
    }
  }

  onLoginError(data) {
      console.log(data)
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Image
            source={require('../../assets/instagram.png')}
            style={{width: 75, height: 75}}
          />
          <View style={{justifyContent: 'center'}}>
            <Button
              mode="contained"
              onPress={() => this.instagramLogin.show()}>
              Connect to instagram
            </Button>
          </View>
        </View>
       
        <InstagramLogin
          ref={ref => (this.instagramLogin = ref)}
          appId={INSTAGRAM_APP_ID}
          appSecret={INSTAGRAM_SECRET_KEY}
          redirectUrl={WEBSITE}
          scopes={['user_profile', 'user_media']}
          onLoginSuccess={this.setIgToken}
          onLoginFailure={data => this.onLoginError(data)}
        />
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  btn: {
    borderRadius: 5,
    backgroundColor: 'orange',
    height: 30,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
});
const mapStateToProps = (state) => ({instagramSession: state.instagramSession})
const matchDispatchToProps = {storeInstagramSessionInMemory}

export default connect(mapStateToProps, matchDispatchToProps)(App)
