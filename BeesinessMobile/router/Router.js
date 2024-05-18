import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../Pages/Login'
import DashBoard from '../Pages/Dashboard'
import SignUp from '../Pages/SignUp'
import Activation from '../Pages/Activation'
import ManageProject from '../Pages/ManageProject'
import ProjectAsLeader from '../Pages/ProjectAsLeader'
import ProjectAsMember from '../Pages/ProjectAsMember'

const Stack = createStackNavigator()
export default function Router() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Login' component={Login} options={{ headerShown: false }}/>
            <Stack.Screen name='SignUp' component={SignUp} options={{ headerShown: false }}/>
            <Stack.Screen name='Activation' component={Activation} options={{ headerShown: false }}/>
            <Stack.Screen name='Dashboard' component={DashBoard} options={{ headerShown: false }}/>
            <Stack.Screen name='ManageProject' component={ManageProject} options={{ headerShown: false }}/>
            <Stack.Screen name='ProjectAsLeader' component={ProjectAsLeader} options={{ headerShown: false }}/>
            <Stack.Screen name='ProjectAsMember' component={ProjectAsMember} options={{ headerShown: false }}/>
        </Stack.Navigator>
    </NavigationContainer>
  )
}