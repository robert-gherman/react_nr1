import React, { useEffect, useState } from "react";
// Components
import Song from "./components/Song";
import Player from "./components/Player";
// Styles
import "./styles/app.scss";
import { Credentials } from "./components/Credentials";
import axios from "axios";
import { Buffer } from "buffer";
function App() {
  const spotify = Credentials();

  const [accessToken, setAccessToken] = useState("");
  const [data, setData] = useState();
  const [tracks, setTracks] = useState();
  useEffect(() => {
    //api access token
    axios
      .post(
        "https://accounts.spotify.com/api/token",
        new URLSearchParams({
          grant_type: "client_credentials",
          code: "AQBxWnU0SB...l_jU",
          redirect_uri: "https://example.com/callback",
        }).toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              new Buffer(
                spotify.ClientId + ":" + spotify.ClientSecret
              ).toString("base64"),
          },
        }
      )
      .then(function (response) {
        setAccessToken(response.data.access_token);
        //console.log(response.data.access_token);
        //  console.log(accessToken);
        axios(
          "https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n?market=ES",
          {
            method: "GET",

            headers: {
              Authorization: "Bearer " + accessToken,
            },
          }
        ).then((tracksResponse) => {
          setTracks(tracksResponse.data);
          console.log(tracksResponse.data);
        });
      });

    //get playlist
    // const spotifyAuth = async () => {
    //   const settings = {
    //     method: "GET",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + accessToken,
    //     },
    //   };
    //   const response = await fetch(
    //     "https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n?market=ES",
    //     settings
    //   );
    //   const result = await response.json().then();
    //   setData(data);
    //   console.log(data);
    // };

    // // call function
    // spotifyAuth();
  }, []);

  return (
    <div className="App">
      <Song />
      <Player />
      <button>Click me</button>
    </div>
  );
}

export default App;
