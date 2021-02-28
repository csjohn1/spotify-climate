import React from "react";
import "./Login.css";
import { SPOTIFY_LOGIN_URL } from "../../services/spotify/spotify";
import { RiNeteaseCloudMusicLine } from "react-icons/ri";

const Login = (props) => {
  return (
    <div className="container">
      <div className="icon">
        <RiNeteaseCloudMusicLine size={100} color={"#19b558"} />
      </div>
      <a href={SPOTIFY_LOGIN_URL} className="spotify-button">
        Connect with Spotify
      </a>
    </div>
  );
};

export default Login;
