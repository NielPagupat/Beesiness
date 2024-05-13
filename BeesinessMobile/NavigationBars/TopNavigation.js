import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Card, Avatar } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';

export default function TopNavigation({ userEmail, onPress }) {
  const navigation = useNavigation();

  const toLogOut = () => {
    navigation.navigate('Login')
  }

  return (
    <View style={{width:'95%', alignSelf:'center', marginTop:10}}>
      <Card style={{backgroundColor:'#987544'}}>
        <Card.Content style={{flexDirection:'row', alignItems:'center'}}>
          <TouchableOpacity style={{flexDirection:'row', alignItems:'center'}} onPress={onPress}>
          <Avatar.Image size={50} source={require('../assets/beesiness.png')} style={{backgroundColor:'rgba(0,0,0,0)'}}/>
          <Text style={{color:'white', marginHorizontal:5, fontSize:15}}>Beesiness</Text>
          </TouchableOpacity>
            <View style={{flex:1, alignItems:'center', justifyContent:'flex-end', flexDirection:'row'}}>
                <Text style={{marginHorizontal:10, color:'white'}}>{userEmail}</Text>
                <TouchableOpacity onPress={toLogOut}>
                    <Avatar.Image elevation={10} size={50} source={require('../assets/Profile_Pic.jpg')}/>
                </TouchableOpacity>
            </View>
        </Card.Content>
      </Card>
    </View>
  )
}