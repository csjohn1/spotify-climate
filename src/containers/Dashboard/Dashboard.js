import React from "react";
import Header from "../../components/Header/Header";
import TopSongs from "../../components/TopSongs/TopSongs";
import CurrentSongs from "../CurrentSongs/CurrentSongs";

function Dashboard() {
  return (
    <div>
      <Header />
      <TopSongs />
      <CurrentSongs />
    </div>
  );
}

export default Dashboard;
