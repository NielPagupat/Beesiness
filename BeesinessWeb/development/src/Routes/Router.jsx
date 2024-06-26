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
import NewUser from '../Components/newUser'
import Table from '../Components/Table'
export default function Router() {
  return (
    <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/dash/:email/' element={<Dashboard/>} />
        <Route path='/createProject/:email/' element={<AddProject/>}/>
        <Route path='/checkProject/:email/' element={<OpenProject />}/>
        <Route path='/projectDetailMember/' element={<ProjectDetailsMember/>}/>
        <Route path='/TaskProgress/' element={<TaskProgress/>}/>
        <Route path='/EditProject/' element={<EditProject/>}/>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/activate/:email' element={<Activation/>} />
        <Route path='/aboutUs' element={<NewUser/>} />
        <Route path='/newTable' element = {<Table/>} />
    </Routes>
  )
}
