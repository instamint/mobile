import React, {useEffect} from "react";
import RootNavigator from "./src/navigations/RootNavigator";
import { Provider as PaperProvider } from "react-native-paper";
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import SplashScreen from  "react-native-splash-screen";
//import theme from "./src/theme";

const App = () => {
  useEffect(()=>{
    SplashScreen.hide()
  },[])

  return (
    <PaperProvider>
      <RootNavigator/>
    </PaperProvider>
  );
};

export default App;

AppRegistry.registerComponent(appName, () => App);