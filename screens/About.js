import React from 'react';
import {StyleSheet, View, Text, Modal} from 'react-native'
import {Card, CardItem, Container, Icon, Button} from "native-base";

const About = (props) => {

    const closeModal = () => {

    }

    return (
        <View style={styles.container}>
            <Text>About</Text>
            <Modal visible={true} transparent={true} animationType='slide' onRequestClose={closeModal}>

                <View style={{
                    flex: 1, flexDirection:'column', alignItems: 'center', justifyContent: 'center',}}>

                    <Card>

                        <View style={{height:100, backgroundColor:'#444',
                            flexDirection:'row',
                            alignItems:'center',
                            justifyContent:'space-around'}}>

                            <Icon name='pause' style={{fontSize: 60, fontWeight: '700', color: '#bbb', textAlign:'center'}}/>

                            <Text style={{color:'white', fontSize:32, fontWeight:'700'}}>
                                Game Paused
                            </Text>
                        </View>

                        <CardItem>
                            <View style={{
                                width: 300, height: 200, alignItems: 'center', justifyContent:'space-around'
                            }}>
                                <Button success style={{paddingHorizontal:10}}>
                                    <Icon name='play' />
                                    <Text>Resume</Text>
                                </Button>

                                <Button danger style={{paddingHorizontal:10}}>
                                    <Icon name='exit' />
                                    <Text>Exit</Text>
                                </Button>
                            </View>
                        </CardItem>
                    </Card>
                </View>

            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {}
});

export default About;