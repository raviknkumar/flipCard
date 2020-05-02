import React from 'react';
import {StyleSheet, View, Text} from 'react-native'
import {Icon, Button} from "native-base";
import Header from "../components/header";

const Settings = (props) => {

    Settings['navigationOptions'] = ({navigation}) => ({
        headerTitle: () => <Header title='Settings'/>,
        //headerLeft: () => <View><Text> Left </Text></View>,
        //headerRight: () => <Text>View</Text>
    });

    const {navigation} = props;

    return (
        <View style={styles.container}>
            <Text> Settings </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {}
});

export default Settings;