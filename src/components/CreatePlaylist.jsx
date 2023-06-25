import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

function CreatePlaylist(props) {
    if (props.element) {

        var playlist = JSON.parse(localStorage.getItem(props.element))[0];
        // console.log(playlist);
        return <div className='card playlistcard'>
            <img src={playlist ? playlist.images.background : null} alt={playlist ? playlist.title : null} />
            <div className='cardInfo playlistCardInfo'>

                <h2>{props.element.substr(9, 7)}</h2>
            </div>
            <div className='play playlistplay'>
                <PlayCircleFilledWhiteIcon />
            </div>
            <div className='delete playlistdelete'><DeleteIcon onClick={function () {
                localStorage.removeItem(props.element);
                var a = JSON.parse(localStorage.getItem('playlist'));
                var index = a.findIndex(function (item) {
                    return item.key === props.element.key;
                });
                if (index !== -1) {

                    a.splice(index, 1);
                }
                localStorage.setItem('playlist', JSON.stringify(a))

            }} /></div>

        </div>
    }
}

export default CreatePlaylist