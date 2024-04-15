import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Card, Avatar } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TopNavigation({val, onPress}) {
    const navigation = useNavigation()
    const [email, setEmail] = useState()
    const Logout = () =>{
      navigation.navigate('Login')
    }

  return (
    <View style={{width:'95%', alignSelf:'center', marginTop:10}}>
      <Card style={{backgroundColor:'#987544'}}>
        <Card.Content style={{flexDirection:'row', alignItems:'center'}}>
          <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between'}} onPress={onPress}>
            <Icon color={'#6C442D'} name='chevron-left' size={20}/>
            <Text style={{color:'#6C442D', marginLeft:10}}>{val}</Text>
          </TouchableOpacity>
            <View style={{flex:1, alignItems:'center', justifyContent:'flex-end', flexDirection:'row'}}>
                <Text style={{marginHorizontal:20}} onPress={Logout}>user-email</Text>
                <TouchableOpacity onPress={Logout}>
                    <Avatar.Image elevation={10} size={50} source={require('../assets/Profile_Pic.jpg')}/>
                </TouchableOpacity>
            </View>
        </Card.Content>
      </Card>
    </View>
  )
}