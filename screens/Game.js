import React, { Component } from 'react';
import {StyleSheet, View, FlatList, Alert} from 'react-native'
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text ,
    Card, CardItem, Grid, Row, Col} from 'native-base';
import GameCard from "../components/GameCard";

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
            cardInfoFlatList:[],
        }
    }

    handleClick = (index) =>{
         console.log("Clicked Card ", index);
         let numClicks = this.state.numClicks+1;
         console.log("Updates Clickes ", numClicks);
            this.updateCardSelected(index, numClicks);
    };

    updateCardSelected = (index, totalClicks) => {

        let gridSize = this.state.gridSize;
        console.log("Clicks So Far ", totalClicks);

        let items = [...this.state.cardInfo];

        let rowClicked =  ~~(index / gridSize);
        let  colClicked = [index % gridSize];
        let clickedCard = {...items[rowClicked][colClicked]};

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
             }

             this.setState({cardInfo: items, numClicks : totalClicks});
         } else {
             this.setState({cardInfo: items, previousCard: index, numClicks : totalClicks});
         }
    };

    componentWillMount() {

        console.log("COmpoment Will Mount");
        let colorsToUse = this.state.colors.slice(0,this.props.totalRows);
        let colorsToApply = [];
        for (const colorToUse of colorsToUse) {
            colorsToApply = [...colorsToApply, ...Array(this.props.totalRows).fill(colorToUse)];
        }
        colorsToApply = Game.shuffle(colorsToApply);

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
                    color: colorInformation
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
                colorsToApply:colorsToApply
            },
            console.log("Color Object After Setting", cardInfoFlatList));

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

                <Grid style={{flex: 1}}>
                    {
                        this.state.cardInfo.map(
                            (row) => {
                                return (
                                    <Row style={{marginVertical:5}}>
                                        {
                                            row.map( (cardInformation) => {
                                                return(
                                                    <GameCard key={cardInformation.index}
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