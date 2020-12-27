import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Alert,
    BackHandler,
    Platform,
    StatusBar
} from 'react-native'
import {Container, Content, Button, Header, Footer} from "native-base";
import GameHeader from "../components/GameHeader";
import RNExitApp from 'react-native-exit-app';

class Home extends Component{

    static navigationOptions = {
        headerShown: false
    };

    handleExit = () => {
        console.log("Exit")
        Alert.alert(
            'Exit App',
            'Do you want to exit?',
            [
                {text: 'No', onPress: () => null , style: 'cancel'},
                {text: 'Yes', onPress: () => this.exitApp()},
            ],
            { cancelable: false });
        return true;
    };

    navigateToScreen = (screenName) => {

        // clear handle back press before navigating
        BackHandler.removeEventListener('hardwareBackPress', this.backAction);

        // navigate to new screen
        this.props.navigation.navigate(screenName);
    };

    navigateToGameModes = () => {

        // clear handle back press before navigating
        BackHandler.removeEventListener('hardwareBackPress', this.backAction);

        // navigate to new screen
        this.props.navigation.navigate('GameModes');
    }

    exitApp(){
        if (Platform.OS === 'android') {
            BackHandler.exitApp();
        } else {
            RNExitApp.exitApp();
        }
    }

    constructor(props){
        super(props);
        this.state = {statusBarStyle : ['default','dark-content', 'light-content']};
    }

    componentDidMount() {
        console.log("Home Component Did Mount")
        this._focusListener = this.props.navigation.addListener('didFocus', this._componentFocused);
    }

    _componentFocused = async () => {

        console.log("Home Component Focused");
        BackHandler.addEventListener("hardwareBackPress", this.backAction);
    };

    componentWillUnmount() {
        console.log("Home Component Will UnMount");
        BackHandler.removeEventListener("hardwareBackPress", this.backAction);
        this._focusListener.remove();
    }

    // HANDLE BACK PRESS
    backAction = () => {
        this.handleExit();
        return true;
    };

    render() {
        return (
            <Container style={styles.container}>

                <StatusBar backgroundColor="#273048" barStyle={this.state.statusBarStyle[2]} />

                <View style={{flex:1}}>
                    <GameHeader />
                </View>


                <View style={{flex: 2, marginTop: 5}}>

                    <ScrollView>
                        <View style={{alignItems: 'center', justifyContent: 'center'}}>
                            <TouchableOpacity style={styles.buttonContainer} onPress={()=> this.navigateToScreen('GameModes')}>
                                <Text style={styles.buttonText}>New Game</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonContainer}
                                onPress={() => this.navigateToScreen('Stats')}>
                                <Text style={styles.buttonText}>Stats</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.navigateToScreen('About')}>
                                <Text style={styles.buttonText}>About</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.navigateToScreen('Settings')}>
                                <Text style={styles.buttonText}>Settings</Text>
                            </TouchableOpacity>

                        </View>
                    </ScrollView>
                </View>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container:{
      display:'flex',
        backgroundColor:'#273048'
    },
    buttonStyle:{
        marginVertical: 20,
        marginHorizontal:10,
    },
    buttonContainer:{
        backgroundColor:'#86ACF8',
        color:'white',
        width:'90%',
        justifyContent:'center',
        borderWidth:2,
        borderColor:'white',
        height:80,
        borderRadius:15,
        marginHorizontal: 20,
        marginVertical: 10,
    },
    buttonText:{
        textAlignVertical:'center',
        textAlign:'center',
        fontSize:24,
        fontWeight: '200',
        color:'white',
        fontFamily:'nunito-bold'
    }
});

export default Home;