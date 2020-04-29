import React, {useState, useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity,TouchableWithoutFeedback, Modal, FlatList, Keyboard} from 'react-native'
import {gameModes} from "../config/ResourceConfig";
import {Card} from "native-base";
import {globalStyles} from "../styles/global";
import CustomModal from "./CustomModal";

class GameModes extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            levelSelected:0,
            categorySelected:'',
        }
    }

    setLevel = (level) => {
        console.log("Set Level", level);
        this.setState({levelSelected:level}, this.navigateToGamePage);
    }

    navigateToGamePage = () => {
        this.props.navigation.navigate('SelectedGame', {level:this.state.levelSelected, category: this.state.categorySelected});
    };

    openModal = (item) => {
        this.setState({categorySelected: item.category});
        this.refs.customModal.toggleModal();
    };

    render() {
        return (
            <View style={styles.container}>

                <CustomModal ref={"customModal"} setLevel={this.setLevel}/>

                <FlatList
                    keyExtractor={item => item.key.toString()}
                    data={gameModes}
                    renderItem={({ item }) => (
                        <TouchableOpacity onPress={() => {this.openModal(item)}}>
                            <Card>
                                <Text style={globalStyles.titleText}>{ item.category }</Text>
                            </Card>
                        </TouchableOpacity>
                    )} />
            </View>
        );
    }

};

const styles = StyleSheet.create({
    container: {}
});

export default GameModes;