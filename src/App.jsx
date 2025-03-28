import React from 'react'
import { Route, Routes } from 'react-router'
import Login from './components/Login'
import UsersList from './components/UserList'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div className='poppins-regular'>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/users' element={<UsersList />} />
      </Routes>
    </div>
  )
}

export default App
