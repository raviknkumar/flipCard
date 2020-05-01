import React, {Component} from 'react';
import { AppLoading } from 'expo';
import {Asset} from "expo-asset";
import {StyleSheet, View, Text, Alert, TouchableOpacity, Dimensions, Modal, Platform} from 'react-native';
import {cardsInformation, levelInfo } from "../config/ResourceConfig";
import _ from "underscore";
import {NavigationActions, StackActions} from 'react-navigation';
import {Body, Button, Container, Grid, Header, Icon, Left, Right, Row, Card, CardItem} from "native-base";
import GameCardSelected from "../components/GameCardSelected";
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

import {
    Menu,
    MenuProvider,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const CARD_REPEAT_FREQUENCY = 2; // Should be even only

class SelectedGame extends Component
{
    static shuffle(array) {

        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * i);
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp
        }
        return array;
    }

    constructor (props) {
        super(props);
        this.state = {};
    };

    UNSAFE_componentWillMount() {
        this.initializeCardInformation();
        this.startTimer();
        //setTimeout(()=>{this.handleGameComplete(this.state.totalCards)}, 8000)
    }

    initializeCardInfo(cardValuesToApply2d, faceUpImageUri){

        let cardInfo = [], i=0;

        for (const cardValuesRow of cardValuesToApply2d) {
            let cardValuesInfo = [];
            for(const colorInformation of cardValuesRow){
                let colorInfoObj = {
                    index:i,
                    clickable: true,
                    id: colorInformation.id,
                    color: colorInformation.prop,
                    visible: true,
                    faceUpImageUri: faceUpImageUri
                };
                cardValuesInfo.push(colorInfoObj);
                i++;
            }
            cardInfo.push(cardValuesInfo);
        }
        return cardInfo;
    }

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

        let cardInfo = this.initializeCardInfo(cardValuesToApply2d, faceUpImageUri);

        /*this.state = {
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
            matchedCards: 0,
            prevTime:null,
            time:null,
            timeInMilliseconds:0,
            timer: null,
            restartGame: false,
        };*/

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

    restartGame = () =>{

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
        this.startTimer();
        //setTimeout(()=>{this.handleGameComplete(this.state.totalCards)}, 8000)
    };

    printState(){
        console.log("State Info", this.state);
    }

    handleClick = (index) =>{
        let numClicks = this.state.totalAttempts+1;
        this.updateCardSelected(index, numClicks);
    };

    getElementIn2dArray(array2d, index1d, colSize){
        return {...array2d[~~(index1d / colSize)][index1d % colSize]};
    }

    areCardsSame(card1, card2){
        return card1.color === card2.color && card1.index !== card2.index;
    }

    checkForMatch(currentCardIndex){
        return this.state.previousCardIndex !== -1 && this.state.previousCardIndex !== currentCardIndex;
    }

    updateCardSelected = (currentCardIndex, totalClicks) => {

        let colSize = this.state.totalColumns;

        let items = [...this.state.cardInfo];
        let rowClicked =  ~~(currentCardIndex / colSize);
        let  colClicked = [currentCardIndex % colSize];

        let clickedCard = this.getElementIn2dArray(this.state.cardInfo, currentCardIndex, colSize);
        let {remainingCards, successAttempts, failureAttempts, matchedCards}  = this.state;
        //console.log("Destructured Props", remainingCards, successAttempts, failureAttempts);

        if(this.checkForMatch(currentCardIndex)){
            let previousCardIndex = this.state.previousCardIndex;
            //console.log(previousCardIndex, currentCardIndex);

            let prevCard = this.getElementIn2dArray(this.state.cardInfo, previousCardIndex, colSize);
            let currCard = clickedCard;
            //console.log("Prev Card", prevCard, "Current Card", currCard);
            //console.log("Colors:", prevCard.color, currCard.color);

            // Cards are not same, close both curr and prev
            if(!this.areCardsSame(prevCard, currCard)){
                this.refs['card'+previousCardIndex].flipCard();
                setTimeout(()=>{
                    this.refs['card'+currentCardIndex].flipCard();
                }, 0);
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
                this.handleGameComplete(matchedCards);
            }

            items[rowClicked][colClicked] = {...currCard};
            items[~~(previousCardIndex / colSize)][previousCardIndex % colSize] = {...prevCard};
            previousCardIndex = -1; // Reset it back
            this.setState({cardInfo: items,
                previousCardIndex: previousCardIndex,
                totalAttempts : totalClicks,
                remainingCards : remainingCards,
                successAttempts: successAttempts,
                failureAttempts: failureAttempts,
                matchedCards: matchedCards});
        }
        else {
            //
            this.setState({cardInfo: items, previousCardIndex: currentCardIndex, totalAttempts : totalClicks});
        }
    };

    handleGameComplete(matchedCards){
        if(matchedCards.length === this.state.totalCards){
            //Alert.alert("Game Completed","You have completed it ");
            console.log("Time : 0", "Success Atempts", this.state.successAttempts, "Failure:", this.state.failureAttempts);
            this.stopTimer();

            this.props.navigation.navigate('GameStats', {
                level: this.state.level,
                category: this.state.category,
                totalSelections: (this.state.totalAttempts+2)/2,
                correctSelections: (this.state.successAttempts+2)/2,
                inCorrectSelections: (this.state.failureAttempts+2)/2,
                time: this.state.time,
                restartGame: this.restartGame
            });
        }
    }

    resetState(){
        this.setState({totalAttempts:0});
    }

    pauseGame = () => {
        this.setState({isPaused:true}, this.stopTimer);
    };

    resumeGame = () => {
        this.setState({isPaused:false},this.startTimer);
    };

    exitGame = () => {
        this.stopTimer();
        this.setState({isPaused:false});
        const resetAction = StackActions.reset({
            index: 1,
            actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
                NavigationActions.navigate({ routeName: 'GameModes' })
            ]
        });
        this.props.navigation.dispatch(resetAction);
    }

    tick = () => {

        // timeInMilliseconds - timeElapsedSoFar
        let prevTime = this.state.prevTime, timeInMilliseconds = this.state.timeInMilliseconds;
        let time = this.state.time ? this.state.time : {};

        let prev = prevTime ? prevTime : Date.now();
        let diffTime = Date.now() - prev;
        timeInMilliseconds = timeInMilliseconds + diffTime;
        let newTime = this.toTime(timeInMilliseconds);
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

    toTime = time => {
        let milliseconds = parseInt(time % 1000),
            seconds = Math.floor((time / 1000) % 60),
            minutes = Math.floor(time / (1000 * 60));

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        return {
            milliseconds,
            seconds,
            minutes
        };
};

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

        this.menu.close();
    }

    onRef = r => {
        this.menu = r;
    };

    loadResources = async () => {

        let category = this.props.navigation.getParam('category');

        console.log("Load Resources");

        let cardInfoArray = [...cardsInformation[category].cardInfo];
        let imagesToCache = [];
        for (const cardInfo of cardInfoArray) {
            imagesToCache = [...imagesToCache, cardInfo.prop];
        }

        let cardFaceUp = cardsInformation[category].faceUpImageUri;
        if(cardFaceUp){
            imagesToCache = [...imagesToCache, cardFaceUp];
        }

        return  Promise.all([
            Asset.loadAsync(imagesToCache),
        ]);
    };

    _handleLoadingError = error => {
        // In this case, you might want to report the error to your error
        // reporting service, for example Sentry
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({ resourcesLoaded: true });
    };

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    render() {
            return (
                <Container>

                    <Header>
                        <Left>
                            <Button transparent>
                                <Ionicons name={Platform.OS === 'ios' ? "ios-menu" : 'md-menu'} size={32} color="blue" />
                            </Button>
                        </Left>
                        <Body>
                            {
                                this.state.time &&
                                <Text
                                    style={styles.counterText}>{this.state.time.minutes} : {this.state.time.seconds}</Text>
                            }
                        </Body>
                        <Right>
                            <Menu onSelect={value => this.onOptionSelect(value)} ref={this.onRef}>
                                <MenuTrigger>
                                    <Icon name='more' style={{
                                        fontSize: 30, width: 50, marginRight: 2, textAlign: 'center',
                                        fontWeight: '700', color: 'white'
                                    }}/>
                                </MenuTrigger>
                                <MenuOptions>
                                    <MenuOption value={1}>
                                        <Text style={{padding:5, fontWeight:'200'}}>Pause</Text>
                                    </MenuOption>
                                    <View style={styles.divider}/>
                                    <MenuOption value={2}>
                                        <Text style={{padding:5, fontWeight:'200'}}>Restart</Text>
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

                                    <Icon name='pause' style={{
                                        fontSize: 60,
                                        fontWeight: '700',
                                        color: '#bbb',
                                        textAlign: 'center'
                                    }}/>

                                    <Text style={{color: 'white', fontSize: 32, fontWeight: '700'}}>
                                        Game Paused
                                    </Text>
                                </View>

                                <CardItem>
                                    <View style={{
                                        width: 300, height: 200, alignItems: 'center', justifyContent: 'space-around'
                                    }}>
                                        <Button success style={{paddingHorizontal: 10}} onPress={this.resumeGame}>
                                            <Icon name='play'/>
                                            <Text>Resume</Text>
                                        </Button>

                                        <Button danger style={{paddingHorizontal: 10}} onPress={this.exitGame}>
                                            <Icon name='exit'/>
                                            <Text>Exit Game</Text>
                                        </Button>
                                    </View>
                                </CardItem>
                            </Card>
                        </View>

                    </Modal>

                    <TouchableOpacity onPress={this.resetState}>
                        <Text>Refresh</Text>
                    </TouchableOpacity>

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
    counterText:{
        fontSize: 28,
        color: '#fff'
    },
    divider: {
        marginVertical: 5,
        marginHorizontal: 2,
        borderBottomWidth: 1,
        borderColor: '#eee'
    },
});

export default SelectedGame;


/*Font.loadAsync({
                Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
                Arial: require("native-base/Fonts/Roboto.ttf"),
                Roboto: require("native-base/Fonts/Roboto.ttf"),
                Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
            }),*/