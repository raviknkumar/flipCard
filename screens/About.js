import React from 'react';
import {StyleSheet, View, Text, Modal} from 'react-native'
import {Card, CardItem, Container, Icon, Button} from "native-base";

const About = (props) => {

    return (
        <View style={styles.container}>
            <Text style={styles.text}>
                {'\t\t'}Flip card is a game to test your memory where you have to pair the cards together
                with the other card hidden on the screen.
                It will be fun.
            </Text>
            <Text style={styles.text}>
                {'\t\t'}It is a timed card memory game. 
                Click the cards to see what image they uncover and try to find the matching symbol underneath the other cards.
                 Uncover two matching symbols at once to eliminate them from the game. Eliminate all cards as fast as you can to win the game.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flex:1,
        backgroundColor:'#273048',
    },
    text: {
        color:'white',
        fontSize: 18,
        padding: 10,
        lineHeight: 25,
    }
});

export default About;