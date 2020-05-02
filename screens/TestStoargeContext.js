import React, {useContext, useState} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native'
import {StorageContext} from "../contexts/StorageContext";
import TouchableOpacity from "react-native-web/src/exports/TouchableOpacity";
import {Button} from "native-base";

const TestStorageContext = (props) => {

    let [category, setCategory] = useState('Cricket');
    let [level, setLevel] = useState('1');
    let [time, setTime] = useState('65');
    let [response, setResponse] = useState('');

    let {addDataToLevel, getAllLevelsData, clearData} = useContext(StorageContext);
    console.log("Functions Available ", addDataToLevel, getAllLevelsData);

    const handleSubmit = () => {
        console.log('Values:', category, level, time);
        addDataToLevel({
            level: parseInt(level),
            levelDescription: level,
            category: category,
            time: parseInt(time),
        })
    };

    const getData = () => {
        setResponse(getAllLevelsData());
    };

    return (
        <View>
            <View style={styles.container}>
                <Text> Category </Text>
                <TextInput
                    onChangeText={(text) => {setCategory(text)}}
                    value={category}
                    style={{borderWidth: 1, borderColor: 'black'}}/>
            </View>

            <View style={styles.container}>
                <Text> Level </Text>
                <TextInput
                    onChangeText={(text)=>{setLevel(text)}}
                    keyboardType={'numeric'}
                    value={level}
                    style={{borderWidth:1, borderColor:'black'}}/>
            </View>


            <View style={styles.container}>
                <Text> Time </Text>
                <TextInput
                    onChangeText={(text)=>{setTime(text)}}
                    value={time}
                    keyboardType={'numeric'}
                    style={{borderWidth:1, borderColor:'black'}}/>
            </View>

            <Button onPress={handleSubmit} block success>
                <Text>Submit</Text>
            </Button>

            <Button onPress={getData} block danger>
                <Text>Show Details</Text>
            </Button>

            <Button onPress={clearData} block warning>
                <Text>Clear Details</Text>
            </Button>

            <Text>
                Response
            </Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {

    }
});

export default TestStorageContext;