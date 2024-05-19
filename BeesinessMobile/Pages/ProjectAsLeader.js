import React, { useState } from 'react'
import { View, StyleSheet, Text, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import { Avatar, Button, Icon, IconButton, Modal, TextInput } from 'react-native-paper'; 
import TopNavigation from '../NavigationBars/TopNavigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';


export default function ProjectAsLeader() {
    const navigation = useNavigation()
    const route = useRoute()

    const project = route.params?.project;

    const [allUsers, setAllUsers] = useState(project.members || []);
    const [userEmail, setUserEmail] = useState(route.params?.userEmail || '');
    const [newMemberEmail, setNewMemberEmail] = useState('');
    const [newTask, setNewTask] = useState('');


    const toLogOut = () => {
        navigation.navigate('Login');
      }

      const toManageProject = () => {
        navigation.navigate('ManageProject');
      }

    const [projectState, setProjectState] = useState({
        projectName: project.projectName || '',
        creator: project.creator || '',
        members: project.members || [],
    });

    const handleProjectUpdate = (key, value) => {
      setProjectState(prevState => ({
        ...prevState,
        [key]: value,
      }));
    };

    const [member, setMember] = useState('');
    const [selectedMemberIndex, setSelectedMemberIndex] = useState(null);
    const [task, setTask] = useState({
        comment: [],
        taskname: '',
        taskDescription: '',
        startdate: '',
        endDate: '',
        status: false,
    });

  const handleViewMember = (index) => {
    setSelectedMemberIndex(index);
  };

  const viewMemberProgress = (index) => {
    const memberData = projectState.members[index];
    navigation.navigate('ProgressAsLeader', { project, member: memberData, projectName: projectState.projectName, projectID: project.id, creator: projectState.creator, userEmail: userEmail })
  };

  return (
    <View style={styles.container}>
        <ImageBackground source={require('../assets/wallpaper.png')} style={styles.backgroundImage}>
        <View style={{width:'100%'}}>
            <TopNavigation userEmail={userEmail} val={project.projectName} onPress={toLogOut}/>
        </View>
        <View style={styles.content}>
            <View style={{backgroundColor:'#C19A6B', borderRadius:10, elevation:5, maxHeight:600, paddingBottom:0}}>
                <TouchableOpacity onPress={toManageProject} style={{flexDirection:'row', alignItems:'center'}}>
                    <IconButton icon="chevron-left" size={40} />
                    <Text style={{color:'#303030', fontSize:14}}>Manage Projects</Text>
                </TouchableOpacity>
                <View style={{marginHorizontal:20}}>
                    <View style={{marginVertical:5}}>
                        <Text style={{fontWeight:'bold', fontSize:16}}>People Involved in this Project:</Text>
                    </View>
                    <ScrollView style={{maxHeight:150}}>
                        {projectState.members.map((member, index) => (
                            <View key={index} style={{marginVertical:10}}>
                                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                                <TouchableOpacity onPress={() => viewMemberProgress(index)} style={{flex: 3, backgroundColor:'#fff', flexDirection:'row', borderTopLeftRadius:5, borderBottomLeftRadius:5}}>
                                    <Text style={{alignSelf:'center', margin:10, fontSize:16}}>{member.name}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleViewMember(index)} style={{flex: 1, backgroundColor:'#967542', justifyContent:'center', borderTopRightRadius:5, borderBottomRightRadius:5}}>
                                    <Text style={{alignSelf:'center', margin:10, fontSize:16, color:'white'}}>Tasks</Text>
                                </TouchableOpacity> 
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>
                <View style={{margin:20}}>
                    <Text style={{fontSize:16, fontWeight:'bold'}}>Task Details</Text>
                <ScrollView style={styles.tasksContainer}>
                {selectedMemberIndex !== null && projectState.members[selectedMemberIndex].tasks.length > 0 ? (
                    projectState.members[selectedMemberIndex].tasks.map((task, index) => (
                        <View key={index} style={{margin:5, backgroundColor:'#fff', padding:10, borderRadius:10 }}>
                        <Text style={{fontSize:16}}>Task {index + 1}: {task.taskname}</Text>
                        </View>
                    ))
                ) : (
                    <View style={{margin: 10}}>
                        <Text style={{fontSize:20, fontWeight:'bold'}}>No tasks yet</Text>
                    </View>
                )}
                 </ScrollView>
                <View style={{margin:20, marginHorizontal:75}}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{backgroundColor:'#967542', padding:10, alignItems:'center', borderRadius:10}}>
                        <Text style={{color:'white', fontSize:16}}>Okay</Text>
                    </TouchableOpacity>
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
  backgroundImage: {
    height:870, 
    resizeMode: "cover", 
    justifyContent: "center", 
    paddingTop: StatusBar.currentHeight,
    },
  
});
