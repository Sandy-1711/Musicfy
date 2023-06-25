import React, { useEffect, useState } from 'react'
// import Sidebar from './Sidebar'
import ClearIcon from '@mui/icons-material/Clear';
import CreateCard from './CreateCard';
import CreateList from './CreateList';
const Favorites = () => {
    var [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')));
    var [showPlaylists, setShowPlaylists] = useState(false);
    var [playlists, setPlaylists] = useState(JSON.parse(localStorage.getItem('playlist')) || []);
    var [selectedSongs, setSelectedSongs] = useState();
    var [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
    var [newPlayListName, setNewPlayListName] = useState();
    useEffect(function () {
        setFavorites(JSON.parse(localStorage.getItem('favorites')));
    }, [favorites]);
    useEffect(function () {
        setPlaylists(JSON.parse(localStorage.getItem('playlist')));
    }, [playlists])

   



    function handleChange(e) {
        setNewPlayListName(e.target.value);
    }

    function handleNewPlaylistButton(e) {
        e.preventDefault();
        var array = JSON.parse(localStorage.getItem('playlist')) || [];
        array.push('playlist_' + newPlayListName);
        localStorage.setItem('playlist', JSON.stringify(array));
        // var playlistarr = JSON.parse(localStorage.getItem('playlists')) || [];
        var newplay = ([selectedSongs]);
        localStorage.setItem('playlist_' + newPlayListName, JSON.stringify(newplay));
        setShowCreatePlaylist(false);

    }
    return (
        <>
            {/* <Sidebar /> */}
            <div className='homePage'>
                <div>
                    {

                        <div className='cardsContainer'>
                            <h2>Favorites</h2>
                            {
                                favorites ?
                                    <div className='favCardsContainer cards'>
                                        {favorites.map(function (element) {
                                            return (

                                                <CreateCard element={element} setShowPlaylists={setShowPlaylists} setSelectedSongs={setSelectedSongs} />
                                            )
                                        })}
                                    </div> : <div><h1>No favorites</h1></div>
                            }
                            {
                                showCreatePlaylist && <div className='playlistlist'>
                                    <div className='clear' onClick={function () {
                                        setShowCreatePlaylist(false)
                                        setShowPlaylists(false)
                                    }}><ClearIcon /></div>
                                    <input required type="text" onChange={handleChange} placeholder="New Playlist" />
                                    <button onClick={handleNewPlaylistButton}>Create</button>
                                </div>
                            }
                            {showPlaylists && <div className='playlistlist'>
                                <div className='clear' onClick={function () {
                                    setShowPlaylists(false)
                                }}><ClearIcon /></div>
                                {playlists && <ul>
                                    {playlists.map(function (listitem) {
                                        return (<CreateList
                                            listitem={listitem}
                                            setShowPlaylists={setShowPlaylists}
                                            setShowCreatePlaylist={setShowCreatePlaylist}
                                            selectedSongs={selectedSongs}
                                        />)
                                    })}
                                </ul>}
                                <button onClick={function (e) {
                                    e.preventDefault();
                                    setShowCreatePlaylist(true);
                                    setShowPlaylists(false)
                                    var playlist = JSON.parse(localStorage.getItem('playlists')) || [];
                                    playlist.push();
                                }}>Create Playlist</button>
                            </div>}
                        </div>
                    }
                </div>

            </div>
        </>
    )
}

export default Favorites