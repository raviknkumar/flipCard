import React, {Component} from 'react';
import {StyleSheet, View, Text, Alert, TouchableOpacity} from 'react-native';
import {cardsInformation, levelInfo } from "../config/ResourceConfig";
import _ from "underscore";
import {Body, Button, Container, Grid, Header, Icon, Left, Right, Row} from "native-base";
import GameCard from "../components/GameCard";
import GameCardSelected from "../components/GameCardSelected";

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
        this.initializeCardInformation();
    };

    initializeCardInfo(cardValuesToApply2d, faceUpImageUri){

        let cardInfo = [], i=0;

        for (const cardValuesRow of cardValuesToApply2d) {
            let cardValuesInfo = [];
            for(const colorInformation of cardValuesRow){
                let colorInfoObj = {
                    index:i,
                    clickable: true,
                    forceFlip: false,
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

        let level = this.props.navigation.getParam('level')
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

        cardValuesToApply = _.shuffle(_.shuffle(cardValuesToApply));

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

        this.state = {
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
        };
    }

    printState(){
        console.log("State Info", this.state);
    }

    handleClick = (index) =>{
        console.log("Clicked Card ", index);
        let numClicks = this.state.totalAttempts+1;
        this.updateCardSelected(index, numClicks);
    };

    makeForceFlipFalse(items){
        for (let row of items) {
            for(let cardInfo of row){
                cardInfo.forceFlip = false;
            }
        }
        return items;
    }

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
        items = this.makeForceFlipFalse(items);
        let rowClicked =  ~~(currentCardIndex / colSize);
        let  colClicked = [currentCardIndex % colSize];

        let clickedCard = this.getElementIn2dArray(this.state.cardInfo, currentCardIndex, colSize);
        let {remainingCards, successAttempts, failureAttempts, matchedCards}  = this.state;
        //console.log("Destructured Props", remainingCards, successAttempts, failureAttempts);

        if(this.checkForMatch(currentCardIndex)){
            let previousCardIndex = this.state.previousCardIndex;
            console.log(previousCardIndex, currentCardIndex);

            let prevCard = this.getElementIn2dArray(this.state.cardInfo, previousCardIndex, colSize);
            let currCard = clickedCard;
            //console.log("Prev Card", prevCard, "Current Card", currCard);
            console.log("Colors:", prevCard.color, currCard.color);

            // Cards are not same, close both curr and prev
            if(!this.areCardsSame(prevCard, currCard)){
                currCard.forceFlip = true;
                prevCard.forceFlip = true;
                failureAttempts += 2;
            }
            // Cards are Same
            else {
                currCard.visible = false;
                prevCard.visible = false;
                remainingCards -=2;
                successAttempts +=2;
                matchedCards +=2;
                console.log("Cards Clicked Same, Matched Cards Are ", matchedCards);
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
            this.setState({cardInfo: items, previousCardIndex: currentCardIndex, totalAttempts : totalClicks});
        }
    };

    handleGameComplete(matchedCards){
        if(matchedCards === this.state.totalCards){
            Alert.alert("Game Completed","You have completed it ");
            console.log("Time : 0", "Success Atempts", this.state.successAttempts, "Failure:", this.state.failureAttempts);
        }
    }

    render() {
        return (
            <Container>

                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Text>Header</Text>
                    </Body>
                    <Right />
                </Header>

                <TouchableOpacity onPress={()=>{this.setState({totalAttempts:0})}}>
                    <Text>Refresh</Text>
                </TouchableOpacity>

                <Grid style={{flex: 1, marginVertical: 5}}>
                    {
                        this.state.cardInfo.map(
                            (row, index) => {
                                return (
                                    <Row key={index} style={{marginVertical:3, marginHorizontal:10}}>
                                        {
                                            row.map( (cardInformation) => {
                                                return(
                                                    <GameCardSelected
                                                        faceUpImageUri={cardInformation.faceUpImageUri}
                                                        key={cardInformation.index}
                                                        index={cardInformation.index}
                                                        imageUri={cardInformation.color}
                                                        clickable={cardInformation.clickable}
                                                        forceFlip={cardInformation.forceFlip}
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

