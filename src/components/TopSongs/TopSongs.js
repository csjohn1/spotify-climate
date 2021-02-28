import React, { useEffect, useState } from "react";
import "./TopSongs.css";
import { useStateValue } from "../../context/StateProvider";
import SongTile from "../SongTile/SongTile";

function TopSongs() {
  const [{ playlists, spotify }, dispatch] = useStateValue();
  const [loaded, setLoaded] = useState(false);
  const climateShows = [
    "1KzrasExlM5dgMYwgFHns6",
    "5ow38TVV090Tt1GQzjmJo3",
    "4ZSBjcIGeBAsuxEnSaF3YQ",
    "2eeS7Z9cu5xT15XKq64hPL",
    "6qU6GBIa8dG3CsImQkjZH8",
    "583O1ysecdpa3VSZaMLutM",
    "0T1AQjjA1phAZvGDEAFb2q",
    "595SdSgkD1Nrn90qx1hjc8",
    "6flJdBIao1mWiILDzv20Qk",
    "6zrL0QQWBhlVFsCveE2mtE",
  ];

  useEffect(() => {
    if (spotify) {
      spotify.getShows(climateShows).then((resp) => {
        console.log("shows", resp.shows);
        dispatch({
          type: "SET_PLAYLISTS",
          playlists: resp.shows,
        });

        if (resp.shows[0]) {
          dispatch({
            type: "SET_CURRENT_PLAYLIST_ID",
            currentPlaylistId: resp.shows[0].id,
          });
        }
        setLoaded(true);
      });

      // spotify.getUserPlaylists().then((playlists) => {
      //   console.log(playlists.items);
      //   dispatch({
      //     type: "SET_PLAYLISTS",
      //     playlists: playlists.items,
      //   });

      //   // set default playlist
      //   if (playlists.items[0]) {
      //     dispatch({
      //       type: "SET_CURRENT_PLAYLIST_ID",
      //       currentPlaylistId: playlists.items[0].id,
      //     });
      //   }
      // });
    }
  }, [spotify, dispatch]);

  let playlists_block = <div>No shows found</div>;
  if (playlists && playlists.length) {
    playlists_block = playlists.map((playlist, index) => {
      return (
        <SongTile
          url={
            playlist &&
            playlist.images &&
            playlist.images.length > 0 &&
            playlist.images[0].url
              ? playlist.images[0].url
              : "https://alternative.me/media/256/apple-music-icon-zjfonio4mg4jdyuf-c.png"
          }
          name={playlist.name}
          key={playlist.uri}
          margin={index === 0}
          owner={playlist.publisher}
          id={playlist.id}
        />
      );
    });
  }

  if (loaded) {
    return (
      <div className="top-songs-container">
        <div className="playlist-head">Top Podcasts</div>
        <div className="artist-block">{playlists_block}</div>
      </div>
    );
  } else {
    return null;
  }
}

export default TopSongs;
