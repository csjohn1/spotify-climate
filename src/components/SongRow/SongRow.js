import React from "react";
import "./SongRow.css";
import { useStateValue } from "../../context/StateProvider";
import { format } from "date-fns";
import { useToasts } from "react-toast-notifications";
import { updateRelicShow } from "../../services/relic/relic";

function SongRow(props) {
  const { track, index } = props;
  const [{ spotify, deviceId, user }, dispatch] = useStateValue();
  const { addToast } = useToasts();

  const date = format(new Date(track.release_date), "MMM dd, yyyy");

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

  function playSong(track) {
    console.log("track,...,.,.,.,.,.", track);
    spotify
      .play({
        device_id: deviceId,
        uris: [`spotify:episode:${track.id}`],
      })
      .then((res) => {
        spotify
          .getMyCurrentPlayingTrack()
          .then((r) => {
            dispatch({
              type: "SET_CURRENT_SONG",
              currentSong: track,
            });
            dispatch({
              type: "SET_PLAYING",
              playing: true,
            });
            addToast(`You're earning Energy Coins`, { appearance: "success" });
            updateRelicShow(user.id, track.name);
          })
          .catch((err) => {
            addToast(`Your spotify device needs to be connected`, {
              appearance: "error",
            });
          });
      })
      .catch((err) => {
        addToast(`Your spotify device needs to be connected`, {
          appearance: "error",
        });
      });
  }

  return (
    <div className="song-row" onClick={() => playSong(track)}>
      <span className="song-row-index">{index + 1}</span>
      <span>
        <img
          className="song-row-img"
          src={
            track.images.length
              ? track.images[0].url
              : "https://alternative.me/media/256/apple-music-icon-zjfonio4mg4jdyuf-c.png"
          }
          alt={track.name}
        />
      </span>
      <span className="song-row-name">{track.name}</span>
      {/* <span className="song-row-album">{track.release_date}</span> */}
      <span className="song-row-album">{date}</span>
      <span className="song-row-duration">
        {millisToMinutesAndSeconds(track.duration_ms)}
      </span>
    </div>
  );
}

export default SongRow;
