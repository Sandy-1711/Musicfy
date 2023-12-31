import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useKeycloak } from '@react-keycloak/web';
const Sidebar = () => {
  const navigate = useNavigate()
  // const { keycloak, initialized } = useKeycloak();
  const history = useLocation();
  const path = history.pathname.substring(1);
  // console.log(path);
  const user = JSON.parse(localStorage.getItem('user'))
  return (
    <div className='sidebar'>
      <h1 style={{ fontSize: '1.5rem' }}>Musicfy</h1>
      <ul>
        <li><Link to='/'><HomeIcon style={{ color: path === '' ? 'black' : 'grey' }} /><span style={{ color: path === '' ? 'black' : 'grey' }}>Home</span></Link></li>
        <li><Link to='/search'><SearchIcon style={{ color: path === 'search' ? 'black' : 'grey' }} /><span style={{ color: path === 'search' ? 'black' : 'grey' }}>Search</span></Link></li>
        <li><Link to='/favorites'><FavoriteIcon style={{ color: path === 'favorites' ? 'black' : 'grey' }} /><span style={{ color: path === 'favorites' ? 'black' : 'grey' }}>Favorites</span></Link></li>
        <li><Link to='/playlists'><QueueMusicIcon style={{ color: path === 'playlists' ? 'black' : 'grey' }} /><span style={{ color: path === 'playlists' ? 'black' : 'grey' }}>Playlists</span></Link></li>
      </ul>
      {user && <div className='logout'><button onClick={function () {
        localStorage.removeItem("user")
        for (var i = 0; i < JSON.parse(localStorage.getItem('playlist')); i++) {
          localStorage.removeItem(localStorage.removeItem(JSON.parse(localStorage.getItem('playlist'))[i]))
        }
        localStorage.removeItem("playlist");

        navigate('/login');
      }}>Logout</button></div>}
    </div>
  )
}

export default Sidebar