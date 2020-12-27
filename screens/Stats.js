import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, View, Text, Alert, ScrollView} from 'react-native'
import {darkTheme, gameCategories} from "../config/ResourceConfig";
import { StorageContext } from './../contexts/StorageContext';
import {Container, Button} from "native-base";
import ModalDropdown from "react-native-modal-dropdown";
import {Ionicons} from "@expo/vector-icons";
import Toast from 'react-native-root-toast';

const Stats = (props) => {

    let [categories, setCategories] = useState([]);
    let [category, setCategory] = useState('Cricket');
    let [theme, setTheme] = useState(darkTheme);
    let [storedGameData, setStoredGameData]  = useState([]);
    let [selectedGameData, setSelectedGameData] = useState([]);

    let {getAllLevelsData, clearData} = useContext(StorageContext);

    const handleChange = (index, category) =>{
        setCategory(category);
        setSelectedGameData(storedGameData[category]);
    };

    const clearStorageData = () => {
        Alert.alert("About To Delete The Data", "Are you sure to delete the Stats?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            {
                text: "Clear", onPress: async () => {

                    let resp = await clearData();

                    if(resp){
                        let toast = Toast.show('Stats Data Cleared Successfully', {
                            duration: Toast.durations.SHORT,
                            position: Toast.positions.TOP,
                            shadow: true,
                            animation: true,
                            hideOnPress: true,
                            delay: 0
                        });
                    } else {
                        let toast = Toast.show('Unknown Error In Clearing Stats ', {
                            duration: Toast.durations.SHORT,
                            position: Toast.positions.TOP,
                            shadow: true,
                            animation: true,
                            hideOnPress: true,
                            delay: 0
                        });
                    }
                }
            }
        ]);
    }


    useEffect( () => {

        // Fetch Categories
        let categoriesData = gameCategories.map(category => {
            return {
                value: category,
            }
        });
        setCategories(categoriesData);

        // fetch Data From AsyncStorage
        // Using an IIFE (Immediately Invoked Function Expression) as promise cannot be returend by useEffect
        (async () => {
            try {
                let resp = await getAllLevelsData();
                //console.log("Obtained Game Data ", resp);
                setStoredGameData(resp);
                setSelectedGameData(resp[category]);
            } catch (e) {
                console.log("Error In Fetching GameData: ", e);
            }
        })();

    }, []);

    let items = () => {
        return (Object.values(selectedGameData).map((obj, index) => {

            return (<View key={index} style={{flex:1,...styles.buttonContainer, marginVertical:5, borderWidth:3, padding:5}}>

                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{...styles.buttonText, marginLeft:10}}>Level</Text>
                    <Text style={{...styles.buttonText, marginRight:10}}>{obj.levelDescription} </Text>
                </View>

                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text style={{...styles.buttonText, marginLeft:10}}>Games Played: </Text>
                    <Text style={{...styles.buttonText, marginRight:10}}>{obj.gamesPlayed} </Text>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{...styles.buttonText, marginLeft:10}}>Best Time</Text>
                    <Text style={{...styles.buttonText, marginRight:10}}>{obj.minTimeReadable} </Text>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{...styles.buttonText, marginLeft:10}}>Average Time</Text>
                    <Text style={{...styles.buttonText, marginRight:10}}>{obj.averageTimeReadable} </Text>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{...styles.buttonText,marginLeft:5}}> Selections </Text>
                </View>

                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>

                    <Text style={{...styles.text, flex:.3, marginLeft:10, alignSelf:'center'}}>Correct</Text>

                        <Text style={{borderWidth: 3, borderRadius: 10,paddingHorizontal:5,
                            borderColor: '#73F440',...styles.buttonText}}>
                            {obj.correctSelections}
                        </Text>


                    <Text style={{...styles.text, marginLeft:10, flex:.3}}>Wrong</Text>
                    <Text style={{borderWidth: 3, borderRadius: 10, paddingHorizontal:5,
                        borderColor: '#ED3833',...styles.buttonText}}>
                        {obj.inCorrectSelections}
                    </Text>

                </View>

            </View>)
        }))
    };

    return (
        <Container style={styles.container}>

            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems: 'center'}}>
                <Text style={{fontSize: 20, fontWeight: '300', color: 'white'}}> Select category </Text>

                <View style={{marginRight:10, flexDirection:'row'}}>
                <ModalDropdown

                    defaultValue={category}

                    dropdownStyle={{width: '90%', marginHorizontal: '2%',}}

                    renderSeparator={
                        () => (<View/>)
                    }
                    renderRow={(option, index, isSelected) => (
                        <Text
                            style={{
                                flex: 1, width: '50%', color: isSelected ? 'orange' : '#444',
                                fontSize: 18, fontWeight: '200', paddingVertical: 10, marginLeft: 5
                            }}>
                            {option}
                        </Text>
                    )
                    }
                    style={{
                        fontSize: 30, fontWeight: '300',
                        width: 200, color: 'white',
                        height: 40,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        paddingLeft: 10,
                        borderBottomColor: '#444',
                        borderBottomWidth: 2,
                        marginVertical: 5,
                        marginHorizontal: 2,
                    }}

                    options={gameCategories}
                    onSelect={handleChange}/>
                </View>
                <Ionicons
                    style={{position:'absolute',right:30}}
                    name={Platform.OS === "ios" ? 'ios-arrow-dropdown' : 'md-arrow-dropdown'} size={30}/>
            </View>

            {/*To Show the stats*/}

            <ScrollView>
            <View style={{flex:1, flexDirection:'column', alignItems:'center',justifyContent: 'space-around', marginHorizontal:10,}}>
                {items()}
                {/* fill space at the bottom*/}
            </View>
            </ScrollView>


            <View style={{position:'absolute', bottom:0, left:0, right:0, margin:10}}>
                <Button block danger onPress={clearStorageData}>
                    <Text style={{color:theme.color}}>Clear All Data</Text>
                </Button>
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor:darkTheme.bgColor,
        flex:1,
    },
    buttonContainer:{
        backgroundColor:'#86ACF8',
        color:'white',
        width:'90%',
        justifyContent:'center',
        borderWidth:2,
        borderColor:'white',
        borderRadius:5,
        marginHorizontal: 1,
        marginVertical: 1,
    },
    buttonText:{
        textAlignVertical:'center',
        textAlign:'center',
        fontSize:18,
        fontWeight: '200',
        color:'white'
    },
    text: {
        fontSize: 18,
        fontWeight: '200',
        color: 'white',
    }
});

export default Stats;

{/*<View style={{flex: 1, backgroundColor: 'steelblue'}}/>
                <View style={{flex: 1, backgroundColor: 'skyblue'}}/>
                <View style={{flex: 1, backgroundColor: 'powderblue'}}/>*/}