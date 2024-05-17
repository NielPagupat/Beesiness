import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ImageBackground, StatusBar } from 'react-native';
import { Avatar, IconButton } from 'react-native-paper'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import TopNavigation from '../NavigationBars/TopNavigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Dashboard() {
  const navigation = useNavigation()
  const route = useRoute();
  const [showNotification, setShowNotification] = useState(false);

  const [userEmail, setUserEmail] = useState(route.params?.userEmail || '');
  // const [allUsers, setAllUsers] = useState([])

  // const getUserAccountsList = async() => {
  //   const result = await axios.get('http://192.168.1.11:8000/api/v2/auth/getAllUsers/',
  // {headers:{
  //   'Content-Type':'application/JSON',
  //   'Referrer-Policy':'same-origin',
  //   'Cross-Origin-Opener-Policy':'same-origin'
  // }}).then(response=>{
  //   if (response.data.length > 0) {
  //     const user = response.data[0];
  //     setUserEmail(user.email);
  //   }
  //   setAllUsers(response.data)
  // }).catch(error=>{
  //   console.log(error)
  // })
  // }

  // useEffect(()=>{
  //   getUserAccountsList
  //    const intervalId = setInterval(getUserAccountsList, 3000);

  //    return () => clearInterval(intervalId);
  // }, [])

  const toLogOut = () => {
    navigation.navigate('Login');
  }

  const toManageProject = () => {
    navigation.navigate('ManageProject', { userEmail: userEmail});
  }

  const extractDate = (dateTimeString) => {
    if (!dateTimeString) {
      return "None"; 
    }
    const dateTimeParts = dateTimeString.split('T');
    return dateTimeParts[0];
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/wallpaper.png')} style={{flex: 1, resizeMode: "cover", justifyContent: "center", paddingTop: StatusBar.currentHeight,}}>
        <View style={{width:'100%'}}>
          <TopNavigation userEmail={userEmail} val={'Beesiness'} onPress={toLogOut}/>
        </View>
        <View style={styles.content}>
          <View style={{alignItems:'flex-end', marginHorizontal:20}}>
            <TouchableOpacity onPress={() => setShowNotification(!showNotification)} style={{backgroundColor:'#C19A6B', borderRadius:10}}>
              <IconButton icon="bell-outline" size={30} />
            </TouchableOpacity>
            {showNotification && (
              <View style={styles.notificationContainer}>
                <Text style={{fontSize:16}}>Notification content goes here</Text>
              </View>
            )}
          </View>
          <View style={{flexDirection:'row', alignItems:'center', marginHorizontal:20, margin:10}}>
            <TouchableOpacity onPress={toManageProject} style={{flexDirection:'row', alignItems:'center'}}>
            <View style={{backgroundColor:'#C19A6B', borderRadius:10}}>
              <IconButton icon="folder-outline" size={40} />
            </View>
            <View style={{marginHorizontal:10}}>
              <Text style={{fontSize:16}}>Access Projects</Text>
            </View>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content:{
    margin:10,
    flex:1,
  },
  notificationContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderBottomRightRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: 'center',
  },
});