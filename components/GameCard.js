import {Body, Button, Card, CardItem, Container, Content, Header, Icon, Left, Right, Text} from "native-base";
import CardFlip from 'react-native-card-flip';
import React, {Component} from "react";
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default class GameCard extends Component {

    cardClicked = () => {
        console.log("Clicked Card", this.props.index);
        this.card.flip();
        setTimeout(() => {this.props.handleClick(this.props.index)}, 0);
    };

    callOther(){
        this.props.handleClick(this.props.index)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.forceFlip){
            console.log("Flipping  Card In CDUpdate", this.props.index);
            this.card.flip();
        }
    }

    render() {
        return (
            <CardFlip style={{...styles.cardContainer,marginHorizontal:3}} ref={card => (this.card = card)}>

                <TouchableOpacity
                    disabled={!this.props.clickable}
                    activeOpacity={1}
                    style={[styles.card, styles.card1]}
                    onPress={() => this.cardClicked()}>

                    <View style={{flex:1}}>
                        <View style={{borderColor:'#fff',borderWidth:3, flex:1, margin:10}}>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    disabled={!this.props.clickable}
                    activeOpacity={1}
                    style={[styles.card, styles.card2]}>
                    <View style={{flex:1, backgroundColor:'white', ...styles.back, borderColor:'#000', borderWidth:1}}>
                        <View style={{backgroundColor:this.props.color, flex:1, margin:5}}>
                            <Text style={{textAlign: 'center'}}> </Text>
                        </View>
                    </View>
                </TouchableOpacity>
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