import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TopNavigation from '../NavigationBars/TopNavigation';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'

export default function Dashboard() {
  const navigation = useNavigation()

  const [userEmail, setUserEmail] = useState();
  const [allUsers, setAllUsers] = useState([])

  const getUserAccountsList = async() => {
    const result = await axios.get('http://192.168.1.13:8000/api/v2/auth/getAllUsers/',
  {headers:{
    'Content-Type':'application/JSON',
    'Referrer-Policy':'same-origin',
    'Cross-Origin-Opener-Policy':'same-origin'
  }}).then(response=>{
    if (response.data.length > 0) {
      const user = response.data[0];
      setUserEmail(user.email);
    }
    setAllUsers(response.data)
  }).catch(error=>{
    console.log(error)
  })
  }

  useEffect(()=>{
    getUserAccountsList
     const intervalId = setInterval(getUserAccountsList, 3000);

     return () => clearInterval(intervalId);
  }, [])

  const toLogOut = () => {
    navigation.navigate('Login');
  }

  const extractDate = (dateTimeString) => {
    if (!dateTimeString) {
      return "None"; 
    }
    const dateTimeParts = dateTimeString.split('T');
    return dateTimeParts[0];
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{width:'100%'}}>
        <TopNavigation userEmail={userEmail} onPress={toLogOut}/>
      </View>
      <View style={styles.content}>
        <View>
          <Text>User logins:</Text>
        </View>
        <View>
        {allUsers.map(obj => (
                    <View style={{marginVertical:10, backgroundColor:'#987544', padding:10, borderRadius:10}} key={obj.email}>
                        <Text style={{fontSize:20}}>Email: {obj.email}</Text>
                        <Text style={{fontSize:20}}>Last Login: {extractDate(obj.last_login)}</Text>
                    </View>
                ))}
        </View>
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
    backgroundColor:'#f5f5f5',
  },
  content:{
    margin:20,
    flex:1,
  }
});