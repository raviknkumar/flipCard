import React, {Component} from 'react';
import { AppLoading } from 'expo';
import {Asset} from "expo-asset";
import {StyleSheet, View, Text, Alert, TouchableOpacity, Dimensions, Modal, Platform, Image, BackHandler} from 'react-native';
import {cardsInformation, levelInfo } from "../config/ResourceConfig";
import _ from "underscore";
import {NavigationActions, StackActions} from 'react-navigation';
import {Body, Button, Container, Grid, Header, Icon, Left, Right, Row, Card, CardItem} from "native-base";
import GameCardSelected from "../components/GameCardSelected";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import {Menu, MenuOptions, MenuOption, MenuTrigger,} from 'react-native-popup-menu';
import {Audio} from "expo-av";
import {initializeCardInfo, getElementIn2dArray, areCardsSame, toTime, getTimeInSeconds} from "./SelectedGameHelper";
import {gameStyles} from "../styles/GameStyles";
import Toast from "react-native-root-toast";
import {StorageContext} from "../contexts/StorageContext";


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const CARD_REPEAT_FREQUENCY = 2; // Should be even only

class SelectedGame extends Component
{
    flipSound;
    backgroundSound;

    // Constructor
    constructor (props) {
        super(props);
        this.state = {
            level: 0,
            category: '',
            cardValues: [],
            cardInfo:[],
            totalRows:0,
            totalColumns:0,
            previousCardIndex: -1,
            currentCardIndex:-1,
            totalAttempts: 0,
            successAttempts:0,
            failureAttempts:0,
            remainingCards:0,
            cardValuesToApply2d:[],
            cardValuesToApply:[],
            totalCards: 0,
            matchedCards: [],
            prevTime:null,
            time:null,
            timeInMilliseconds:0,
            timer: null,
            restartGame: false,
            isPaused: false,
            resourcesLoaded: false,
            isMuted: false,
        };
        this.backgroundSound = null;
        this.flipSound = null;
    };

    static contextType = StorageContext;

    addDataToStorage = (gameInfo) => {

    };

    // LIFE CYCLE HOOKS

    async componentDidMount() {

        console.log("SelectedGame Component Did Mount");

        /* As this Component Mounts by navigation.navigate
        the below line adds the listener for didFoucs
        and it will be called upon addListener. So no initailization code is used in componentDidMount*/

        this._focusListener = this.props.navigation.addListener('didFocus', this._componentFocused);
    }

    _componentFocused = async () => {

        console.log("SelectedGame Component Focused");
        BackHandler.addEventListener("hardwareBackPress", this.backAction);

        // Set Mute
        //let muted = this.state.isMuted;
        // Sound is true => muted is false, so add ! for it
        let soundStatus = await this.context.getSound();
        let muted = !soundStatus;

        // Set muted to previous muted as initializeCardInformation refresh the stateData
        this.setState({isMuted: muted});

        // toggle all selected cards
        // flip all Matched
        for (const matchedCard of this.state.matchedCards) {
            this.refs['card' + matchedCard].flipCard();
        }

        // flip currentCard if any
        if (this.state.previousCardIndex !== -1) {
            this.refs['card' + this.state.previousCardIndex].flipCard();
        }

        // create Sounds
        await this.createSounds();

        // initialize Card Info
        this.initializeCardInformation();

        // startTimer
        this.startTimer();
    };

    async componentWillUnmount() {

        console.log("SelectedGame Component Will UnMount");

        // Remove Back press Handler added
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);

        // Remove didFocus Listener added
        this._focusListener.remove();

        // clear timer
        clearInterval(this.state.timer);

        // Clear Audio
        await this.unloadSounds();
    }

    // Init METHODS
    initializeCardInformation(){

        let level = this.props.navigation.getParam('level');
        let category = this.props.navigation.getParam('category');

        console.log("Initialize Card Info");

        let rowSize = levelInfo[level].rows;
        let colSize = levelInfo[level].columns;
        let totalCards = rowSize * colSize;
        let cardValues = [...cardsInformation[category].cardInfo];
        let faceUpImageUri = cardsInformation[category].faceUpImageUri;

        let cardValuesToUse = cardValues.slice(0,~~(totalCards / CARD_REPEAT_FREQUENCY));

        let cardValuesToApply = [];
        // Every Card is repeated twice, so loop twice
        for(let i=0; i< CARD_REPEAT_FREQUENCY; i++){
            cardValuesToApply = [...cardValuesToApply, ...cardValuesToUse];
        }

        cardValuesToApply = _.shuffle(cardValuesToApply);

        let cardValuesToApply2d = [];
        let k = 0;
        for(let i=0; i< rowSize ; i++){
            let cardValue1d = [];
            for(let j=0; j< colSize; j++){
                cardValue1d.push(cardValuesToApply[k++])
            }
            cardValuesToApply2d.push(cardValue1d);
        }

        let cardInfo = initializeCardInfo(cardValuesToApply2d, faceUpImageUri);

        this.setState({
            level: level,
            category: category,
            cardValues: cardValues,
            cardInfo:cardInfo,
            totalRows:rowSize,
            totalColumns:colSize,
            previousCardIndex: -1,
            currentCardIndex:-1,
            totalAttempts: 0,
            successAttempts:0,
            failureAttempts:0,
            remainingCards:rowSize * colSize,
            cardValuesToApply2d:cardValuesToApply2d,
            cardValuesToApply:cardValuesToApply,
            totalCards: rowSize * colSize,
            matchedCards: [],
            prevTime:null,
            time:null,
            timeInMilliseconds:0,
            timer: null,
            restartGame: false,
            isPaused: false,
            resourcesLoaded: false,
        });
    }

    // to handle restart game from the level Complete Screen
    restartLevel = async () => {
        await this.createSounds();
        this.restartGame();
    };

    restartGame = () =>{

        let muted = this.state.isMuted;
        console.log("Card Info: ", this.state.cardInfo);
        // toggle all selected cards
        // flip all Matched
        for (const matchedCard of this.state.matchedCards) {
            this.refs['card'+matchedCard].flipCard();
        }
        // flip currentCard if any
        if(this.state.previousCardIndex !== -1){
            this.refs['card'+this.state.previousCardIndex].flipCard();
        }
        this.initializeCardInformation();
        this.setState({isMuted:muted});
        this.startTimer();
    };

    handleClick = (index) =>{
        this.playFlipSound();
        let numClicks = this.state.totalAttempts+1;
        this.updateCardSelected(index, numClicks);
    };

    updateCardSelected = (currentCardIndex, totalClicks) => {

        let colSize = this.state.totalColumns;

        let items = [...this.state.cardInfo];
        let rowClicked =  ~~(currentCardIndex / colSize);
        let  colClicked = [currentCardIndex % colSize];

        let clickedCard = getElementIn2dArray(this.state.cardInfo, currentCardIndex, colSize);
        let {remainingCards, successAttempts, failureAttempts, matchedCards}  = this.state;
        //console.log("Destructured Props", remainingCards, successAttempts, failureAttempts);

        if(this.checkForMatch(currentCardIndex)){

            let previousCardIndex = this.state.previousCardIndex;
            //console.log(previousCardIndex, currentCardIndex);

            let prevCard = getElementIn2dArray(this.state.cardInfo, previousCardIndex, colSize);
            let currCard = clickedCard;

            // Cards are not same, close both curr and prev
            if(!areCardsSame(prevCard, currCard)){

                let prevCardRef =  this.refs['card'+previousCardIndex];
                let currCardRef =  this.refs['card'+currentCardIndex];
                setTimeout(()=>{
                   prevCardRef.flipCard();
                   currCardRef.flipCard();
                }, GameCardSelected.CARD_FLIP_DURATION+100);

                failureAttempts += 2;
            }
            // Cards are Same
            else {
                currCard.visible = false;
                prevCard.visible = false;
                remainingCards -=2;
                successAttempts +=2;
                matchedCards  = [...matchedCards, currentCardIndex, previousCardIndex];
                console.log("Cards Clicked Same, Matched Cards Are ", matchedCards.length);
            }

            items[rowClicked][colClicked] = {...currCard};
            items[~~(previousCardIndex / colSize)][previousCardIndex % colSize] = {...prevCard};
            previousCardIndex = -1; // Reset it back
            this.setState({cardInfo: items,
                previousCardIndex: previousCardIndex,
                remainingCards : remainingCards,
                successAttempts: successAttempts,
                failureAttempts: failureAttempts,
                matchedCards: matchedCards}, this.handleGameComplete);
        }
        else {
            this.setState({cardInfo: items, previousCardIndex: currentCardIndex});
        }
    };

    checkForMatch = (currentCardIndex) => {
        return this.state.previousCardIndex !== -1 && this.state.previousCardIndex !== currentCardIndex;
    };

    async handleGameComplete() {
        if(this.state.matchedCards.length === this.state.totalCards){
            BackHandler.removeEventListener("hardwareBackPress", this.backAction);
            this.stopTimer();
            // clear back press

            await this.unloadSounds();

            // store data for stats

            try {
                 let {addDataToLevel} = this.context;
                await addDataToLevel({
                    level: this.state.level,
                    levelDescription: this.state.level,
                    category: this.state.category,
                    time: getTimeInSeconds(this.state.time),
                    correctSelections: (this.state.successAttempts) / 2,
                    inCorrectSelections: (this.state.failureAttempts) / 2,
                });

            } catch (e) {
                console.log("Error in Adding Data To Storage", e);
            }

            this.props.navigation.navigate('LevelComplete', {
                level: this.state.level,
                category: this.state.category,
                totalSelections: (this.state.successAttempts + this.state.failureAttempts) / 2,
                correctSelections: (this.state.successAttempts) / 2,
                inCorrectSelections: (this.state.failureAttempts) / 2,
                time: this.state.time,
                restartLevel: this.restartLevel
            });
        }
    }


    // Game Control Methods
    resetState(){
        this.setState({totalAttempts:0});
    }

    pauseGame = () => {
        this.setState({isPaused:true}, this.stopTimer);
    };

    resumeGame = () => {
        this.setState({isPaused:false},this.startTimer);
    };

    exitGame = async () => {

        // Used to close Modal
        this.setState({isPaused:false}, this.stopTimer);

        await this.unloadSounds();
        const resetAction = StackActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({routeName: 'Home'}),
                NavigationActions.navigate({routeName: 'GameModes'})
            ]
        });
        this.props.navigation.dispatch(resetAction);
    };

    // TIMER METHODS
    tick = () => {

        // timeInMilliseconds - timeElapsedSoFar
        let prevTime = this.state.prevTime, timeInMilliseconds = this.state.timeInMilliseconds;
        let time = this.state.time ? this.state.time : {};

        let prev = prevTime ? prevTime : Date.now();
        let diffTime = Date.now() - prev;
        timeInMilliseconds = timeInMilliseconds + diffTime;
        let newTime = toTime(timeInMilliseconds);
        prevTime = (Date.now());
        time = newTime;
        this.setState({prevTime, time, timeInMilliseconds});
    };

    startTimer = () => {

        let timer = setInterval(this.tick,1000);
        this.setState({ timer });
    };

    stopTimer = () => {
        clearInterval(this.state.timer);
        this.setState({prevTime:null});
    };

    // MENU METHODS
    onOptionSelect(value){
        console.log("Selected ", value);

        // pause game
        if(value === 1){
            this.pauseGame();
        }
        // Restart Game
        else if(value === 2){
            this.restartGame();
        }
        // Exit Game
        else if(value === 3){
            this.exitGame();
        }

        this.menu.close();
    }

    onRef = r => {
        this.menu = r;
    };

    /* --------- Sound Releated Methods --- */

    /**
     * Used to create sounds used in this screen
     * @returns {Promise<void>}
     */
    createSounds = async () => {

        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
                staysActiveInBackground: false,
                interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                playsInSilentModeIOS: true,
                shouldDuckAndroid: true,
                interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
                playThroughEarpieceAndroid: false
            });
        } catch (e) {
            console.log("Error in setAudioModeAsync", e);
        }

        await this._playRecording(require('./../assets/sounds/backgroundMusic.mp3'), true, true);
        try {
            const {sound} = await Audio.Sound.createAsync(
                require('./../assets/sounds/flip.wav'),
                {
                    shouldPlay: false,
                    isLooping: false,
                },
            );

            this.flipSound = sound;
            console.log("Created Flip Sound ", this.flipSound !== null);
        } catch (e) {
            console.log("Error In Creating FlipCard Sound", e)
        }
    };

    async _playRecording(uri, shouldPlay, isLooping) {

        try {
            const {sound} = await Audio.Sound.createAsync(
                uri,
                {
                    shouldPlay: shouldPlay,
                    isLooping: isLooping,
                    isMuted: this.state.isMuted
                },
            );
            this.backgroundSound = sound;

            console.log("Created Sound ", this.backgroundSound !== null);
            this.setState({
                playingStatus: 'playing'
            });
        } catch (e) {
            console.log("Error In Creating Background Sound", e);
        }
    }

    async playFlipSound(){
        if(!this.state.isMuted)
            await this.flipSound.playFromPositionAsync(0)
    }

    async _pauseAndPlayRecording() {
        if (this.backgroundSound != null) {
            if (this.state.playingStatus === 'playing') {
                //console.log('pausing...');
                await this.backgroundSound.pauseAsync();
                //console.log('paused!');
                this.setState({
                    playingStatus: 'donepause',
                });
            } else {
                //console.log('playing...');
                await this.backgroundSound.playAsync();
                //console.log('playing!');
                this.setState({
                    playingStatus: 'playing',
                });
            }
        }
    }

    _syncPauseAndPlayRecording() {
        if (this.backgroundSound != null) {
            if (this.state.playingStatus == 'playing') {
                this.backgroundSound.pauseAsync();
            } else {
                this.backgroundSound.playAsync();
            }
        }
    }

    _playAndPause = () => {
        switch (this.state.playingStatus) {
            case 'nosound':
                this._playRecording();
                break;
            case 'donepause':
            case 'playing':
                this._pauseAndPlayRecording();
                break;
        }
    };

    _onMutePressed = async () => {
        if (this.backgroundSound != null) {
            let isMuted = this.state.isMuted;
            await this.context.toggleSound(!isMuted);
            await this.backgroundSound.setIsMutedAsync(!isMuted);
            this.setState({isMuted: !isMuted});
        }
    };

    unloadSounds = async () => {

        console.log('Unload Sounds');

        if (this.backgroundSound != null) {
            try {
                await Promise.all([this.backgroundSound.stopAsync(),this.backgroundSound.unloadAsync()]);
                this.backgroundSound = null;
            } catch (e) {
                console.log("Error in Background Sound StopAsync or Unload Async")
            }
        }

        if (this.flipSound != null) {
            try {
                await this.flipSound.unloadAsync();
                this.flipSound = null;
            } catch (e) {
                console.log("Error in FlipSound StopAsync or Unload Async")
            }
        }
    };


    // HANDLE BACK PRESS
    backAction = () => {
        Alert.alert("About To Quit!", "Are you sure you want to Quit the game?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            {
                //text: "QUIT", onPress: () => {this.exitGame()}
                text: "QUIT", onPress: () => {this.props.navigation.goBack()}
            }
        ]);
        return true;
    };

    render() {

        return (
                <Container>

                    <Header>

                        <Body>
                            {
                                this.state.time &&
                                <Text
                                    style={gameStyles.counterText}>{this.state.time.minutes} : {this.state.time.seconds}</Text>
                            }
                        </Body>
                        <Right>

                            <Button transparent onPress={this._onMutePressed}>
                                <View style={{width:40, height:40, borderRadius:20, backgroundColor:'white', alignItems:'center', justifyContent:'center'}}>
                                {
                                    this.state.isMuted ?
                                        <Image source={require("./../assets/icons/icons8-mute-30.png")}/> :
                                        <Image source={require("./../assets/icons/icons8-speaker-30.png")}/>
                                }
                                </View>
                            </Button>

                            <Menu onSelect={value => this.onOptionSelect(value)} ref={this.onRef}>
                                <MenuTrigger>
                                    <Image
                                        source={require('./../assets/icons/baseline_more_vert_white_24dp.png')}
                                        style={{
                                        width: 30, height:40, marginRight: 2, alignItems:'center', justifyContent:'flex-start'
                                    }}/>
                                </MenuTrigger>
                                <MenuOptions>
                                    <MenuOption value={1}>
                                        <Text style={{padding:5, fontWeight:'200'}}>Pause</Text>
                                    </MenuOption>
                                    <View style={gameStyles.divider}/>
                                    <MenuOption value={2}>
                                        <Text style={{padding:5, fontWeight:'200'}}>Restart</Text>
                                    </MenuOption>
                                    <View style={gameStyles.divider}/>
                                    <MenuOption value={3}>
                                        <Text style={{padding:5, fontWeight:'200', marginBottom:3}}>Exit</Text>
                                    </MenuOption>
                                </MenuOptions>
                            </Menu>
                        </Right>
                    </Header>

                    <Modal visible={this.state.isPaused} transparent={true} animationType='slide'>

                        <View style={{
                            flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                        }}>

                            <Card>

                                <View style={{
                                    height: 100, backgroundColor: '#444',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-around'
                                }}>

                                    <Image source={require('../assets/icons/baseline_pause_white_48dp.png')} style={{
                                        paddingLeft: 20,
                                    }}/>

                                    <Text style={{color: 'white', fontSize: 32, fontWeight: '700'}}>
                                        Game Paused
                                    </Text>
                                </View>

                                <CardItem>
                                    <View style={{
                                        width: 300, height: 200, alignItems: 'center', justifyContent: 'space-around'}}>

                                        <Button success style={{paddingHorizontal: 10}} onPress={this.resumeGame}>
                                            <Image source={require('../assets/icons/baseline_play_arrow_white_24dp.png')}
                                                   style={{width:24, paddingRight:5}}/>
                                            <Text>Resume</Text>
                                        </Button>

                                        <Button danger style={{paddingHorizontal: 10}} onPress={this.exitGame}>
                                            <Image source={require('../assets/icons/baseline_exit_to_app_white_24dp.png')}
                                                   style={{width:24, paddingRight:5}}/>
                                            <Text>Exit Game</Text>
                                        </Button>
                                    </View>
                                </CardItem>
                            </Card>
                        </View>

                    </Modal>

                    <Grid style={{flex: 1, marginVertical: 5}}>
                        {
                            this.state.cardInfo.map(
                                (row, index) => {
                                    return (
                                        <Row key={index} style={{marginVertical: 3, marginHorizontal: 10}}>
                                            {
                                                row.map((cardInformation) => {
                                                    return (
                                                        <GameCardSelected
                                                            ref={'card' + cardInformation.index}
                                                            width={width / this.state.totalColumns}
                                                            height={height / this.state.totalRows}
                                                            faceUpImageUri={cardInformation.faceUpImageUri}
                                                            key={cardInformation.index}
                                                            index={cardInformation.index}
                                                            imageUri={cardInformation.color}
                                                            clickable={cardInformation.clickable}
                                                            handleClick={this.handleClick}/>
                                                    )
                                                })
                                            }
                                        </Row>
                                    )
                                }
                            )
                        }
                    </Grid>

                </Container>
            );
        }
}

const styles = StyleSheet.create({

});

export default SelectedGame;
