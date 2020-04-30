import React, { Component } from 'react';
import {Row, Col} from "native-base";
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated, Image, Dimensions
} from 'react-native';
import FlipCardCustom from "../components/FlipCardCustom";

const width = Dimensions.get('window').width

export default class SelectedGameCardCustom extends Component {

    componentWillMount() {
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        })
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        })
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        })
        this.frontOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [1, 0]
        })
        this.backOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [0, 1]
        })
    }

    flipCard() {
        if (this.value >= 90) {
            Animated.spring(this.animatedValue,{
                toValue: 0,
                friction: 8,
                tension: 10
            }).start();
        } else {
            Animated.spring(this.animatedValue,{
                toValue: 180,
                friction: 8,
                tension: 10
            }).start();
        }

    }

    render() {
        const frontAnimatedStyle = {
            transform: [
                { rotateY: this.frontInterpolate }
            ]
        }
        const backAnimatedStyle = {
            transform: [
                { rotateY: this.backInterpolate }
            ]
        }

        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                <View style={{flex:1, backgroundColor: 'powderblue', flexDirection: 'row', justifyContent: 'space-between' }} >
                        <FlipCardCustom  width={width/4} height={100} style={{flex:1, }}/>
                        <View style={{flex:1, backgroundColor:'blue'}}/>
                        <View style={{flex:1, backgroundColor:'green'}}/>
                        <View style={{flex:1, backgroundColor:'violet'}}/>
                    </View>

                <View style={{flex:1,backgroundColor: 'skyblue'}} />
                <View style={{flex:1,backgroundColor: 'steelblue'}} />
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});