import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import Activation from '../Pages/activation'
import Dashboard from '../Pages/dashboard'
import AddProject from '../Pages/AddProject'

export default function Router() {
  return (
    <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/dash/:auth_token/' element={<Dashboard/>} />
        <Route path='/createProject' element={<AddProject/>}/>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/activate/:email' element={<Activation/>} />
    </Routes>
  )
}
