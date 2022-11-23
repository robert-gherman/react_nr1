import React, { useState } from "react";
// Components
import Song from "./components/Song";
import Player from "./components/Player";
// Styles
import "./styles/app.scss";

function App() {
  const [data, setData] = useState();
  const spotifyAuth = async () => {
    const settings = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " +
          "BQAR-sStmnGaPVrSTqMNiZO3vMx1qFzKMcytKpa8ULoyvUgUeY87XZpq5iLj2FYQmGsE9QwzoLqPcVxgoyEVkRxEokbEsz26FgjRv7Ky8kdoI8lojGalCijTS5zothK3G2NwAhDTHygODnThJM8AqygU9jnqQlaPk7CPZ7ZTnCZ6f-FLd4-QTE-BjUAkGp-tLv8",
      },
    };
    const response = await fetch(
      "https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n?market=ES",
      settings
    );
    const data = await response.json();

    setData(data);
  };
  return (
    <div className="App">
      <Song />
      <Player />
      <button
        onClick={() => {
          spotifyAuth();
          console.log({ data });
        }}
      >
        Click me
      </button>
    </div>
  );
}

export default App;
