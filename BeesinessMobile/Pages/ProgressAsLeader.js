import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ImageBackground, StatusBar, TouchableOpacity, Alert } from 'react-native';
import { Avatar, Button, Icon, IconButton, Modal, TextInput } from 'react-native-paper'; 
import TopNavigation from '../NavigationBars/TopNavigation';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';


export default function ProgressAsLeader() {
    const [allComment, setAllComment] = useState([]);
    const navigation = useNavigation()
    const route = useRoute()

    const project = route.params?.project;

    const [userEmail, setUserEmail] = useState(route.params?.userEmail || '');
    const { member, projectName, projectID, creator } = route.params;

    const [comment, setComment] = useState({
      "leader": creator,
      "reciever": member.name,
      "project": projectID,
      "content": ''
    });
  
    const onChangeCommentContent = (key, value) =>{
      setComment(prevState => ({
        ...prevState,
        [key]: value
      }));
    };

  const getComment = async () => {
    try {
      const response = await axios.get(`http://192.168.1.11:8000/api/v2/auth/comments/project/${projectID}/receiver/${member.name}/`, {
        headers: {
          'Content-Type': 'application/JSON',
          'Referrer-Policy': 'same-origin',
          'Cross-Origin-Opener-Policy': 'same-origin',
        }
      });
      setAllComment(response.data);
    } catch (error) {
      alert(error);
    }
  };

  const saveComment = async () => {
    try {
      await axios.post('http://192.168.1.11:8000/api/v2/auth/api/projects/add-comment/', comment, {
        headers:{
          'Content-Type': 'application/JSON',
          'Referrer-Policy': 'same-origin',
          'Cross-Origin-Opener-Policy': 'same-origin',
        }
      });
      getComment()
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getComment();
  }, []);


    const toLogOut = () => {
        navigation.navigate('Login');
      }

    const toManageProject = () => {
      navigation.goBack();
    }

  return (
    <View style={styles.container}>
        <ImageBackground source={require('../assets/wallpaper.png')} style={styles.backgroundImage}>
            <View style={{width:'100%'}}>
                <TopNavigation userEmail={userEmail} val={'Beesiness'} onPress={toLogOut}/>
            </View>
            <View style={styles.content}>
                <View style={{backgroundColor:'#C19A6B', borderRadius:10, elevation:5, maxHeight:600, paddingBottom:30}}>
                    <TouchableOpacity onPress={toManageProject} style={{flexDirection:'row', alignItems:'center'}}>
                        <IconButton icon="chevron-left" size={40} />
                        <Text style={{color:'#303030', fontSize:14}}>{projectName}</Text>
                    </TouchableOpacity>
                    <View style={{marginHorizontal:20}}>
                      <Text style={{fontSize:18, marginHorizontal:10}}>Tasks:</Text>
                      <ScrollView style={{maxHeight:200}}>
                          {member.tasks.length > 0 ? (
                              member.tasks.map((task, index) => (
                                  <View key={index}>
                                      <View style={{backgroundColor:'#fff', padding:10, borderRadius:10, marginVertical:5}}>
                                          <Text style={{fontSize:16, margin:2}}>Task {index + 1}: {task.taskname}</Text>
                                          <Text style={{fontSize:16, margin:2}}>Description: {task.taskDescription}</Text>
                                          <Text style={{fontSize:16, margin:2}}>Start Date: {task.startdate}</Text>
                                          <Text style={{fontSize:16, margin:2}}>End Date: {task.endDate}</Text>
                                          <Text style={{fontSize:16, margin:2, backgroundColor: task.status ? 'green' : 'red', padding:10, alignItems:'center', borderRadius:5}}>
                                              Status: {task.status ? 'Completed' : 'In Progress'}
                                          </Text>
                                      </View>
                                  </View>
                              ))
                          ) : (
                              <Text style={styles.noTasks}>No tasks assigned</Text>
                          )}
                      </ScrollView>
                    </View>
                    <View style={{margin:20}}>
                      <Text style={{fontSize:18, marginHorizontal:10}}>Comments:</Text>
                      <ScrollView style={{maxHeight:170}}>
                      {allComment.length > 0 ? (
                        allComment.map((comment, index) => (
                          <View key={index} style={{ backgroundColor:'white', padding:10, margin:2.5, borderRadius:5 }}>
                            <Text>{comment.leader} commented: {comment.content}</Text>
                          </View>
                        ))
                      ) : (
                        <Text style={{ color: 'white'}}>No comments yet</Text> 
                      )}
                      </ScrollView>
                      <View style={{flexDirection:'row', alignItems:'center'}}>
                        <TextInput
                          style={{flex:1, backgroundColor:'#fff', margin:10, borderBottomLeftRadius:5, borderBottomRightRadius:5}}
                          label="Add Comment"
                          activeUnderlineColor='#967542'
                          value={comment.content}
                          onChangeText={(e) => onChangeCommentContent("content", e)}
                        />
                        <TouchableOpacity style={{backgroundColor:'#967542', padding:10, borderRadius:10}} onPress={saveComment}>
                          <Text style={{color:'white'}}>Add Comment</Text>
                        </TouchableOpacity>
                      </View>
                      {/* Display comments */}


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
