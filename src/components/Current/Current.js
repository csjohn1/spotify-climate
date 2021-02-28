import React from "react";
import "./Current.css";
import { useStateValue } from "../../context/StateProvider";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { format } from "date-fns";
import { useToasts } from "react-toast-notifications";

function Current() {
  const [
    { currentSong, playing, spotify, deviceId },
    dispatch,
  ] = useStateValue();
  const { addToast } = useToasts();

  function playPause(playBool) {
    if (playBool) {
      spotify
        .play({
          device_id: deviceId,
          uris: [`spotify:episode:${currentSong.id}`],
        })
        .then(() => {
          addToast(`You're earning Energy Coins`, { appearance: "success" });
          dispatch({
            type: "SET_PLAYING",
            playing: playBool,
          });
        })
        .catch((err) => {
          dispatch({
            type: "SET_PLAYING",
            playing: false,
          });
          addToast(`Your spotify device needs to be connected`, {
            appearance: "error",
          });
        });
    } else {
      spotify.pause({
        device_id: deviceId,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: playBool,
      });
    }
  }

  return (
    <div className="current-container">
      <img
        className="song-image"
        src={
          currentSong
            ? currentSong.images[0].url
            : "https://alternative.me/media/256/apple-music-icon-zjfonio4mg4jdyuf-c.png"
        }
        alt=""
      />
      <div className="break" />
      <div className="current-name">
        {currentSong ? currentSong.name : null}
      </div>
      <div className="break" />
      <div className="current-album">
        {/* {currentSong ? currentSong.album.name : null} (
        {currentSong ? currentSong.album.album_type : null}) */}
        {currentSong
          ? format(new Date(currentSong.release_date), "MMM dd, yyyy")
          : null}
      </div>
      <div className="break" />
      {playing ? (
        <AiFillPauseCircle
          onClick={() => playPause(false)}
          className="pause-play-icon"
          size={72}
        />
      ) : (
        <AiFillPlayCircle
          onClick={() => playPause(true)}
          className="pause-play-icon"
          size={72}
        />
      )}
    </div>
  );
}

export default Current;
