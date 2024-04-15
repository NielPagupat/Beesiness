import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from '../Pages/Login'
import Signup from '../Pages/Signup'
import Activation from '../Pages/activation'
import Dashboard from '../Pages/dashboard'

export default function Router() {
  return (
    <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/dash' element={<Dashboard/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/activate' element={<Activation/>} />
    </Routes>
  )
}
