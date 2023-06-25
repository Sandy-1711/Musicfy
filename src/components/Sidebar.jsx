import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { Link, useLocation } from 'react-router-dom';
// import { useKeycloak } from '@react-keycloak/web';
const Sidebar = () => {
  // const { keycloak, initialized } = useKeycloak();
  const history = useLocation();
  const path = history.pathname.substring(1);
  // console.log(path);
  return (
    <div className='sidebar'>
      <h1 style={{ fontSize: '1.5rem' }}>Musicfy</h1>
      <ul>
        <li><Link to='/'><HomeIcon style={{ color: path === '' ? 'black' : 'grey' }} /><span style={{ color: path === '' ? 'black' : 'grey' }}>Home</span></Link></li>
        <li><Link to='/search'><SearchIcon style={{ color: path === 'search' ? 'black' : 'grey' }} /><span style={{ color: path === 'search' ? 'black' : 'grey' }}>Search</span></Link></li>
        <li><Link to='/favorites'><FavoriteIcon style={{ color: path === 'favorites' ? 'black' : 'grey' }} /><span style={{ color: path === 'favorites' ? 'black' : 'grey' }}>Favorites</span></Link></li>
        <li><Link to='/playlists'><QueueMusicIcon style={{ color: path === 'playlists' ? 'black' : 'grey' }} /><span style={{ color: path === 'playlists' ? 'black' : 'grey' }}>Playlists</span></Link></li>
      </ul>
      {/* {!keycloak.authenticated && (<button type='button' onClick={function(){keycloak.login() */}
      {/* }}>Login</button>)} */}
      {/* // {!!keycloak.authenticated && (<button type='button' onClick={function(){keycloak.logout()}}>Logout</button>)} */}
    </div>
  )
}

export default Sidebar