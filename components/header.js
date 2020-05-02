import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, Platform } from 'react-native';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';

export default function Header({ title, iosIcon, icon}) {

  return (
    <View style={styles.header}>
      <View style={{flexDirection:'row',justifyContent:'center', alignItems: 'center'}}>
        <Text style={styles.headerText}>{title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#333',
    letterSpacing: 1,
    justifyContent: 'center',
    marginLeft:10,
  },
  icon: {
    position: 'absolute',
    left: 16,
  },
  headerTitle: {
    flexDirection: 'row',
  },
  headerImage: {
    width: 26,
    height: 26,
    marginHorizontal: 10
  },
});