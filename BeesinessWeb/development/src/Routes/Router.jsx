import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import Activation from '../Pages/activation'
import Dashboard from '../Pages/dashboard'
import AddProject from '../Pages/AddProject'
import OpenProject from '../Pages/OpenProject'
import ProjectDetailsMember from '../Pages/ProjectDetailAsMember'
import EditProject from '../Pages/EditProjectConfig'
import TaskProgress from '../Pages/TaskProgressPage'

export default function Router() {
  return (
    <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/dash/:auth_token/' element={<Dashboard/>} />
        <Route path='/createProject/:email/' element={<AddProject/>}/>
        <Route path='checkProject/:email/' element={<OpenProject />}/>
        <Route path='/projectDetailMember/:email/' element={<ProjectDetailsMember/>}/>
        <Route path='/TaskProgress/' element={<TaskProgress/>}/>
        <Route path='/EditProject/' element={<EditProject/>}/>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/activate/:email' element={<Activation/>} />
    </Routes>
  )
}
