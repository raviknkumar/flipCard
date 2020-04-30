import React from 'react';
import {darkTheme} from "../config/ResourceConfig";
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Button, Content, Footer, Container, Header, Left, Right, FooterTab, Icon, Body} from "native-base";
import {globalStyles} from "../styles/global";


const GameStats = (props) => {

    let themeSelected = darkTheme;

    const goBack = () =>{
        props.navigation.state.params.restartGame();
        props.navigation.goBack();
    };

    return (
        <Container style={{...styles.container, flexDirection:'column'}}>

                <Text style={{color: darkTheme.color, fontSize:34, fontWeight: '500', textAlign: 'center'}}>
                    Level Complete
                </Text>

                <View style={{...globalStyles.buttonContainer,...styles.textContainer}}>
                    <Text style={globalStyles.buttonText}>
                        Difficulty:
                    </Text>
                    <Text style={globalStyles.buttonText}>
                        {props.navigation.getParam('level')}
                    </Text>
                </View>

                <View style={{...globalStyles.buttonContainer,...styles.textContainer}}>
                    <Text style={globalStyles.buttonText}>
                        Time:
                    </Text>
                    <Text style={globalStyles.buttonText}>
                        {props.navigation.getParam('time').minutes + ':' + props.navigation.getParam('time').seconds}
                    </Text>
                </View>

                <View style={{...globalStyles.buttonContainer,...styles.textContainer}}>

                    <Text style={globalStyles.buttonText}>
                        Selections:
                    </Text>
                    <Text style={globalStyles.buttonText}>
                        {props.navigation.getParam('correctSelections')}
                    </Text>

                    <Text style={globalStyles.buttonText}>
                        InCorrect:
                    </Text>
                    <Text style={globalStyles.buttonText}>
                        {props.navigation.getParam('inCorrectSelections')}
                    </Text>

                </View>

                <Text style={{color: darkTheme.color}}>GameStats</Text>
                <Text style={{color: darkTheme.color}}>category: {props.navigation.getParam('category')}</Text>
                <Text style={{color: darkTheme.color}}>totalSelections: {props.navigation.getParam('totalSelections')}</Text>

                <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{color:'white', textAlign:'center', fontSize:24, fontWeight:'300'}}>
                        {props.navigation.getParam('correctSelections') /
                        (props.navigation.getParam('correctSelections') + props.navigation.getParam('inCorrectSelections'))}%
                    </Text>
                </View>


            <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, flexDirection:'row', justifyContent:'space-between'}}>
                <TouchableOpacity info style={{...globalStyles.buttonContainerFitToWidth,
                    ...globalStyles.buttonText, paddingVertical: 10, paddingHorizontal:30, height:40,
                    borderRadius:25}} onPress={goBack}>
                    <Text style={{...globalStyles.buttonText, color:"black"}}>
                        Restart
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity rounded info style={{...globalStyles.buttonContainerFitToWidth,
                    ...globalStyles.buttonText, paddingVertical: 10, paddingHorizontal:30, height:40,
                    borderRadius:25}} onPress={()=>{props.navigation.navigate('GameModes')}}>
                    <Text style={{...globalStyles.buttonText, color:"black"}}>
                        Next
                    </Text>
                </TouchableOpacity>
            </View>


        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: darkTheme.bgColor,
        color:darkTheme.color,
    },

    textContainer:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        padding:10,
        width:'100%',
        marginHorizontal:1
    }
});

export default GameStats;

/*
<View style={{ flexDirection: 'row' }}>
            <Icon name="user" size={30} />
            <View
                style={{
                    flex: 1,
                    flexDirection: "column",
                    marginLeft: 20
                }}
            >
                <Text>Williams</Text>
                <Text>
                    jhfjks ahfdkjsdh fjkshfjksaddhfjksdahfjkds
                    ahajkdhfjksahdf
                </Text>
            </View>
            <View
                style={{

                    flexDirection: "row",
                    justifyContent: "flex-end"
                }}
            >
                <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        borderColor: "rgba(0,0,0,0.2)",
                        alignItems: "center",
                        justifyContent: "center",
                        width: 30,
                        height: 30,
                        backgroundColor: "#fff",
                        borderRadius: 100
                    }}
                />
            </View>
        </View>

        <Footer>
                <FooterTab style={{backgroundColor: themeSelected.bgColor, justifyContent: 'space-around', marginBottom:10}}>
                    <TouchableOpacity rounded info style={{...globalStyles.buttonContainerFitToWidth,
                        ...globalStyles.buttonText, paddingVertical: 10, paddingHorizontal:30, height:40,
                        borderRadius:25}}>
                        <Text style={{...globalStyles.buttonText, color:"black"}}>
                            Back
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity rounded info style={{...globalStyles.buttonContainerFitToWidth,
                        ...globalStyles.buttonText, paddingVertical: 10, paddingHorizontal:30, height:40,
                    borderRadius:25}}>
                        <Text style={{...globalStyles.buttonText, color:"black"}}>
                            Next
                        </Text>
                    </TouchableOpacity>
                </FooterTab>
            </Footer>
 */





