import React from "react";
import RootNavigator from "./src/navigations/RootNavigator";
import { Provider as PaperProvider } from "react-native-paper";
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
//import theme from "./src/theme";

const App = () => {
  return (
    <PaperProvider>
      <RootNavigator/>
    </PaperProvider>
  );
};

export default App;

AppRegistry.registerComponent(appName, () => App);