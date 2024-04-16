import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopNavigation from '../NavigationBars/TopNavigation';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function Dashboard() {
  const navigation = useNavigation()
  const route = useRoute()

  const [userData, setUserData] = useState([])
  const [userEmail, setUserEmail] = useState()

  const toLogOut = () => {
    navigation.navigate('Login');
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{width:'100%'}}><TopNavigation/></View>
      <View style={styles.content}><Text>dashboard contents</Text></View>
      <View></View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#f5f5f5'
  },
  content:{
    marginTop:20,
    flex:1
  }
});