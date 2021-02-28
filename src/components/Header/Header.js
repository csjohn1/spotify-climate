import React, { useEffect, useState } from "react";
import "./Header.css";
import { IoMdRefresh } from "react-icons/io";
import { RiNeteaseCloudMusicLine } from "react-icons/ri";
import { useStateValue } from "../../context/StateProvider";

function Header() {
  const [{ spotify, deviceId, playing, points }, dispatch] = useStateValue();
  const [deviceClass, setDeviceClass] = useState("device");

  const checkDeviceUpdate = () => {
    spotify.getMyDevices().then((devices) => {
      if (devices && devices.devices.length) {
        dispatch({
          type: "SET_DEVICE_ID",
          deviceId: devices.devices[0].id,
        });
        setDeviceClass("device");
      } else {
        dispatch({
          type: "SET_DEVICE_ID",
          deviceId: null,
        });
        setDeviceClass("device not");
      }
    });
  };

  useEffect(() => {
    if (!deviceId) {
      setDeviceClass("device not");
    } else {
      setDeviceClass("device");
    }
  }, [deviceId]);

  return (
    <div className="header-container">
      <div className="header-icon">
        <RiNeteaseCloudMusicLine size={64} />
      </div>
      <div className={playing ? "search-box animate" : "search-box"}>
        <div className="coin-container">
          <img
            className={playing ? "energy-coin animate" : "energy-coin"}
            src="https://i.imgur.com/GfHh7je.png"
            alt="https://i.imgur.com/GfHh7je.png"
          />
        </div>
        <div className="search-box-input">
          <b style={{ fontSize: 20, paddingRight: 4 }}>{points} </b> coins
          earned
        </div>
      </div>

      <div className="device-section">
        <div className={deviceClass}>
          Device {deviceId ? "Connected" : "Not Connected"}
        </div>
        <div className="search-box-icon" onClick={() => checkDeviceUpdate()}>
          <IoMdRefresh size={30} />
        </div>
      </div>
    </div>
  );
}

export default Header;

// const search = debounce((e) => {
//   if (!spotify) return;

//   if (e.target.value && e.target.value.length > 2) {
//     spotify
//       .searchPlaylists(e.target.value, {
//         limit: 10,
//       })
//       .then((results) => {
//         dispatch({
//           type: "SET_PLAYLISTS",
//           playlists: results.playlists.items,
//         });

//         // set default playlist
//         if (results.playlists.items[0]) {
//           dispatch({
//             type: "SET_CURRENT_PLAYLIST_ID",
//             currentPlaylistId: results.playlists.items[0].id,
//           });
//         }
//       });
//   } else if (!e.target.value || e.target.value.length == 0) {
//     spotify.getUserPlaylists().then((playlists) => {
//       console.log(playlists.items);
//       dispatch({
//         type: "SET_PLAYLISTS",
//         playlists: playlists.items,
//       });

//       // set default playlist
//       if (playlists.items[0]) {
//         dispatch({
//           type: "SET_CURRENT_PLAYLIST_ID",
//           currentPlaylistId: playlists.items[0].id,
//         });
//       }
//     });
//   }
// }, 300);
