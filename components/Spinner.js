import React from 'react';
import {StyleSheet, View, Text, Image, Modal} from 'react-native'
import {Card} from "native-base";

const Spinner = (props) => {

    let isVisible = props.visible;

    return (
        <Modal visible={isVisible} transparent={true} animationType='fade'>
            <View style={{
                flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            }}>
                <Card style={{
                    height: 60,
                    width: '95%', marginHorizontal:5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft:5,
                    justifyContent: 'flex-start'
                }}>
                    <Image style={{width: 30, height: 30, resizeMode: 'cover'}}
                           source={require('../assets/icons/spinner.gif')}/>
                    <Text style={{marginLeft:10}}>Loading</Text>
                </Card>
            </View>

        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {}
});

export default Spinner;