import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import Home from './Home'
import Search from './Search'
import { HashRouter, Routes, Route } from 'react-router-dom';
import Favorites from './Favorites';
import Playlists from './Playlists';
import SignUp from './Register';
import PrivateRoute from '../helpers/PrivateRoute';
import Login from './Login';
import Register from './Register';
const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(function(){
    console.log(user);
  },[])
  return (

    <HashRouter>
      <Sidebar />
      <Routes>
        <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/search' element={<PrivateRoute><Search /></PrivateRoute>} />
        <Route path='/favorites' element={<PrivateRoute><Favorites /></PrivateRoute>} />
        <Route path='/playlists' element={<PrivateRoute><Playlists /></PrivateRoute>} />
      </Routes>
    </HashRouter>

  )
}

export default App