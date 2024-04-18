import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, Text, TextInput, Button, Avatar } from 'react-native-paper'
import { StyleSheet, TouchableOpacity, View, Alert } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios'
export default function Login() {
    const route = useRoute()
    const {email} = route.params;
    const navigation = useNavigation()    
    const [activationCreds, setActivationCreds] = useState({
        "uid":"",
        "token":""
    })
    
    const Activation = (key, value) => {
        setActivationCreds(prevState=>({
            ...prevState,
            [key]: value
        }))
    }

    const activate = async () => {
        const result = await axios.post('http://192.168.56.1:8000/api/v2/auth/users/activation/', activationCreds,
        {headers:{
        'Content-Type':'application/JSON',
        'Referrer-Policy':'same-origin',
        'Cross-Origin-Opener-Policy':'same-origin'
        }}).then(response => {
            navigation.navigate('Login')
        })
        .catch(error => {
            alert('Activation Unsuccessful')
        });
    }
        

    const resendActivation = async() => {
        const result = await axios.post('http://10.0.254.16:8000/api/v2/auth/users/resend_activation/', {"email":email},
        {headers:{
            'Content-Type':'application/JSON',
            'Referrer-Policy':'same-origin',
            'Cross-Origin-Opener-Policy':'same-origin'
        }})
        if (result.status == 201) {
          alert('activation re-sent to '+ {email})
        } 
    }

  return (
    <SafeAreaView style={styles.Content}>
        <View style={{alignItems:'center'}}>
            <Avatar.Image size={100} source={require('../assets/lock.png')} style={{backgroundColor:'#987544'}}/>
        </View>
        <View style={{marginVertical:20}}>
            <Text style={{fontSize: 25}}>Activate Account</Text>
        </View>
        <View style={styles.view}>
            <Card style={{backgroundColor:'#987544'}}>
                <Card.Content>
                    <TextInput style={{marginBottom:5, backgroundColor:'white'}} 
                               label="UID" 
                               activeUnderlineColor='#987554' 
                               onChangeText={(e) =>Activation('uid', e)}>
                               </TextInput>
                    <TextInput style={{marginTop:5, backgroundColor:'white'}} 
                               label="Token" 
                               activeUnderlineColor='#987554' 
                               onChangeText={(e)=>Activation('token', e)}/>
                    <Text style={{color:'white', margin:5, marginVertical:15}}>UID and Token sent! Please check your Email.</Text>
                    <TouchableOpacity style={{alignItems:'center', justifyContent:'center', backgroundColor:'#fff4ac', padding:10, borderRadius:10}} onPress={()=>activate}>
                        <Text style={{fontWeight:'bold'}}>Activate</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-end', marginTop: 10, marginHorizontal:10}}>
                        <TouchableOpacity style={{justifyContent:'flex-end'}} onPress={resendActivation}>
                            <Text style={{color:'white', fontWeight:'bold'}}>Re-send Activation Code</Text>
                        </TouchableOpacity>
                    </View>
                </Card.Content>
            </Card>
        </View>
    </SafeAreaView> 
  )
}

const styles = StyleSheet.create({
    Content:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#fff4ac'
    },
    view:{
        width:'80%'
    },
})