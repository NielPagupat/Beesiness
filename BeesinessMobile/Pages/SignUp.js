import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Avatar, Card, Text, TextInput} from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from '@react-native-community/datetimepicker'

export default function SignUp() {
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
    const [date, setDate] = useState(new Date());

    const onChange = (event, date) => {
        setShowDatePicker(false);
        setDate(date);
      };
    
    const backToLogin = () => {
        navigation.navigate('Login');
    }


    const [email, setEmail] = useState();
    const [passwd, setPasswd] = useState();
    const [passwdConfirm, setPasswdConfirm] = useState();
    const [fname, setFname] = useState();
    const [lname, setLname] = useState();
    const [mi, setMI] = useState();
    const [gender, setGender] = useState();
    const [birthday, setBirthday] = useState();

    const register = () => {
        navigation.navigate('Activation');
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
                            <TextInput selectionColor="black" underlineColor="transparent" activeUnderlineColor="#987554" style={styles.textInputs} label="E-mail" onChangeText={setEmail}/>
                        </View>
                        <View style={styles.inputBoxes}>
                            <TextInput selectionColor="black" underlineColor="transparent" activeUnderlineColor="#987554" style={styles.textInputs} label="Password" onChangeText={setPasswd} secureTextEntry={pVisibility}  right={<TextInput.Icon icon={eyeIcon} onPress={showPass}/>}/>
                        </View>
                        <View style={styles.inputBoxes}>
                            <TextInput selectionColor="black" underlineColor="transparent" activeUnderlineColor="#987554" style={styles.textInputs} label="Re-enter Password" onChangeText={setPasswdConfirm} secureTextEntry={rePassVisible}  right={<TextInput.Icon icon={reEyeIcon} onPress={showRePass}/>}/>
                        </View>
                        <View style={styles.inputBoxes}>
                            <TextInput selectionColor="black" underlineColor="transparent" activeUnderlineColor="#987554" style={styles.textInputs} label="Last Name" onChangeText={setLname}/>
                        </View>
                        <View style={{flexDirection: 'row', marginTop: 10}}>
                            <View style={{flex: 3, marginRight:2.5}}>
                                <TextInput selectionColor="black" underlineColor="transparent" activeUnderlineColor="#987554" style={{backgroundColor:'white', borderTopLeftRadius:10, borderTopRightRadius:10, borderRadius:10, height:50}} label="First Name" onChangeText={setFname}/>
                            </View>
                            <View style={{flex: 1, marginHorizontal:2.5}}>
                                <TextInput selectionColor="black" underlineColor="transparent" activeUnderlineColor="#987554" style={{backgroundColor:'white', borderTopLeftRadius:10, borderTopRightRadius:10, borderRadius:10, height:50}} label="M.I." onChangeText={setMI}/>
                            </View>
                            <View style={{flex: 1, marginLeft:2.5}}>
                            <TextInput selectionColor="black" underlineColor="transparent" activeUnderlineColor="#987554" style={{backgroundColor:'white', borderTopLeftRadius:10, borderTopRightRadius:10, borderRadius:10, height:50}} label="Sex" onChangeText={setGender}/>
                            </View>
                        </View>
                        <View style={styles.inputBoxes}>
                        <TouchableOpacity style={{backgroundColor: 'white', borderRadius:10, height:50, justifyContent:'center'}} onPress={() => setShowDatePicker(true)}>
                        <Text style={{marginLeft:15, color:'gray'}}>
                            Birth Date:
                        </Text>
                        <Text style={{marginLeft:15, fontSize:16}}>
                            {date.toDateString()}
                        </Text>
                        {showDatePicker && (
                            <DateTimePicker
                            value={date} 
                            mode="date"
                            display="calendar"
                            onChange={onChange}
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