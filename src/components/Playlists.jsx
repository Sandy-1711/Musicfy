import React, { useEffect, useState } from 'react'
// import Sidebar from './Sidebar'
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import ClearIcon from '@mui/icons-material/Clear';
import FavoriteIcon from '@mui/icons-material/Favorite';
import DeleteIcon from '@mui/icons-material/Delete';
const Playlists = () => {
    var [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
    var [newPlayListName, setNewPlayListName] = useState();
    var [selectedSongs, setSelectedSongs] = useState();
    var [selectedPlaylist, setSelectedPlaylist] = useState();
    var [playlists, setPlaylists] = useState(JSON.parse(localStorage.getItem('playlist')));
    useEffect(function () {
        setPlaylists(JSON.parse(localStorage.getItem('playlist')));
    }, [playlists])
    function createPlaylist(element) {
        var playlist = JSON.parse(localStorage.getItem(element))[0];
        // console.log(playlist);
        return <div onClick={function () {
            setSelectedPlaylist(element);
        }} className='card playlistcard'>
            <img src={playlist ? playlist.images.background : null} alt={playlist ? playlist.title : null} />
            <div className='cardInfo playlistCardInfo'>

                <h2>{element.substr(9,7)}</h2>
            </div>
            <div className='play playlistplay'>
                <PlayCircleFilledWhiteIcon />
            </div>
            <div className='delete playlistdelete'><DeleteIcon onClick={function(){
                localStorage.removeItem(element);
                var a = JSON.parse(localStorage.getItem('playlist'));
                            var index = a.findIndex(function (item) {
                                return item.key === element.key;
                            });
                            if (index !== -1) {

                                a.splice(index, 1);
                            }
                            localStorage.setItem('playlist', JSON.stringify(a))
                
            }}/></div>

        </div>
    }
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
    function CreateCard(element) {
        // function handleClick(element) {
        function handleClick(element) {
            var favorites = JSON.parse(localStorage.getItem('favorites')) || [];

            var index = favorites.findIndex(function (item) {
                return element.key === item.key;
            });

            if (index !== -1) {
                favorites.splice(index, 1);
                console.log("Song removed!");
            } else {
                favorites.push(element);
                console.log("Song saved!");
            }
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }

        // }


        return (
            <div>
                {element ?
                    <div key={element.key} className='card'>

                        <div className='like' >
                            <FavoriteIcon
                                onClick={function () {
                                    handleClick(element)
                                }}
                            />
                        </div>
                        <div className='play'>
                            <PlayCircleFilledWhiteIcon />
                        </div>

                        <div className='delete'><DeleteIcon onClick={function () {
                            // selectedPlaylist();
                            var a = JSON.parse(localStorage.getItem(selectedPlaylist));
                            var index = a.findIndex(function (item) {
                                return item.key === element.key;
                            });
                            if (index !== -1) {

                                a.splice(index, 1);
                            }
                            localStorage.setItem(selectedPlaylist, JSON.stringify(a))
                        }} /></div>

                        <img src={element.images.background} alt={element.title} />
                        <div className='cardInfo'>
                            <h3>{element.title}</h3>
                            <p>{element.subtitle}</p>
                        </div>

                    </div>
                    : <div><h2 style={{ width: 'max-content' }}>No Songs in the playlist</h2></div>}
            </div>
        )
    }
    return (<>

        {/* <Sidebar /> */}
        <div className='homePage'>
            <div className='cardsContainer playlistCardsContainer'>
                <h2>My Playlists</h2>
                <div className='playlistPagePlaylist' onClick={function () {
                    setShowCreatePlaylist(true);
                }}><PlaylistAddIcon /></div>
                {playlists ?

                    <div className='cards'>
                        {playlists.map(createPlaylist)}
                    </div> : <div><h1>No Playlists found</h1></div>
                }
                {
                    showCreatePlaylist && <div className='plpagelistlist'>
                        <div className='clear' onClick={function () {
                            setShowCreatePlaylist(false)
                        }}><ClearIcon /></div>
                        <input required type="text" onChange={handleChange} placeholder="New Playlist" />
                        <button onClick={handleNewPlaylistButton}>Create</button>
                    </div>
                }
            </div>
            
            <div>
                {selectedPlaylist ? <div className='cardsContainer playlistCardContainer'>
                    <div className='cards'>

                        {JSON.parse(localStorage.getItem(selectedPlaylist)).map(CreateCard)}
                        
                    </div>
                </div>
                    : <div className='cardsContainer'><h2>Select a playlist to open it</h2></div>}
            </div>
        </div>

    </>
    )
}

export default Playlists