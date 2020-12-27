import React, {useState, useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity,TouchableWithoutFeedback, Modal, FlatList, Image, Alert} from 'react-native'
import {darkTheme, gameModes, lightTheme} from "../config/ResourceConfig";
import {globalStyles} from "../styles/global";
import CustomModal from "./CustomModal";
import Header from "../components/header";
import {levels} from "../config/ResourceConfig";
import {StorageContext} from "../contexts/StorageContext";
import {Card} from "native-base";
import Spinner from "../components/Spinner";


class GameModes extends React.Component{

    theme;

    static contextType = StorageContext;

    constructor(props){
        super(props);
        this.state = {
            levelSelected:0,
            categorySelected:'',
            gameData:[],
            dataLoaded: false
        };
        this.theme = darkTheme;
    }

    async componentDidMount() {
        //console.log("GameModes Component Did Mount");
        this._focusListener = this.props.navigation.addListener('didFocus', this._componentFocused);
    }

    _componentFocused = async () => {
        console.log("GameModes Focussed");

        this.setState({dataLoaded: false});
        //console.log("This DataLoaded", this.state.dataLoaded);
        // Fetch Data From AsyncStorage
        let {getAllLevelsData} = this.context;
        let gameData = await getAllLevelsData();
        this.setState({gameData, dataLoaded: true}, this.processLevelData);
    };

    componentWillUnmount() {
        console.log("GameModes Component Will Unmount refres");
        this._focusListener.remove();
    }

    /*
    * maps Whether user has played the level or not
    */
    processLevelData = () => {

        //console.log("ProcessData: This DataLoaded", this.state.dataLoaded);
        let colorInfo = [];
        let i=0;
        gameModes.map(item => {
            let categoryWiseStatsData = [];
            levels.map(level => {
                let isPlayed = this.state.gameData[item.category][level.toString()].gamesPlayed !== 0;
                categoryWiseStatsData = [...categoryWiseStatsData, {
                    level: level,
                    isPlayed: isPlayed
                }]
            });
            colorInfo[i++] = {
                gameMode: item,
                levelData: categoryWiseStatsData
            };
        });
        this.setState({colorInfo})
    };

    setLevel = (level) => {
        this.setState({levelSelected:level}, this.navigateToGamePage);
    };

    navigateToGamePage = () => {
        this.props.navigation.navigate('SelectedGame', {level:this.state.levelSelected, category: this.state.categorySelected});
    };

    openModal = (item) => {
        this.setState({categorySelected: item.category});
        this.refs.customModal.toggleModal();
    };

    render() {
        
        return (
            <View style={{...styles.container,backgroundColor:this.theme.bgColor}}>

                <CustomModal ref={"customModal"} setLevel={this.setLevel}/>
                <Spinner visible={!this.state.dataLoaded}/>

                <FlatList
                    keyExtractor={item => item.gameMode.key.toString()}
                    data={this.state.colorInfo}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={{flexDirection:'row'}}
                            onPress={() => {this.openModal(item.gameMode)}}>
                            <View style={{
                                ...styles.gameModeContainer,
                            }}>
                                <View>
                                    <Image source={item.gameMode.logo} style={{marginRight:5,marginLeft:5,flex:1, width:55, height:55,
                                        borderRadius:5,
                                        resizeMode:'contain'}}/>
                                </View>
                                <Text style={{...styles.gameCategory}}>{ item.gameMode.category }</Text>

                                <View style={{
                                    flex: 1,
                                    flexDirection: 'row', alignItems:'center', justifyContent:'flex-end'}}>
                                    {
                                        item.levelData.map(levelData => (
                                            <Text
                                                key={levelData.level.toString()}
                                                style={{width:40,height:40,
                                                    marginHorizontal:2,
                                                    textAlign:'center',
                                                    textAlignVertical:'center',
                                                    borderRadius:20,
                                                    color:levelData.isPlayed ? 'white' : '#444',
                                                    backgroundColor: levelData.isPlayed? 'royalblue': '#ddd'}}>
                                                {levelData.level}
                                            </Text>
                                        ))
                                    }
                                </View>
                                </View>
                        </TouchableOpacity>
                    )} />
            </View>
        );
    }

};

const styles = StyleSheet.create({
    container: {
        flex:1,
    },
    gameModeContainer:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor:'#86ACF8',
        color:'white',
        borderWidth:2,
        borderColor:'white',
        height:90,
        borderRadius:15,
        marginHorizontal: 2,
        marginVertical: 10,
    },
    gameCategory: {
        textAlignVertical: 'center',
        fontSize: 24,
        fontWeight: '200',
        color: 'white',
        paddingHorizontal: 10,
        flex: 1
    }
});

export default GameModes;