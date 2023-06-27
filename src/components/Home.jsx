import React, { useEffect, useState } from 'react'
// import Sidebar from './Sidebar';
import ClearIcon from '@mui/icons-material/Clear';
import CreateList from './CreateList';
import CreateCard from './CreateCard';
import CreatePlaylist from './CreatePlaylist';
const Home = () => {

    var [global, setGlobal] = useState(fetchData)
    var [showPlaylists, setShowPlaylists] = useState(false);
    var [selectedSongs, setSelectedSongs] = useState();
    var [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
    var [newPlayListName, setNewPlayListName] = useState();

    var [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem('favorites')));
    var [playlists, setPlaylists] = useState(JSON.parse(localStorage.getItem('playlist')))
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
    async function fetchData() {

        await fetch('https://shazam.p.rapidapi.com/charts/track?locale=en-US&pageSize=20&startFrom=0', {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '33b8c5e176msha49eebb3918b78fp141637jsn0b4810f708b5',
                'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
            }
        }).then(async function (response) {
            return await response.json();
        }).then(function (json) {
            console.log(json);
            setGlobal(json);
            return json;
        }).catch(function (err) {
            console.log(err);
        })
    }
    return (
        <>

            {/* <Sidebar /> */}
            <div className='homePage'>
                <div className='cardsContainer'>
                    <h2>Global Top 20</h2>
                    <div className='cards'>
                        {global.tracks ? global.tracks.map(function (element) {
                            return <CreateCard
                                element={element}
                                setSelectedSongs={setSelectedSongs}
                                setShowPlaylists={setShowPlaylists} />
                        }) : <div className='cardsContainer'><h1>No songs found</h1></div>}
                    </div>
                </div>
                {

                    <div className='cardsContainer'>
                        <h2>Favorites</h2>
                        {
                            favorites ?
                                <div className='cards homecard'>
                                    {favorites.map(function (element) {
                                        return <CreateCard
                                            element={element}
                                            setSelectedSongs={setSelectedSongs}
                                            setShowPlaylists={setShowPlaylists}
                                        />
                                    })}
                                </div> : <div className='cardsContainer'><h1>No favorites</h1></div>
                        }
                    </div>
                }

                <div className='cardsContainer'>
                    <h2>Playlists</h2>
                    {playlists ?

                        <div className='cards'>
                            {playlists.map(function (element) {
                                return <CreatePlaylist
                                    element={element}
                                />
                            })}
                        </div> : <div className='cardsContainer'><h1>No Playlists found</h1></div>
                    }
                </div>
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
        </>
    )
}
export default Home