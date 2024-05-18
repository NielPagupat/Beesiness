import React, { useState } from 'react'
import { View, StyleSheet, Text, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import { Avatar, Button, Icon, IconButton, Modal, TextInput } from 'react-native-paper'; 
import TopNavigation from '../NavigationBars/TopNavigation';
import { useNavigation } from '@react-navigation/native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';


export default function ProjectAsMember() {
    const navigation = useNavigation()

    const [userEmail, setUserEmail] = useState();
    const [allUsers, setAllUsers] = useState([]);
    const [newMemberEmail, setNewMemberEmail] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedUserEmail, setSelectedUserEmail] = useState('');
    const [isNewModalVisible, setIsNewModalVisible] = useState(false);
    const [selectedUserIndex, setSelectedUserIndex] = useState(null);
    const [newTask, setNewTask] = useState('');


    const toLogOut = () => {
        navigation.navigate('Login');
      }

      const toManageProject = () => {
        navigation.navigate('ManageProject');
      }

      const handleAddMember = () => {
        if (newMemberEmail.trim()) {
            setAllUsers([...allUsers, { email: newMemberEmail}]);
            setNewMemberEmail('');
        }
    };
    
    const handleRemoveMember = (index) => {
        const updatedUsers = [...allUsers];
        updatedUsers.splice(index, 1);
        setAllUsers(updatedUsers);
      }
    
    const handleOpenEditModal = (index) => {
        setSelectedUserIndex(index);
        setIsModalVisible(true);
      }
    
    const handleCloseModal = () => {
        setSelectedUserIndex(null);
        setIsModalVisible(false);
      }

      const handleAddTask = () => {
        if (newTask.trim() && selectedUserIndex !== null) {
            setAllUsers(prevUsers => {
                const updatedUsers = [...prevUsers];
                const user = updatedUsers[selectedUserIndex];
                user.tasks = user.tasks ? [...user.tasks, newTask] : [newTask];
                return updatedUsers;
            });
            setNewTask('');
        }
    };
    
    const renderTaskItem = ({ item }) => (
        <View>
            <Text style={{fontSize:16}}> ○ {item}</Text>
        </View>
    );

    const handleOpenNewModal = (email) => {
        setSelectedUserEmail(email);
        setIsNewModalVisible(true);
    }
    
    const handleCloseNewModal = () => {
        setSelectedUserEmail('');
        setIsNewModalVisible(false);
    }
  return (
    <View style={styles.container}>
        <ImageBackground source={require('../assets/wallpaper.png')} style={styles.backgroundImage}>
        <View style={{width:'100%'}}>
            <TopNavigation userEmail={userEmail} val={'project_name'} onPress={toLogOut}/>
        </View>
        <View style={styles.content}>
            <View style={{backgroundColor:'#C19A6B', borderRadius:10, elevation:5, maxHeight:600, paddingBottom:0}}>
                <TouchableOpacity onPress={toManageProject} style={{flexDirection:'row', alignItems:'center'}}>
                    <IconButton icon="chevron-left" size={40} />
                    <Text style={{color:'#303030', fontSize:14}}>Manage Projects</Text>
                </TouchableOpacity>
                <View style={{marginHorizontal:20}}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <Text style={{fontWeight:'bold'}}>People Involved in this Project:</Text>
                        <Text style={{fontWeight:'bold'}}>Status</Text>
                    </View>
                    <ScrollView style={{maxHeight:320}}>
                    {allUsers.map((user, index) => (
                    <View key={index} style={{marginVertical:5}}>
                        <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <TouchableOpacity onPress={() => handleOpenNewModal(user.email)} style={{flex:10, backgroundColor:'#fff', flexDirection:'row', justifyContent:'space-between', borderRadius:5}}>
                            <Text style={{flex:1, alignSelf:'center', margin:10}} numberOfLines={1}>{user.email}</Text>
                        </TouchableOpacity>
                        <View style={{flex:.5}}></View>
                        <View style={{flex:1.65, justifyContent:'center', alignItems:'center'}}>
                            <View style={{flex:1, width:45, backgroundColor:'#fff', borderRadius:25}}></View>
                        </View>
                        </View>
                    </View>
                    ))}
                    </ScrollView>
                    <View style={{margin:20}}>
                        <View>
                            <Text style={{fontSize:18}}>To do</Text>
                        </View>
                        <View>

                        </View>
                    </View>
                </View>
                <View style={{margin:20, marginHorizontal:75}}>
                    <TouchableOpacity onPress={toManageProject} style={{backgroundColor:'#967542', padding:5, alignItems:'center', borderRadius:10}}>
                        <Text style={{color:'white'}}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        </ImageBackground>
        {selectedUserEmail && (
            <Modal
                visible={isNewModalVisible}
                onRequestClose={handleCloseNewModal}
                onDismiss={handleCloseNewModal}
            >
                <View>  
                    <View style={{backgroundColor:'#C19A6B', margin:10, padding: 20, borderRadius: 10, elevation: 10}}>
                        <Text style={{fontSize:18, fontWeight: 'bold'}}>{selectedUserEmail}'s Progress</Text>
                        <View style={{margin:20}}>
                            <Text style={{fontSize:18}}>To do</Text>
                        </View>
                        <View style={{margin:20}}>
                            <Text style={{fontSize:18}}>Comments</Text>
                            <Text style={{margin:10, fontSize:14}}>Project Leader: </Text>
                        </View>
                        <TouchableOpacity onPress={handleCloseNewModal} style={{backgroundColor:'#967542', padding:10, alignItems:'center', borderRadius:10}}>
                            <Text style={{color:'white'}}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )} 
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
  backgroundImage: {
    height:870, 
    resizeMode: "cover", 
    justifyContent: "center", 
    paddingTop: StatusBar.currentHeight,
    },
  
});
