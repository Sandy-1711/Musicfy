import React from "react";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

function CreateList(props) {
    console.log(props.listitem);
    return <li onClick={function () {
        var selectedPlaylistArray = JSON.parse(localStorage.getItem(props.listitem));
        var flag = 1; console.log((selectedPlaylistArray));
        for (var i = 0; i < selectedPlaylistArray.length; i++) {
            if (selectedPlaylistArray[i].key === props.selectedSongs.key) {
                flag = 0;
                break;
            }
        }
        if (flag === 1) {
            selectedPlaylistArray.push(props.selectedSongs);

        }
        localStorage.setItem(props.listitem, JSON.stringify(selectedPlaylistArray));
        props.setShowCreatePlaylist(false);
        props.setShowPlaylists(false)
    }}>
        {props.listitem.substr(9)} <PlaylistAddIcon />
    </li>
}
export default CreateList