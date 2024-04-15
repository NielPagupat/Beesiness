import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Card, Text, TextInput, Button, Avatar } from 'react-native-paper'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function Login() {
    const navigation = useNavigation()

    const [pVisibility, setPVisibility] = useState(true)
    const [eyeIcon, setIcon] = useState('eye-off')
    const showPass = () => {
        if (pVisibility == true) {
            setPVisibility(false)
            setIcon('eye')
        } else {
            setPVisibility(true)
            setIcon('eye-off')
        }
    }

    const toSignUp = () => {
        navigation.navigate('SignUp')
    }

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    
    const logIn = () => {
        navigation.navigate('Dashboard')
    }

  return (
    <SafeAreaView style={styles.Content}>
        <View style={{alignItems:'center'}}>
            <Avatar.Image size={250} source={require('../assets/beesiness.png')} style={{backgroundColor:'rgba(0,0,0,0)'}}/>
        </View>
        <View style={{marginVertical:20}}>
            <Text style={{fontSize: 30}}>Beesiness</Text>
        </View>
        <View style={styles.view}>
            <Card style={{backgroundColor:'#987544'}}>
                <Card.Content>
                    <TextInput style={{backgroundColor:'white'}} label="E-mail" activeUnderlineColor='#987554' keyboardType='email-address' onChangeText={setEmail}></TextInput>
                    <TextInput style={{marginTop:10, backgroundColor:'white'}} label="Password" activeUnderlineColor='#987554' secureTextEntry={pVisibility}  onChangeText={setPassword} right={<TextInput.Icon icon={eyeIcon} onPress={showPass}/>}/>
                    <Button textColor='white' style={{alignSelf:'flex-end'}}>Forgot Password?</Button>
                    <TouchableOpacity style={{alignItems:'center', justifyContent:'center', backgroundColor:'#fff4ac', padding:10, borderRadius:10}} onPress={logIn}>
                        <Text style={{fontWeight:'bold'}}>Log-in</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop: 10}}>
                        <Text style={{fontWeight:'bold'}}>Don't have an account?</Text>
                        <TouchableOpacity>
                            <Text style={{color:'white', margin: 10, fontWeight:'bold'}} onPress={toSignUp}>Sign-up</Text>
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