import React from "react";
import "./SongTile.css";
import { useStateValue } from "../../context/StateProvider";

function SongTile(props) {
  const { url, name, margin, owner, id } = props;
  const [, dispatch] = useStateValue();

  const setCurrentPlaylistId = id => {
    dispatch({
      type: "SET_CURRENT_PLAYLIST_ID",
      currentPlaylistId: id
    });
  };

  return (
    <span
      className={margin ? "tile-margin" : ""}
      onClick={() => setCurrentPlaylistId(id)}
    >
      <img className="tile hover main" src={url} alt={name} />
      <div className="tile-title">{name}</div>
      <div className="tile-owner">{owner}</div>
      <img className="tile blur" src={url} alt={name} />
    </span>
  );
}

export default SongTile;
