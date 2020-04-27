import React, { Component } from 'react';
import {StyleSheet, View, FlatList, Alert, TouchableOpacity} from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text ,
    Card, CardItem, Grid, Row, Col} from 'native-base';
import GameCard from "../components/GameCard";
import _ from 'underscore'

export default class Game extends Component {


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
        this.state = {
            colors: ['red', 'blue', 'yellow', 'green', 'pink', 'orange', 'violet', 'magenta'],
            colorsToUse:[],
            colorsToApply:[],
            gridSize:0,
            previousCard: -1,
            currentCard:-1,
            numClicks: 0,
            cardInfo:[],
            successAttempts:0,
            failureAttempts:0,
            remainingCards:0,
        }
    }

    componentWillMount() {

        console.log("COmpoment Will Mount");
        let gridSize = this.props.totalRows;
        let colorsToUse = this.state.colors.slice(0,this.props.totalRows);
        let colorsToApply = [];

        for(let i=0; i< gridSize; i++){
            colorsToApply = [...colorsToApply, ...colorsToUse];
        }

        colorsToApply = _.shuffle(_.shuffle(colorsToApply));
        console.log("Colors To Use", colorsToApply);

        let colorsToApply2d = [];
        while(colorsToApply.length) colorsToApply2d.push(colorsToApply.splice(0,this.props.totalRows));

        // console.log("2d Array:",colorsToApply2d);

        let i = 0;
        let colorInfo2d = [];
        let cardInfoFlatList = [];
        for (const colorsToApply2dElement of colorsToApply2d) {
            let colorInfo = [];
            for(const colorInformation of colorsToApply2dElement){
                let colorInfoObj = {
                    index:i,
                    clickable: true,
                    forceFlip: false,
                    color: colorInformation,
                    visible: true
                };

                colorInfo.push(colorInfoObj);
                i++;
                cardInfoFlatList.push(colorInfoObj);
            }
            colorInfo2d.push(colorInfo);
        }
        this.setState({cardInfo: colorInfo2d,
                gridSize:this.props.totalRows,
                cardInfoFlatList: [...cardInfoFlatList],
                colorsToApply2d:colorsToApply2d,
                colorsToApply:colorsToApply,
                remainingCards: this.props.totalRows * this.props.totalRows
            },
            console.log("Color Object After Setting", this.state.gridSize));

    }

    handleClick = (index) =>{
         console.log("Clicked Card ", index);
         let numClicks = this.state.numClicks+1;
         console.log("Updates Clickes ", numClicks);
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

    updateCardSelected = (index, totalClicks) => {

        let gridSize = this.state.gridSize;

        let items = [...this.state.cardInfo];
        items = this.makeForceFlipFalse(items);

        let rowClicked =  ~~(index / gridSize);
        let  colClicked = [index % gridSize];
        let clickedCard = {...items[rowClicked][colClicked]};
        let {remainingCards, successAttempts, failureAttempts}  = this.state;
        console.log("Destructured Props", remainingCards, successAttempts, failureAttempts);

         if(totalClicks % 2 === 0){

             let previousCard = this.state.previousCard;
             console.log(previousCard, index);

             let prevCard = this.state.cardInfo[~~(previousCard / gridSize)][previousCard % gridSize];
             let currCard = clickedCard;
             console.log("Colors:", prevCard.color, currCard.color);

             if(prevCard.color !== currCard.color){
                 // close both curr and prev
                 currCard.forceFlip = true;
                 prevCard.forceFlip = true;
                 failureAttempts += 2;
             } else {
                 currCard.visible = false;
                 prevCard.visible = false;
                 remainingCards -=2;
                 successAttempts +=2;
                 this.handleGameComplete(remainingCards);
             }
             items[rowClicked][colClicked] = {...currCard};
             items[~~(previousCard / gridSize)][previousCard%gridSize] = {...prevCard};
             this.setState({cardInfo: items, numClicks : totalClicks,
                 remainingCards : remainingCards, successAttempts: successAttempts, failureAttempts: failureAttempts});
         } else {
             this.setState({cardInfo: items, previousCard: index, numClicks : totalClicks});
         }
    };

    handleGameComplete(remainingCards){
        if(remainingCards === 0){
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

                <TouchableOpacity onPress={()=>{this.setState({numClicks:0})}}>
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
                                                    <GameCard
                                                        key={cardInformation.index}
                                                              index={cardInformation.index}
                                                              color={cardInformation.color}
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

/*return(
                                                    <View style={{flex:1, backgroundColor:'green'}}>
                                                        <Card style={{flex:1}}>
                                                            <Text style={{textAlign:'center'}}>Gello</Text>
                                                        </Card>
                                                    </View>
                                                )*/