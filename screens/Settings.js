import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View, Text, Switch} from 'react-native'
import {Icon, Button, Container} from "native-base";
import Header from "../components/header";
import {darkTheme, gameCategories} from "../config/ResourceConfig";
import {StorageContext} from "../contexts/StorageContext";

const Settings = (props) => {

    let [sound, setSound] = useState(true);
    let [theme, setTheme] = useState(darkTheme);

    let {toggleSound, getSound} = useContext(StorageContext);

    Settings['navigationOptions'] = ({navigation}) => ({
        headerTitle: () => <Header title='Settings'/>,
    });

    const toggleSwitch = async (soundValue) => {

        let newSound = false;
        try {
            newSound = await toggleSound(soundValue);
            //console.log("Sound Set As", newSound);
        } catch (e) {
            console.log("Error in Setting Sound", e);
        }
        setSound(newSound);
    };

    useEffect( () => {

        // Fetch Sound From AsyncStorage using an IIFE

        (async () => {
            try {
                let resp = await getSound();
                setSound(resp);
            } catch (e) {
                console.log("Error In Fetching GameData: ", e);
            }
        })();

    }, []);

    const {navigation} = props;

    return (
        <Container style={{...styles.container, backgroundColor:theme.bgColor}}>
            <View style={{justifyContent:'space-between', flexDirection:'row', alignItems:'center', marginVertical:10}}>
            <Text style={{color:theme.color, fontSize:20,}}> Sound </Text>
            <Switch
                trackColor={{ false: "#767577", true: "#66DD67" }}
                thumbColor={sound ? "#ffffff" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange = {toggleSwitch} value = {sound}/>
            </View>
            <View style={{borderBottomWidth:2, borderColor:theme.color}}/>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
    }
});

export default Settings;