import React, { useState } from 'react'
import { View, StyleSheet, Text, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import { Avatar, Icon, IconButton, TextInput } from 'react-native-paper'; 
import TopNavigation from '../NavigationBars/TopNavigation';
import { useNavigation } from '@react-navigation/native';


export default function ManageProject() {
    const navigation = useNavigation()

    const [userEmail, setUserEmail] = useState();
    const [allUsers, setAllUsers] = useState([
        { email: 'pagupat.niel@gmail.com', role: 'Leader' }
    ])
    const [newMemberEmail, setNewMemberEmail] = useState('');

    const toLogOut = () => {
        navigation.navigate('Login');
      }

      const toManageProject = () => {
        navigation.navigate('ManageProject');
      }

      const handleAddMember = () => {
        if (newMemberEmail.trim()) {
            setAllUsers([...allUsers, { email: newMemberEmail, role: 'Member' }]);
            setNewMemberEmail('');
        }
    };

  return (
    <View style={styles.container}>
        <ImageBackground source={require('../assets/wallpaper.png')} style={{flex: 1, resizeMode: "cover", justifyContent: "center", paddingTop: StatusBar.currentHeight,}}>
        <View style={{width:'100%'}}>
            <TopNavigation userEmail={userEmail} val={'project_name'} onPress={toLogOut}/>
        </View>
        <View style={styles.content}>
            <View style={{backgroundColor:'#C19A6B', borderRadius:10, paddingBottom:40, elevation:5}}>
                <TouchableOpacity onPress={toManageProject} style={{flexDirection:'row', alignItems:'center'}}>
                    <IconButton icon="chevron-left" size={40} />
                    <Text style={{color:'#303030', fontSize:14}}>Manage Projects</Text>
                </TouchableOpacity>
                <View style={{marginHorizontal:20}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontWeight:'bold'}}>People Involved in this Project:</Text>
                        <Text style={{fontWeight:'bold'}}>Status</Text>
                    </View>
                    <View>
                        {allUsers.map((user, index) => (
                            <View key={index} style={{marginVertical:5}}>
                                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                    <TouchableOpacity style={{flex:10, backgroundColor:'#fff', flexDirection:'row', justifyContent:'space-between', padding:10, borderRadius:5}}>
                                        <Text>{user.email}</Text>
                                        <Text>{user.role}</Text>
                                    </TouchableOpacity>
                                    <View style={{flex:.5}}></View>
                                    <View style={{flex:1.65, justifyContent:'center', alignItems:'center'}}>
                                    </View>
                                </View>
                            </View>
                        ))}
                        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:20}}>
                            <TextInput
                                style={{backgroundColor:'rgba(0,0,0,0)', width:220}}
                                outlineColor=''
                                underlineColor='black'
                                activeUnderlineColor='black'
                                label="Input a Member"
                                value={newMemberEmail}
                                onChangeText={setNewMemberEmail}
                            />
                            <TouchableOpacity onPress={handleAddMember} style={{backgroundColor:'#967542', padding:10, borderRadius:10, marginTop:20}}>
                                <Text>Send Invite</Text>
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
