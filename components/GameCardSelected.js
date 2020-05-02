import {Body, Button, Card, CardItem, Container, Content, Header, Icon, Left, Right, Text} from "native-base";
import CardFlip from 'react-native-card-flip';
import React, {Component, PureComponent} from "react";
import _ from 'underscore'
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default class GameCardSelected extends PureComponent {

    static CARD_FLIP_DURATION = 400;

    constructor(props){
        super(props);
        this.cardClicked= _.debounce(this.cardClicked.bind(this), 1000); // prevent from double click consecutively
    }

    cardClicked = () => {
        this.card.flip();
        setTimeout(() => {this.props.handleClick(this.props.index)}, 0);
    };

    flipCard = () => {
        this.card.flip();
    }

    callOther(){
        this.props.handleClick(this.props.index);
    }

    render() {
        return (
            <CardFlip
                style={{...styles.cardContainer,marginHorizontal:3}}
                duration = {this.CARD_FLIP_DURATION}
                ref={card => (this.card = card)}>

                <TouchableOpacity
                    activeOpacity={this.props.clickable ? 1 : 0.7}
                    style={[styles.card,]}
                    onPress={this.cardClicked}>

                    {this.props.faceUpImageUri ?

                        <Image source={this.props.faceUpImageUri}
                               style={{ flex: 1, width: this.props.width-10, height: this.props.height, resizeMode: 'contain', margin:5, borderRadius:10 }}
                        />
                        :

                        <View style={{flex:1, ...styles.card1}}>
                            <View style={{borderColor:'#fff',borderWidth:3, flex:1, margin:10}}>
                            </View>
                        </View>

                    }

                </TouchableOpacity>

                <View
                    activeOpacity={1}
                    style={[styles.card]}>
                    <Image source={this.props.imageUri}
                           style={{flex: 1, width: this.props.width-10, height: this.props.height, resizeMode: 'contain',}}
                    />
                </View>
            </CardFlip>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    cardContainer: {
        flex:.5,
    },
    card: {
        flex:1,
        borderRadius: 5,
        shadowColor: 'rgba(0,0,0,0.5)',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.5,
    },
    card1: {
        borderRadius: 5,
        backgroundColor:'#04418F',
    },
    card2: {
        backgroundColor: '#FEB12C',
    },
    label: {
        lineHeight: 470,
        textAlign: 'center',
        fontSize: 55,
        fontFamily: 'System',
        color: '#ffffff',
        backgroundColor: 'transparent',
    },
});