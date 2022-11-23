import React, {useEffect, useState} from "react";
// Components
import Song from "./components/Song";
import Player from './components/Player';
// Styles
import "./styles/app.scss";
import axios from 'axios';
import {Credentials} from './components/Credentials';
import { Buffer } from 'buffer';
 


function App() {
  const spotify = Credentials();
  
  const [accessToken, setAccessToken] = useState("");
  
  // list of tracks
  const [tracks, setTracks] = useState({selectedTrack: '', listofTracksfromAPI : []});
  const playlistID = '7y4HHIcfIFdjS9BlMX1dSe'; 
  useEffect(() => {
    //api access token
    axios.post(  
      'https://accounts.spotify.com/api/token',  
        new URLSearchParams({  
          grant_type: "client_credentials",  
          code:   'AQBxWnU0SB...l_jU',  
          redirect_uri: 'https://example.com/callback'  
        }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + (new Buffer(spotify.ClientId + ':' + spotify.ClientSecret).toString('base64'))
          },
        }
      ).then(function (response) {
        setAccessToken(response.data.access_token );
       console.log(response.data.access_token);
        });
      },[])
      
        // axios.get("https://api.spotify.com/v1/me/playlists", {
        //     headers: {
        //       'Authorization': 'Bearer' + accessToken
        //     },
        // }).then(result => {
            
        //     console.log(result.data)
        // })
        // .catch((error) => {
        //     console.log(error);
        // });

      
      
  //     //get playlist items
      axios(`https://api.spotify.com/v1/playlists/${playlistID}/tracks?limit=10`, {
        method:'GET',
        headers: {
          'Authorization': 'Bearer' + accessToken
        }

      }).then(tracksResponse => {
          setTracks({
            selectedTrack: tracks.selectedTrack,
            listofTracksfromAPI: tracksResponse.data.items
          })
          console.log(tracks);
      });
  

    
  
  return (
    <div className="App">
      <Song />
      <Player />
    </div>
    
  );
}

export default App;
