import React, {useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Card, Container} from "native-base";
import Game from "./screens/Game";
import HomeStack from "./navigation/StackNavigator"
import Home from "./screens/Home";

// your entry point
import { MenuProvider } from 'react-native-popup-menu';
import {AppLoading} from "expo";
import {cardsInformation, gameCategories} from "./config/ResourceConfig";
import * as Font from 'expo-font';
import {Asset} from "expo-asset";
import {MaterialIcons, Ionicons} from "@expo/vector-icons";
import StorageContextProvider from "./contexts/StorageContext";

export default function App() {

  let [appLoaded, setAppLoaded] = useState(false);

  const loadResources = async () => {

    let category = 'Cricket';

    let imagesToCache = [];
    for (const gameCategory of gameCategories) {

      console.log("Category", gameCategory);

      let cardInfoArray = [...cardsInformation[category].cardInfo];
      for (const cardInfo of cardInfoArray) {
        imagesToCache = [...imagesToCache, cardInfo.prop];
      }

      let cardFaceUp = cardsInformation[category].faceUpImageUri;
      if(cardFaceUp){
        imagesToCache = [...imagesToCache, cardFaceUp];
      }
    }

    console.log("Load Resources");


    await Font.loadAsync({
        'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
        'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
         FontAwesome: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/FontAwesome.ttf"),
         IonIcons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf"),
      });

    return  Promise.all([
      Asset.loadAsync(imagesToCache),
    ]);
  };

  const _handleLoadingError = () => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  const finishedLoading = () => {
    console.log("Loading Completed, ", appLoaded);
    setAppLoaded(true);
  }

  if (!appLoaded) {
    return (<AppLoading
        startAsync={loadResources}
        onError={_handleLoadingError}
        onFinish={finishedLoading}
    />);
  }
  else {
    return (
        <StorageContextProvider>
          <MenuProvider>
            <HomeStack/>
          </MenuProvider>
        </StorageContextProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flipCardCustom:{
    width:100,
    height:100,
  }
});
