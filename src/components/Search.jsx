import React, { useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search'; 
// import Sidebar from './Sidebar';
import ClearIcon from '@mui/icons-material/Clear';
import CreateCard from './CreateCard';
import CreateList from './CreateList';

const Search = () => {
    var [formData, setFormData] = useState();
    var [suggestions, setSuggestions] = useState();
    var [searchResults, setSearchresults] = useState();
    var [showPlaylists, setShowPlaylists] = useState(false);
    var [selectedSongs, setSelectedSongs] = useState();
    var [showCreatePlaylist, setShowCreatePlaylist] = useState(false);
    var [newPlayListName, setNewPlayListName] = useState();
    var [playlists, setPlaylists] = useState(JSON.parse(localStorage.getItem('playlist')))
    useEffect(function () {
        setPlaylists(JSON.parse(localStorage.getItem('playlist')));
    }, [playlists])
    async function fetchsuggestions(term) {

        const url = 'https://shazam.p.rapidapi.com/auto-complete?term=' + term + '&locale=en-US';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '44493296c0msh587bb936b158d9ep1d5245jsn8293b71897be',
                'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            const result = await response.text();
            setSuggestions(JSON.parse(result).hints);
        } catch (error) {
            console.error(error);
        }
    }
    async function fetchSearch() {
        const url = 'https://shazam.p.rapidapi.com/search?term=' + formData + '&locale=en-US&offset=0&limit=5';
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '44493296c0msh587bb936b158d9ep1d5245jsn8293b71897be',
                'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            var result = await response.text();
            setSearchresults(JSON.parse(result))
        } catch (error) {
            console.error(error);
        }
    }
    function handleChange(e) {
        setFormData(e.target.value);
        fetchsuggestions(formData);

    }
    function handleClick(e) {
        e.preventDefault();
        fetchSearch();
    }
    function handleChange2(e) {
        e.preventDefault();
        setNewPlayListName(e.target.value);

    }
    function createSuggestion(element, index) {
        return <div onClick={function () {
            setFormData(element.term)
        }} className='suggestiontext' key={index}><p>{element.term}</p></div>
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
            <div className='homePage'>
                <div className='searchArea'>
                    <form onChange={
                        handleChange}
                    >
                        <input placeholder='Search a song' type='text' value={formData} name='searchKey' id='searchKey' />
                        <button onClick={handleClick}><SearchIcon /></button>
                    </form>
                </div>
                {suggestions && <div className='suggestions'>
                    {suggestions.map(createSuggestion)}
                </div>}
                <div className='cardsContainer searchContainer'>
                    <h2>Search Results</h2>
                    {
                        searchResults ?
                            <div className='cards'>
                                {searchResults.tracks.hits.map(function (element) {
                                    return <CreateCard element={element.track} setSelectedSongs={setSelectedSongs} setShowPlaylists={setShowPlaylists} />
                                })}
                            </div> : <div><h3>No results found</h3></div>
                    }
                </div>
                {
                    showCreatePlaylist && <div className='playlistlist'>
                        <div className='clear' onClick={function () {
                            setShowCreatePlaylist(false)
                            setShowPlaylists(false)
                        }}><ClearIcon /></div>
                        <input required type="text" onChange={handleChange2} placeholder="New Playlist" />
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

export default Search