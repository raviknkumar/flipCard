import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, StatusBar, Platform} from 'react-native'
import  {LinearGradient}  from 'expo-linear-gradient';
import CardFlip from "react-native-card-flip";

class GameHeader extends React.Component {

    _interval;

    constructor(props){
        super(props);
        this._interval = setInterval(() => {this.card.flip()}, 5000);
    }

    componentWillUnmount() {
        clearInterval(this._interval)
    }

    render() {
        return (

            <CardFlip style={styles.mainContainer} ref={card => (this.card = card)}>

                <TouchableOpacity
                    activeOpacity={1}
                    style={[styles.card, styles.card1]}
                    onPress={() => this.card.flip()}>

                    <View style={{...styles.triangleTopLeft,borderLeftColor: '#4E2C81',}}/>
                    <Text style={{...styles.containerText, ...styles.flipContainerTextTop,
                        transform: [{rotate: "315deg"}],}}>FLIP</Text>

                    <LinearGradient colors={['#6441A5', '#2a0845']}
                                    start={[0, 0]} end={[1, 0]}
                                    style={{height: 200, ...styles.container, borderRadius:5}}>

                        <Text style={{
                            fontFamily:'nunito-bold',
                            color: '#ffffff', fontWeight: '900',
                            fontSize: 50,
                            transform: [{rotate: "320deg"}],
                        }}>THE</Text>

                    </LinearGradient>

                    <Text style={{...styles.containerText,...styles.flipContainerBottomText,
                        transform: [{rotate: "315deg"}],}}>CARD</Text>
                    <View style={{...styles.triangleBottomRight, borderRightColor: '#6340A2',}}/>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={1}
                    style={{...styles.card, ...styles.card2,  borderWidth:10, borderColor:'white',}}
                    onPress={() => this.card.flip()}>

                    <Text style={{...styles.containerText, color:'black',...styles.flipContainerTextTop}}>FLIP</Text>

                    <LinearGradient colors={['powderblue', '#ebfff0']}
                                    start={[0, 0]} end={[1, 0]}
                                    style={{height: 200, ...styles.container,}}>

                        <Text style={{
                            fontFamily:'nunito-bold',
                            color:'black'
                            , fontWeight: '900',
                            fontSize: 50,
                            transform: [{rotate: "320deg"}],
                        }}>THE</Text>

                    </LinearGradient>
                    <Text style={{...styles.containerText,color:'black',...styles.flipContainerBottomText}}>CARD</Text>
                </TouchableOpacity>
            </CardFlip>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        height:200,
        alignItems:'center',
        justifyContent:'center',
        margin:10,
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 10
    },

    triangleTopLeft: {
        position:'absolute',
        top:0,
        left:0,
        width: 0,
        height: 0,
        borderLeftWidth: 140,
        borderRightWidth: 70,
        borderBottomWidth: 140,
        borderRadius:2,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: 'transparent',
        elevation:100,
        zIndex:100,
    },

    triangleBottomRight: {
        position:'absolute',
        bottom:0,
        right:0,
        width: 0,
        height: 0,
        borderRightWidth: 140,
        borderLeftWidth: 70,
        borderTopWidth: 140,
        borderRadius:2,
        borderStyle: 'solid',
        backgroundColor: 'transparent',
        borderLeftColor: 'transparent',
        borderTopColor: 'transparent',
        elevation:100,
        zIndex:100,
    },

    containerText:{
        textTransform: 'uppercase',
        fontFamily:'nunito-bold',
        position:'absolute',
        color: "white",
        fontSize: 32,
        fontWeight: 'bold',
        zIndex: 1000,
        elevation: 1000,
    },

    flipContainerTextTop:{
        top:10,
        left:10,
        marginTop:15,
        marginLeft:15,
    },

    flipContainerBottomText:{
        bottom:10,
        right:10,
        marginBottom:8,
        marginRight:5,
        zIndex: 1000,
        elevation: 1000,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    cardContainer: {
        width: '90%',
        height: 200,
    },
    card: {
        flex:1,
        backgroundColor: '#FE474C',
        borderRadius: 5,
        borderWidth:10,
        borderColor:'#ddd',
    },
    card1: {
        backgroundColor: '#FE474C',
    },
    card2: {

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

export default GameHeader;