import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, ImageBackground, StatusBar, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper'; 
import TopNavigation from '../NavigationBars/TopNavigation';
import { useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';

export default function ManageProject() {
    const navigation = useNavigation()
    const route = useRoute()

    const [userEmail, setUserEmail] = useState(route.params?.userEmail || '');
    const [myProjects, setMyProjects] = React.useState([]);
    const [myCollaborations, setMyCollaborations] = React.useState([]);

    const toLogOut = () => {
        navigation.navigate('Login');
      }

      const toDashboard = () => {
        navigation.navigate('Dashboard');
      }

    const getMyProjects = async () => {
        try {
          const response = await axios.get(`http://192.168.43.173:8000/api/v2/auth/projects/creator/${userEmail}`, {
            headers: {
              'Content-Type': 'application/JSON',
              'Referrer-Policy': 'same-origin',
              'Cross-Origin-Opener-Policy': 'same-origin',
            },
          });
          setMyProjects(response.data);
        } catch (error) {
          alert(error);
        }
      };

    const getMyCollaborations = async () => {
        try {
        const response = await axios.get(`http://192.168.43.173:8000/api/v2/auth/projects/member/${userEmail}`, {
            headers: {
            'Content-Type': 'application/JSON',
            'Referrer-Policy': 'same-origin',
            'Cross-Origin-Opener-Policy': 'same-origin',
            },
        });
        setMyCollaborations(response.data);
        } catch (error) {
        alert(error);
        }
    };    

    useEffect(() => {
    getMyProjects();
    getMyCollaborations();
  }, []);

  const goToEditProject = (project) => {
    navigation.navigate('ProjectAsLeader', { project, userEmail: userEmail } );
  };

  const goToProjectDetailAsMember = (project) => {
    navigation.navigate('ProjectAsMember', { project, userEmail: userEmail });
  };

  return (
    <View style={styles.container}>
        <ImageBackground source={require('../assets/wallpaper.png')} style={{flex: 1, resizeMode: "cover", justifyContent: "center", paddingTop: StatusBar.currentHeight,}}>
        <View style={{width:'100%'}}>
            <TopNavigation userEmail={userEmail} val={'Projects'} onPress={toLogOut}/>
        </View>
        <View style={styles.content}>
            <View style={{backgroundColor:'#C19A6B', borderRadius:10, paddingBottom:40, elevation:5}}>
                <TouchableOpacity onPress={toDashboard} style={{flexDirection:'row', alignItems:'center'}}>
                    <IconButton icon="chevron-left" size={40} />
                    <Text style={{color:'#303030', fontSize:14}}>Dashboard</Text>
                </TouchableOpacity>
                <View>
                    <View style={{margin:20, marginHorizontal:30}}>
                        <Text style={{color:'#303030', fontSize:20, fontWeight:'bold'}}>Your Projects: </Text>
                        <View style={{margin:5}}>
                        {myProjects.length > 0 ? (
                        myProjects.map((project) => (
                            <TouchableOpacity
                            key={project.id}
                            onPress={() => goToEditProject(project)}
                            style={{backgroundColor:'white', marginVertical:5, padding:10, borderRadius:10}}
                            >
                            <Text>{project.projectName}</Text>
                            </TouchableOpacity>
                        ))
                        ) : (
                        <Text style={{ color: 'white' }}>No projects available</Text>
                        )}
                        </View>
                        
                    </View>
                    <View style={{margin:10, marginHorizontal:30}}>
                        <Text style={{color:'#303030', fontSize:20, fontWeight:'bold'}}>Project Collaborations: </Text>
                        <View style={{margin:5}}>
                        {myCollaborations.length > 0 ? (
                        myCollaborations.map((collab) => (
                            <TouchableOpacity 
                            key={collab.id}
                            onPress={() => goToProjectDetailAsMember(collab)} 
                            style={{backgroundColor:'white', marginVertical:5, padding:10, borderRadius:10}}
                            >
                            <Text>{collab.projectName} ----- {collab.creator}</Text>
                            </TouchableOpacity>
                        ))
                        ) : (
                        <Text style={{ color: 'white' }}>No collaborations available</Text>
                        )}
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
