

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Animated,Image
} from 'react-native';
import {Container} from "native-base";
import _ from "underscore";

export default class FlipCardCustom extends Component {

    constructor(props){
        super(props);
        this.cardClicked= _.debounce(this.cardClicked.bind(this), 1000); // prevent from double click consecutively
        this.initialize();
    }

    cardClicked = () => {
        //this.card.flip();
        this.flipCard();
        setTimeout(() => {this.props.handleClick(this.props.index)}, 0);
    };

    callOther(){
        this.props.handleClick(this.props.index);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        if(this.props.forceFlip){
            console.log("Flipping Card Forced In CDUpdate", this.props.index);
            this.flipCard();
        }
    }

    initialize() {
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
            this.value = value;
        });
        this.frontInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
        });
        this.backInterpolate = this.animatedValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg']
        });
        this.frontOpacity = this.animatedValue.interpolate({
            inputRange: [89, 90],
            outputRange: [1, 0]
        });
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
            <View>

                <View style={{flex: 1, alignItems: "center", justifyContent: "center",}}>

                    <Animated.View style={[styles.flipCard, frontAnimatedStyle, {opacity: this.frontOpacity}]}>
                        <TouchableOpacity onPress={() => this.flipCard()}>
                            <Image source={require('./../assets/cricket/CricketCardFaceUp.png')}
                                   resizeMode={'contain'}
                                   style={{
                                       flex: 1,
                                       width: this.props.width,
                                       height: this.props.height,
                                       margin: 5,
                                       borderRadius: 10
                                   }}
                            />
                        </TouchableOpacity>
                    </Animated.View>

                    <Animated.View
                        style={[styles.flipCard, styles.flipCardBack, backAnimatedStyle, {opacity: this.backOpacity}]}>
                        <TouchableOpacity>
                            <Image source={require('./../assets/cricket/Dhoni.png')}
                                   resizeMode={'contain'}
                                   style={{flex: 1, width: this.props.width, height: 160, margin: 5, borderRadius: 10}}
                            />
                        </TouchableOpacity>
                    </Animated.View>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {

    },
    flipCard: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backfaceVisibility: 'hidden',
    },
    flipCardBack: {
        position: "absolute",
        backgroundColor:'#ddd',
        borderRadius:2,
        borderWidth:2,
        borderColor:'#ddd',
    },
    flipText: {
        width: 90,
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    }
});

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
AppRegistry.registerComponent('FlipCardCustom', () => FlipCardCustom);