import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, Text, TextInput, Button, Avatar } from 'react-native-paper'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function Login() {
    const navigation = useNavigation()    

    const [uid, setUID] = useState()
    const [token, setToken] = useState()
    
    const toLogIn = () => {
        navigation.navigate('Login')
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
                    <TextInput style={{marginBottom:5, backgroundColor:'white'}} label="UID" activeUnderlineColor='#987554' onChangeText={setUID}></TextInput>
                    <TextInput style={{marginTop:5, backgroundColor:'white'}} label="Token" activeUnderlineColor='#987554' onChangeText={setToken}/>
                    <Text style={{color:'white', margin:5, marginVertical:15}}>UID and Token sent! Please check your Email.</Text>
                    <TouchableOpacity style={{alignItems:'center', justifyContent:'center', backgroundColor:'#fff4ac', padding:10, borderRadius:10}} onPress={toLogIn}>
                        <Text style={{fontWeight:'bold'}}>Activate</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-end', marginTop: 10, marginHorizontal:10}}>
                        <TouchableOpacity style={{justifyContent:'flex-end'}}>
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