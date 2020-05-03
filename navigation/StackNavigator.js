import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Home from '../screens/Home';
import About from '../screens/About';
import {createAppContainer} from "react-navigation";
import GameModes from "../screens/GameModes";
import SelectedGame from "../screens/SelectedGame";
import LevelComplete from "../screens/LevelComplete";
import Settings from "../screens/Settings";
import Stats from "../screens/Stats";

// use initialRouteName after all the screen as options
//   ,
//   {
//     initialRouteName: "Home"
//   }
const screens = {

    Home: {
        screen: Home,
    },
    About: {
        screen: About,
    },
    GameModes: {
        screen: GameModes,
    },
    Stats:{
        screen: Stats,
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
    },Settings:{
        screen:Settings,
    }
};

// home stack navigator screens
const HomeStack = createStackNavigator(screens, {
    defaultNavigationOptions: {

    }
});

export default createAppContainer(HomeStack);