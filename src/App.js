import "./App.css";
import Login from "./containers/Login/Login";
import React, { useEffect } from "react";
import { getSpotifyToken } from "./services/spotify/spotify";
import SpotifyWebApi from "spotify-web-api-js";
import { useStateValue } from "./context/StateProvider";
import Dashboard from "./containers/Dashboard/Dashboard";
import { updateRelic } from "./services/relic/relic";

const spotify = new SpotifyWebApi();

function App() {
  const [{ token, playing, user, points }, dispatch] = useStateValue();

  useEffect(() => {
    const interval = setInterval(() => {
      if (playing) {
        dispatch({
          type: "INCREASE_POINTS",
        });
      }
    }, 2000);
    return () => {
      clearInterval(interval);
    };
  }, [playing, dispatch]);

  useEffect(() => {
    if (points !== 100) {
      localStorage.setItem("currentPoints", points);
    }
    if (user && user.id) {
      updateRelic(user.id, points);
    }
  }, [points, user]);

  useEffect(() => {
    let accessToken;
    // for dev
    if (!token) {
      const spotifyTokenInfo = getSpotifyToken();
      console.log("spotifyTokenInfo", spotifyTokenInfo);
      window.location.hash = "";
      accessToken = spotifyTokenInfo.access_token;
      console.log("Got token from spotifyTokenInfo", accessToken);
      if (!accessToken) {
        const localStorageAccessToken = localStorage.getItem(
          "spotify_access_token"
        );
        if (localStorageAccessToken) accessToken = localStorageAccessToken;
      }
    } else {
      accessToken = token;
    }

    if (accessToken) {
      spotify.setAccessToken(accessToken);

      // Set spotify instance on data layer
      dispatch({
        type: "SET_SPOTIFY_INSTANCE",
        spotify: spotify,
      });

      dispatch({
        type: "SET_SPOTIFY_TOKEN",
        token: accessToken,
      });

      localStorage.setItem("spotify_access_token", accessToken);

      // Save initial user on load
      const currentPointsLocal = Number(localStorage.getItem("currentPoints"));
      if (points === 100 && currentPointsLocal) {
        dispatch({
          type: "SET_POINTS",
          points: currentPointsLocal,
        });
      }
      spotify
        .getMe()
        .then((user) => {
          console.log(user);
          dispatch({
            type: "SET_USER",
            user: user,
          });
        })
        .catch((err) => {
          console.log("ERRRR", err);
          if (err.status === 401) {
            localStorage.removeItem("spotify_access_token");
          }
          dispatch({
            type: "SET_SPOTIFY_TOKEN",
            token: null,
          });
        });

      spotify.getMyDevices().then((devices) => {
        if (devices && devices.devices.length) {
          dispatch({
            type: "SET_DEVICE_ID",
            deviceId: devices.devices[0].id,
          });
        }
      });
    }
  }, [token, dispatch]);

  return <div className="App">{!token ? <Login /> : <Dashboard />}</div>;
}

export default App;
