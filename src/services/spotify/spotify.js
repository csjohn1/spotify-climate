export const SPOTIFY_AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";

// const redirectUri = "http://localhost:3000/";
const redirectUri = "https://spotify-climate.web.app/";
const clientId = "2cbd331c71e44c3d8393ae4945052215";
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "playlist-read-private",
];

export const SPOTIFY_LOGIN_URL = `${SPOTIFY_AUTH_ENDPOINT}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&show_dialog=true&response_type=token`;

export const getSpotifyToken = () => {
  return window.location.hash
    .substring(1)
    .split("&")
    .reduce((initial, item) => {
      const breaks = item.split("=");
      initial[breaks[0]] = decodeURIComponent(breaks[1]);
      return initial;
    }, {});
};
