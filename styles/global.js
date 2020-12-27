import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  titleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  paragraph: {
    marginVertical: 8,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
  },
  errorText: {
    color: 'crimson',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 6,
    textAlign: 'center',
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

  buttonContainerFitToWidth:{
    backgroundColor:'#86ACF8',
    color:'white',
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
    color:'white'
  }
});