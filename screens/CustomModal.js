import React, {PureComponent} from "react"
import styled from "styled-components"
import { Animated, TouchableOpacity, Dimensions, View, Text, StyleSheet, TouchableHighlight, Image} from "react-native"
import {Card, CardItem, Button} from "native-base";
import {Ionicons} from "@expo/vector-icons";

import {darkTheme, lightTheme} from "../config/ResourceConfig";

const screenHeight = Dimensions.get("window").height;

class CustomModal extends PureComponent {

    theme;
    constructor(props){
        super(props);
        this.theme = darkTheme;
    }
    state = {
        top: new Animated.Value(screenHeight)
    };

    toggleModal = () => {
        Animated.spring(this.state.top, {
            toValue: screenHeight/5
        }).start()
    };

    closeModal = () => {
        Animated.spring(this.state.top, {
            toValue: screenHeight
        }).start();
    };

    setLevelAndClose = (level) => {
        this.props.setLevel(level);
        this.closeModal()
    };

    render() {
        return (
            <AnimatedContainer style={{top: this.state.top, backgroundColor:'#ddd'}}>

                <View style={{height:100,backgroundColor: '#444', alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{color:'white', fontSize:24, fontWeight:'100'}}>Choose A Level</Text>
                </View>

                <TouchableOpacity
                    onPress={this.closeModal}
                    style={{position: "absolute", top: 80, left: "50%", marginLeft: -22, zIndex: 1}}>
                    <CloseView style={{elevation: 10}}>
                        <Image source={require('./../assets/icons/close2.png')} style={{width:36,height:36}}/>
                    </CloseView>
                </TouchableOpacity>

                <Body>

                    <AnimatedTouchable
                        onPress={() => {this.setLevelAndClose(1)}}>
                        <Card style={{marginTop:10,borderRadius: 50, width: '100%', height: 70}}>
                            <Text style={{textAlign: 'center', fontSize: 40, marginTop: 10}}> Easy </Text>
                        </Card>
                    </AnimatedTouchable>

                    <AnimatedTouchable
                        onPress={()=>{this.props.setLevel(2);this.closeModal()}}>
                        <Card style={{marginTop:10,borderRadius: 50, width: '100%', height: 70}}>
                            <Text style={{textAlign: 'center', fontSize: 40, marginTop: 10}}>Medium</Text>
                        </Card>
                    </AnimatedTouchable>

                    <AnimatedTouchable
                        onPress={()=>{this.props.setLevel(3);this.closeModal()}}>
                        <Card style={{marginTop:10,borderRadius: 50, width: '100%', height: 70}}>
                            <Text style={{textAlign: 'center', fontSize: 40, marginTop: 10}}>Hard</Text>
                        </Card>
                    </AnimatedTouchable>

                </Body>
            </AnimatedContainer>)
    }
}

const styles = StyleSheet.create({
   cardItemText:{
       flex:1,
       textAlign: 'center',
       height:200,
       width:100,
       color:'#444',
       fontSize: 30,
       fontWeight: '700',
   },
    buttonStyle:{
        alignItems:'center',
        backgroundColor: '#F92660',
        width:150,
        height:50,
        marginTop:20,
        marginBottom:10,
        marginRight:15,
        padding:5,
    },
});

const Container = styled.View`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;
`

const AnimatedContainer = Animated.createAnimatedComponent(Container);
const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const Header = styled.View`
    background: #333;
    height: 150px;
    alignItems: center;
    justifyContent: center
`

const Body = styled.View`
    height: ${screenHeight}px;
    display: flex;
    justifyContent: flex-start;
    marginHorizontal: 10px;
    marginTop: 20px;
`

const CloseView = styled.View`
    width: 36px;
    height: 36px;
    border-radius: 18px;
    background: white;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
`

const CardTextView = styled.View`
    width: 200px;
    height: 200px;
    border-radius: 22px;
    background: white;
    justify-content: center;
    align-items: center;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
`

export default CustomModal;