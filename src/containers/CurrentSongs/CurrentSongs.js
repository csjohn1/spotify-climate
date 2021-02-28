import React, { useState, useEffect } from "react";
import "./CurrentSongs.css";
import { useStateValue } from "../../context/StateProvider";
import SongRow from "../../components/SongRow/SongRow";
import Current from "../../components/Current/Current";

function CurrentSongs() {
  const [
    { spotify, currentPlaylistId, currentSong },
    dispatch,
  ] = useStateValue();
  const [currentSongs, setCurrentSongs] = useState([]);
  const [totalSongs, setTotalSongs] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (currentPlaylistId) {
      spotify.getShowEpisodes(currentPlaylistId).then((show) => {
        console.log("SHOW ID...", show);
        if (show) {
          setTotalSongs(show.items.length);
          setCurrentSongs(show.items.slice(0, 10));
          if (!currentSong) {
            dispatch({
              type: "SET_CURRENT_SONG",
              currentSong: show.items[0],
            });
          }
          setLoaded(true);
        }
      });
    }
  }, [currentPlaylistId, spotify, dispatch]);

  let songRows = <div>No songs found in the playlist</div>;
  if (currentSongs && currentSongs.length) {
    console.log("currentSongs", currentSongs);
    songRows = currentSongs.map((song, index) => {
      if (song.id) {
        return <SongRow track={song} key={song.id} index={index} />;
      }
    });
  }

  if (loaded) {
    return (
      <div className="current-song-container">
        <div>
          <div className="current-song-head">Recent Episodes</div>
          <div className="current-playlist-number">
            <b>{totalSongs} songs</b> (Previewing {currentSongs.length} songs)
          </div>
          <div className="songrow-container">{songRows}</div>
          <div className="fadeout"></div>
        </div>
        <Current />
      </div>
    );
  } else {
    return null;
  }
}

export default CurrentSongs;
