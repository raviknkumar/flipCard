import React from 'react';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Image, Platform} from 'react-native'
import {createAppContainer} from "react-navigation";
import Icon from "react-native-vector-icons/Ionicons";

import Saved from "../screens/Saved";
import Trips from "../screens/Trips";
import Inbox from "../screens/Inbox";
import Explore from "../screens/Explore"; // Includes various icons from various libraries

const navigator= createBottomTabNavigator({
    Saved: {
        screen: Saved,
        navigationOptions: {
            tabBarLabel: 'SAVED',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-heart" color={tintColor} size={24} />
            )
        }
    },
    Explore: {
        screen: Explore,
        navigationOptions: {
            tabBarLabel: 'EXPLORE',
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name="ios-search"
                    color={tintColor}
                    size={25}
                />
            )
        }
    },
    Trips: {
        screen: Trips,
        navigationOptions: {
            tabBarLabel: 'TRIPS',
            tabBarIcon: ({ tintColor }) => (
                <Image source={require('./../assets/airbnb.png')} style={{ height: 24, width: 24, tintColor: tintColor }} />
            )
        }
    },
    Inbox: {
        screen: Inbox,
        navigationOptions: {
            tabBarLabel: 'INBOX',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-chatboxes" color={tintColor} size={24} />
            )
        }
    },
    Profile: {
        screen: Inbox,
        navigationOptions: {
            tabBarLabel: 'PROFILE',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="ios-person" color={tintColor} size={24} />
            )
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: 'red',
        inactiveTintColor: 'grey',
        style: {
            backgroundColor: 'white',
            borderTopWidth: 0,
            shadowOffset: { width: 5, height: 3 },
            shadowColor: 'black',
            shadowOpacity: 0.5,
            elevation: 5
        }
    }
})

export default createAppContainer(navigator);