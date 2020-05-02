import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Home from '../screens/Home';
import About from '../screens/About';
import {createAppContainer} from "react-navigation";
import GameModes from "../screens/GameModes";
import SelectedGame from "../screens/SelectedGame";
import LevelComplete from "../screens/LevelComplete";
import SoundDemo from "../screens/SoundDemo";
import TestStorageContext from "../screens/TestStoargeContext";

const screens = {

    Home: {
        screen: Home,
    },
    About: {
        screen: About,
    },
    GameModes: {
        screen: GameModes
    },
    SelectedGame :{
        screen: SelectedGame,
        navigationOptions:{
            headerShown:false
        }
    },
    LevelComplete: {
        screen: LevelComplete,
        navigationOptions:{
            headerShown:false
        }
    }
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {
        headerTintColor: '#444',
        headerStyle: { backgroundColor: '#eee', height: 60 }
    }
});

export default createAppContainer(HomeStack);