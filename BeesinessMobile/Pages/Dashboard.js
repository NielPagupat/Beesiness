import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopNavigation from '../NavigationBars/TopNavigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios'
export default function Dashboard() {
  const navigation = useNavigation()
  const route = useRoute()
  const [allUsers, setAllUsers] = useState([])
  const [userData, setUserData] = useState([])
  const [userEmail, setUserEmail] = useState()

  const getUserAccountsList = async() => {
    const result = await axios.get('http://10.0.254.16:8000/api/v2/auth/getAllUsers/',
  {headers:{
    'Content-Type':'application/JSON',
    'Referrer-Policy':'same-origin',
    'Cross-Origin-Opener-Policy':'same-origin'
  }}).then(response=>{
    console.log(response.data)
    setAllUsers(response.data)

  }).catch(error=>{
    console.log(error)
  })
  }

  useEffect(()=>{
    getUserAccountsList
     // Refresh data every 3 seconds
     const intervalId = setInterval(getUserAccountsList, 3000);

     // Clean up function to clear the interval
     return () => clearInterval(intervalId);
  }, [])
  const toLogOut = () => {
    navigation.navigate('Login');
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{width:'100%'}}><TopNavigation/></View>
      <View style={styles.content}><Text>All Users</Text></View>
      <View style={styles.content}>
      {allUsers.map(obj => (
                    <View key={obj.email} style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text>Email: {obj.email}</Text>
                        <Text>Last Login: {obj.last_login}</Text>
                    </View>
                ))}
      </View>
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