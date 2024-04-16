import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Card, Text, TextInput} from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker'
import axios from 'axios'
export default function SignUp() {
    const navigation = useNavigation()
    const [userData, setUserData] = useState({
        "email": "",
        "password": "",
        "confirm_password": "",
        "first_name": "",
        "last_name": "",
        "middle_initial": "",
        "birthday": "2003-07-26",
        "gender": ""
    })
    const [birthday, setBirthday] = useState(new Date());//no remove
    
    const handleDataChange = (key, value) =>{
        setUserData(prevState => ({
            ...prevState,
            [key]:value
        }))
    }

   

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

    const [rePassVisible, setRePassVisible] = useState(true)
    const [reEyeIcon, setReEyeIcon] = useState('eye-off')
    const showRePass = () => {
        if (rePassVisible == true) {
            setRePassVisible(false)
            setReEyeIcon('eye')
        } else {
            setRePassVisible(true)
            setReEyeIcon('eye-off')
        }
    }

    const [showDatePicker, setShowDatePicker] = useState(false);
    const onChange = (birthday) => {
        setShowDatePicker(false);
        const year = birthday.getFullYear();
        const month = String(birthday.getMonth() + 1).padStart(2, '0');
        const day = String(birthday.getDate()).padStart(2, '0');
        const birthdate = `${year}-${month}-${day}`;
        // handleDataChange('birthday', birthdate)
      };
    
    const backToLogin = () => {
        navigation.navigate('Login');
    }


    const register = async() => {
        const result = await axios.post('http://10.0.254.16:8000/api/v2/auth/users/', userData, 
        {headers:{
        'Content-Type':'application/JSON',
        'Referrer-Policy':'same-origin',
        'Cross-Origin-Opener-Policy':'same-origin'
        }}).then(response => {
            navigation.navigate('Activation', {email: userData.email})
        })
        .catch(error => {
            alert('Sign-In Unsuccessful ', error)
        });
    }


    return (
        <SafeAreaView style={styles.Content}>
            <Avatar.Image size={150} source={require('../assets/beesiness.png')} style={{ backgroundColor:'rgba(0,0,0,0)'}}/>
            <View style={styles.view}>
                <Card style={{backgroundColor:'#987544'}}>
                <Card.Content>
                    <View style={{flexDirection:'row', alignItems: 'center', margin:5}}>
                        <TouchableOpacity style={{flex:1, flexDirection:'row', justifyContent:'space-between'}} onPress={backToLogin}>
                            <Icon color={'white'} name='arrow-left' size={20}/>
                        </TouchableOpacity>
                        <View style={{flex:3, alignItems:'center'}}>
                            <Text style={{color:'white', fontSize:20}}>Sign-Up</Text>
                        </View>
                        <View style={{flex:1, backgroundColor:'blue'}}></View>
                    </View>
                    <View>
                        <View style={styles.inputBoxes}>
                            <TextInput selectionColor="black" 
                                       underlineColor="transparent" 
                                       activeUnderlineColor="#987554" 
                                       style={styles.textInputs} 
                                       label="E-mail" 
                                       onChangeText={(e)=>handleDataChange('email', e)}/>
                        </View>
                        <View style={styles.inputBoxes}>
                            <TextInput selectionColor="black" 
                                       underlineColor="transparent" 
                                       activeUnderlineColor="#987554" 
                                       style={styles.textInputs} 
                                       label="Password"
                                       secureTextEntry={pVisibility}  
                                       right={<TextInput.Icon icon={eyeIcon} 
                                       onPress={showPass}/>}
                                       onChangeText={(e)=>handleDataChange('password', e)}/>
                        </View>
                        <View style={styles.inputBoxes}>
                            <TextInput selectionColor="black" 
                                       underlineColor="transparent" 
                                       activeUnderlineColor="#987554" 
                                       style={styles.textInputs} 
                                       label="Re-enter Password" 
                                       secureTextEntry={rePassVisible}  
                                       right={<TextInput.Icon 
                                       icon={reEyeIcon} 
                                       onPress={showRePass}/>}
                                       onChangeText={(e)=>handleDataChange('confirm_password', e)}/>
                        </View>
                        <View style={styles.inputBoxes}>
                            <TextInput selectionColor="black" 
                                       underlineColor="transparent" 
                                       activeUnderlineColor="#987554" 
                                       style={styles.textInputs} 
                                       label="Last Name" 
                                       onChangeText={(e)=>handleDataChange('last_name', e)}/>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <View style={{flex: 3, marginRight:2.5}}>
                                <TextInput selectionColor="black" 
                                           underlineColor="transparent" 
                                           activeUnderlineColor="#987554" 
                                           style={{backgroundColor:'white', borderTopLeftRadius:10, borderTopRightRadius:10, borderRadius:10, height:50}} 
                                           label="First Name" 
                                           onChangeText={(e)=>handleDataChange('first_name', e)}/>
                            </View>
                            <View style={{flex: 1, marginHorizontal:2.5}}>
                                <TextInput selectionColor="black" 
                                           underlineColor="transparent" 
                                           activeUnderlineColor="#987554" 
                                           style={{backgroundColor:'white', borderTopLeftRadius:10, borderTopRightRadius:10, borderRadius:10, height:50}} 
                                           label="M.I." 
                                           onChangeText={(e)=>handleDataChange('middle_initial', e)}/>
                            </View>
                            <View style={{flex: 1, marginLeft:2.5}}>
                            <TextInput selectionColor="black" 
                                       underlineColor="transparent" 
                                       activeUnderlineColor="#987554" 
                                       style={{backgroundColor:'white', borderTopLeftRadius:10, borderTopRightRadius:10, borderRadius:10, height:50}} 
                                       label="Sex" 
                                       onChangeText={(e)=>handleDataChange('gender', e)}/>
                            </View>
                        </View>
                        <View style={styles.inputBoxes}>
                        <TouchableOpacity style={{backgroundColor: 'white', borderRadius:10, height:50, justifyContent:'center'}} onPress={() => setShowDatePicker(true)}>
                        <Text style={{marginLeft:15, color:'gray'}}>
                            Birth Date:
                        </Text>
                        <Text style={{marginLeft:15, fontSize:16}}>
                            {birthday.toDateString()}
                        </Text>
                        {showDatePicker && (
                            <DateTimePicker
                            value={birthday} 
                            mode="date"
                            display="calendar"
                            onChangeText={(e)=>onChange(e)}
                            />
                        )}
                        </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: "row", justifyContent:'center', alignItems:'center', marginTop: 20, marginHorizontal:10}}>
                            <TouchableOpacity style={{flexDirection:'row', justifyContent:'center', width:100, backgroundColor:'#fff4ac', padding:10, borderRadius:10}} onPress={register}>
                                <Text style={{fontWeight:'bold'}}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Card.Content>
                </Card>
            </View>    
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff4ac'
        
    },
    view: {
        marginVertical: 30,
        width: '80%',
    },
    textInputs: {
        backgroundColor:'white',
        width: '100%',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderRadius:10,
        height: 50
    },
    inputBoxes: {
        marginTop: 10,
    },
    modalInputs: {
        marginHorizontal: 20,
        marginTop: 5,
        backgroundColor: 'white',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        borderRadius:10
    }
})