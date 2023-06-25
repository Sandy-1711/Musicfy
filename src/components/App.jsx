import React from 'react'
import Sidebar from './Sidebar'
import Home from './Home'
import Search from './Search'
import { HashRouter, Routes, Route } from 'react-router-dom';
import Favorites from './Favorites';
import Playlists from './Playlists';
// import { ReactKeycloakProvider } from '@react-keycloak/web';
// import keycloak from '../keycloak';
// import PrivateRoute from '../helpers/PrivateRoute';
const App = () => {
  return (
    // <ReactKeycloakProvider authClient={keycloak}>

      <HashRouter>
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/playlists' element={<Playlists />} />
        </Routes>
      </HashRouter>
    // </ReactKeycloakProvider>

  )
}

export default App