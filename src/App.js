import React, { useEffect, useState } from "react";
// Components
import Song from "./components/Song";
import Player from "./components/Player";
// Styles
import "./styles/app.scss";
import axios from "axios";
import { Credentials } from "./components/Credentials";
import { Buffer } from "buffer";

function App() {
  const spotify = Credentials();

  const [accessToken, setAccessToken] = useState("");
  const [UserData, setUserData] = useState("");
  // list of tracks
  const [tracks, setTracks] = useState({
    selectedTrack: "",
    listofTracksfromAPI: [],
  });
  const playlistID = "7y4HHIcfIFdjS9BlMX1dSe";
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
      });
  }, []);

  // useEffect(() => {
  //   if (accessToken) {
  //     console.log(accessToken);

  //     // axios.get("https://api.spotify.com/v1/me/playlists", {
  //     //     headers: {
  //     //       'Content-Type': "application/json",
  //     //       'Authorization': 'Bearer ' + accessToken
  //     //     },
  //     // }).then(result => {

  //     //     console.log(result.data)
  //     // })
  //     // .catch((error) => {
  //     //     console.log(error);
  //     // });
  //   }
  // }, [accessToken]);
  async function getData(token) {
    await fetch("https://api.spotify.com/v1/me/playlists", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error while fetching data", error);
      })
      .finally(() => {
        console.log("Fetching data finished");
      });
  }

  useEffect(() => {
    const my_data = getData(accessToken);
    setUserData(my_data);
  }, [accessToken]);
  // const spotifyAuth = async () => {
  //   console.log("TOKEN: " + accessToken);
  //   const settings = {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + accessToken,
  //     },
  //   };
  //   const response = await fetch(
  //     "https://api.spotify.com/v1/me/playlists",
  //     settings
  //   );
  //   const data = await response.json();
  //   console.log("Data: " + data);
  // };
  // axios.get("https://api.spotify.com/v1/me/playlists", {
  //     headers: {
  //       'Authorization': 'Bearer' + accessToken
  // ...      // }).then(result => {

  //     console.log(result.data)
  // })
  // .catch((error) => {
  //     console.log(error);
  // });

  //     //get playlist items
  // axios(`https://api.spotify.com/v1/playlists/${playlistID}/tracks?limit=10`, {
  //   method:'GET',
  //   headers: {
  //     'Authorization': 'Bearer' + accessToken
  //   }

  // }).then(tracksResponse => {
  //     setTracks({
  //       selectedTrack: tracks.selectedTrack,
  //       listofTracksfromAPI: tracksResponse.data.items
  //     })

  // });

  return (
    <div className="App">
      <Song />
      <Player />
    </div>
  );
}

export default App;
