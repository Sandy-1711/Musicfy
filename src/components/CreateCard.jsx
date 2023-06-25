import React from "react";
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';


function CreateCard(props) {




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
        <div key={props.element.key} className='card'>

            <div className='like' >
                <FavoriteIcon
                    onClick={function () {
                        handleClick(props.element)
                    }}
                />
            </div>
            <div className='play'>
                <PlayCircleFilledWhiteIcon />
            </div>
            <div className='playlist' onClick={
                function () {
                    props.setShowPlaylists(true);
                    props.setSelectedSongs(props.element);
                    console.log(props.element);
                }
            }><PlaylistAddIcon />
            </div>

            <img src={props.element.images.background} alt={props.element.title} />
            <div className='cardInfo'>
                <h3>{props.element.title.substr(0, 45)}{props.element.title.length > 45 && <span>...</span>}</h3>
                <p>{props.element.subtitle.substr(0, 50)}{props.element.subtitle.length > 50 && <span>...</span>}</p>
            </div>

        </div>
    )
}
export default CreateCard