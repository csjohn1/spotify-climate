export const initialState = {
  user: null,
  playlists: [],
  spotify: null,
  playing: false,
  currentSong: null,
  currentPlaylistId: null,
  deviceId: null,
  points: 100,
  token: null,
  // token:
  // "BQAdrGr2SzSreGT09UDlN5s6Gxa3trM2uS3Ywpo9D6kJVm0UIpp4MTlYG5AeSdmmaTQ1CZgeFOb1I8ASuYcacmEmevsrtFvKIgLuGqi31uCtrpaDbDtR4Ud7Q7tZjWiXJMMO4_Xc18kPpxwPut1VXnX76Pwt20DAH0m0_SSCZbk",
};

const reducer = (state, action) => {
  console.log("Action made: ", action);
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_SPOTIFY_INSTANCE":
      return {
        ...state,
        spotify: action.spotify,
      };
    case "SET_SPOTIFY_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_PLAYLISTS":
      return {
        ...state,
        playlists: action.playlists,
      };
    case "SET_DEVICE_ID":
      return {
        ...state,
        deviceId: action.deviceId,
      };
    case "SET_CURRENT_PLAYLIST_ID":
      return {
        ...state,
        currentPlaylistId: action.currentPlaylistId,
      };
    case "SET_CURRENT_SONG":
      return {
        ...state,
        currentSong: action.currentSong,
      };
    case "SET_PLAYING":
      return {
        ...state,
        playing: action.playing,
      };
    case "INCREASE_POINTS":
      return {
        ...state,
        points: state.points + 10,
      };
    case "SET_POINTS":
      return {
        ...state,
        points: action.points,
      };
    default:
      return state;
  }
};

export default reducer;
