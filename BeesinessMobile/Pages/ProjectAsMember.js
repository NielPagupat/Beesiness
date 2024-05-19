import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ImageBackground, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { Avatar, Button, Checkbox, Icon, IconButton, Modal, TextInput } from 'react-native-paper'; 
import TopNavigation from '../NavigationBars/TopNavigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';



export default function ProjectAsMember() {
    const navigation = useNavigation()
    const route = useRoute()

    const { project } = route.params || {};
    const [userEmail, setUserEmail] = useState(route.params?.userEmail || '');

    const member = project?.members.find(member => member.name === userEmail);
    const [tasks, setTasks] = useState(member?.tasks || []);

    const getComment = async () => {
        try {
          const response = await axios.get(`http://192.168.1.11:8000/api/v2/auth/comments/project/${project.id}/receiver/${member.name}/`, {
            headers:{
              'Content-Type': 'application/JSON',
              'Referrer-Policy': 'same-origin',
              'Cross-Origin-Opener-Policy': 'same-origin',
            }
          });
          setAllComment(response.data); // Assuming response.data is an array of comments
        } catch (error) {
          alert(error);
        }
      };
      const [allComments, setAllComment] = useState([]);

      useEffect(()=>{
        getComment()
      }, [])

    const toLogOut = () => {
        navigation.navigate('Login');
    }

      const toManageProject = () => {
        navigation.navigate('ManageProject');
    }

    const handleCheckboxChange = (index) => {
        setTasks((prevTasks) => {
          const newTasks = [...prevTasks];
          newTasks[index].status = !newTasks[index].status;
          return newTasks;
        });
      };

    const updateTask = async () => {
    try {
      await axios.put(`http://192.168.1.11:8000/api/v2/auth/editProject/${project.id}/`, project, {
        headers: {
          'Content-Type': 'application/JSON',
          'Referrer-Policy': 'same-origin',
          'Cross-Origin-Opener-Policy': 'same-origin',
        },
      });
      Alert.alert("Success", "Tasks updated successfully");
    } catch (error) {
      alert(error);
    }
  };

  if (!project) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Project data is missing</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
        <ImageBackground source={require('../assets/wallpaper.png')} style={styles.backgroundImage}>
        <View style={{width:'100%'}}>
            <TopNavigation userEmail={userEmail} val={'project_name'} onPress={toLogOut}/>
        </View>
        <View style={styles.content}>
                <View style={{backgroundColor:'#C19A6B', borderRadius:10, elevation:5, maxHeight:600}}>
                    <TouchableOpacity onPress={toManageProject} style={{flexDirection:'row', alignItems:'center'}}>
                        <IconButton icon="chevron-left" size={40} />
                        <Text style={{color:'#303030', fontSize:14}}>Manage Projects</Text>
                    </TouchableOpacity>
                    <View style={{marginHorizontal:20}}>
                    <Text style={{fontSize:20, fontWeight:'bold'}}>{project.projectName}</Text>
                    <Text style={{fontSize:16}}>Created by: {project.creator}</Text>
                    <View style={{marginVertical:10}}>
                        <Text style={styles.sectionTitle}>To do:</Text>
                        <ScrollView style={{maxHeight:200}}>
                            {tasks.length > 0 ? (
                            tasks.map((task, index) => (
                                <View key={index} style={styles.task}>
                                <Text style={styles.taskText}>Task Name: {task.taskName}</Text>
                                <Text style={styles.taskText}>Description: {task.taskDescription}</Text>
                                <Text style={styles.taskText}>Start Date: {task.startDate}</Text>
                                <Text style={styles.taskText}>End Date: {task.endDate}</Text>
                                <TouchableOpacity onPress={() => handleCheckboxChange(index)} style={[styles.statusContainer, { backgroundColor: task.status ? 'green' : 'red' }]}>
                                    <Checkbox
                                    value={task.status}
                                    status={task.status ? 'checked' : 'unchecked'}
                                    color='white'
                                    />
                                    <Text style={{color:'white', marginLeft:10}}>{task.status ? 'Completed' : 'Pending'}</Text>
                                </TouchableOpacity>
                                </View>
                            ))
                            ) : (
                            <Text style={styles.noContentText}>No tasks available</Text>
                            )}
                        </ScrollView>
                    </View>
                    <View style={{marginVertical:10}}>
                        <Text style={styles.sectionTitle}>Comments:</Text>
                        {allComments.length > 0 ? (
                        allComments.map((comment, index) => (
                        <View key={index} style={styles.comment}>
                            <Text style={styles.commentText}>{comment.leader}: {comment.content}</Text>
                        </View>
                        ))
                    ) : (
                        <Text>No Comments Available</Text>
                    )}
                    </View>
                    <View style={{margin:20}}>
                        <TouchableOpacity style={{backgroundColor:'#967542', padding:10, alignItems:'center', borderRadius:10}} onPress={updateTask}>
                            <Text style={{color:'white'}}>Update Progress</Text>
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
    content: {
      margin: 20,
      marginVertical: 50,
      flex: 1,
    },
    backgroundImage: {
      height: 870,
      resizeMode: "cover",
      justifyContent: "center",
      paddingTop: StatusBar.currentHeight,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    subtitle: {
      fontSize: 18,
      marginBottom: 10,
    },
    section: {
      marginBottom: 20,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    task: {
      backgroundColor: '#fff',
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
    },
    taskText: {
      fontSize: 16,
      marginBottom: 5,
    },
    statusContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 5,
      borderRadius: 5,
    },
    statusText: {
      marginLeft: 10,
    },
    noContentText: {
      fontSize: 16,
      fontStyle: 'italic',
    },
    comment: {
      backgroundColor: '#f2f2f2',
      padding: 10,
      marginBottom: 10,
      borderRadius: 5,
    },
    commentText: {
      fontSize: 16,
    },
    errorText: {
      color: 'red',
      fontSize: 20,
      textAlign: 'center',
      marginTop: 20,
    },
  });
