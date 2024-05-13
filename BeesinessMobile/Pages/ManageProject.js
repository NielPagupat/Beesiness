import React, { useState } from 'react'
import { View, StyleSheet, Text, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import { Avatar, Icon, IconButton } from 'react-native-paper'; 
import TopNavigation from '../NavigationBars/TopNavigation';
import { useNavigation } from '@react-navigation/native';


export default function ManageProject() {
    const navigation = useNavigation()

    const [userEmail, setUserEmail] = useState();
    const [allUsers, setAllUsers] = useState([])

    const toLogOut = () => {
        navigation.navigate('Login');
      }

      const toDashboard = () => {
        navigation.navigate('Dashboard');
      }

  return (
    <View style={styles.container}>
        <ImageBackground source={require('../assets/wallpaper.png')} style={{flex: 1, resizeMode: "cover", justifyContent: "center", paddingTop: StatusBar.currentHeight,}}>
        <View style={{width:'100%'}}>
            <TopNavigation userEmail={userEmail} val={'Manage Projects'} onPress={toLogOut}/>
        </View>
        <View style={styles.content}>
            <View style={{backgroundColor:'#C19A6B', borderRadius:10, paddingBottom:40, elevation:5}}>
                <TouchableOpacity onPress={toDashboard} style={{flexDirection:'row', alignItems:'center'}}>
                    <IconButton icon="chevron-left" size={40} />
                    <Text style={{color:'#303030', fontSize:14}}>To Dashboard</Text>
                </TouchableOpacity>
                <View>
                    <View style={{margin:20, marginHorizontal:30}}>
                        <Text style={{color:'#303030', fontSize:20, fontWeight:'bold'}}>Your Projects: </Text>
                        <View style={{margin:5}}>
                            <TouchableOpacity style={{backgroundColor:'#fff', borderRadius:5, padding:10, marginVertical:5}}>
                                <Text>project_name</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor:'#fff', borderRadius:5, padding:10, marginVertical:5}}>
                                <Text>project_name</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor:'#fff', borderRadius:5, padding:10, marginVertical:5}}>
                                <Text>project_name</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    <View style={{margin:10, marginHorizontal:30}}>
                        <Text style={{color:'#303030', fontSize:20, fontWeight:'bold'}}>Project Collaborations: </Text>
                        <View style={{margin:5}}>
                            <TouchableOpacity style={{backgroundColor:'#fff', borderRadius:5, padding:10, marginVertical:5, flexDirection:'row', justifyContent:'space-between'}}>
                                <Text>project_name</Text>
                                <Text>w/ Niel, 5+ users</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{backgroundColor:'#fff', borderRadius:5, padding:10, marginVertical:5, flexDirection:'row', justifyContent:'space-between'}}>
                                <Text>project_name</Text>
                                <Text>w/ Lance, +2 users</Text>
                            </TouchableOpacity>
                        </View>   
                    </View>
                </View>
            </View>
        </View>
        </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content:{
    margin:20,
    marginVertical:50,
    flex:1,
  },
});
