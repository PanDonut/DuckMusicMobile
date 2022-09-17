import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from "axios";

window.songs = []
window.playlists = []
window.ready = false;

window.addEventListener("message", (event) => {
  if (event.data.password != undefined) {
      localStorage.setItem("mail", event.data.mail);
      localStorage.setItem("name", event.data.name);
      localStorage.setItem("uid", event.data.uid);
  } 
  if (event.data == "__KILLPROCESS") {
    window.location.pathname = "/";
    setTimeout(() => {
      window.location.reload(true);
    }, 100)
  }
});

window.User = {
  mail: localStorage.getItem("mail"),
  name: localStorage.getItem("name"),
  uid: localStorage.getItem("uid")
}

async function Load() {
  await axios.get("https://raw.githubusercontent.com/PanDonut/duckmusic/beta/src/data/index.json").then(res => {
      window.playlists = res.data
      localStorage.setItem("playlists", JSON.stringify(res.data))
      axios.get("https://raw.githubusercontent.com/PanDonut/duckmusic/beta/src/data/songs.json").then(res => {
        window.songs = res.data
        localStorage.setItem("songs", JSON.stringify(res.data))
        setTimeout(() => {
          LoadPlaylists();
        }, 1000)
      }); 
  }).catch(() => {
    window.playlists = JSON.parse(localStorage.getItem("playlists"))
    window.songs = JSON.parse(localStorage.getItem("songs"))
    setTimeout(() => {
      LoadPlaylists()
    }, 1000)
  })  
}

async function LoadPlaylists() {
  var albums = {}; 
  window.songs.filter(item => item.album != undefined && item.album != null && item.album != "").forEach(element => {
      if (albums[element.album] == null || albums[element.album] == undefined) {
      albums[element.album] = [];
      }
  albums[element.album].push(window.songs.indexOf(element));
  });
  await Object.keys(albums).forEach(key => {
      var ar = {
      "index": Math.random().toString(36).substring(2, 15) + key,
      "type": "album",
      "title": key,
      "link": key.replaceAll(" ",""),
          "ex": "no",
      "imgUrl": window.songs[albums[key][0]].songimg,
      "hoverColor": "rgb(22, 91, 51)",
      "artist": window.songs[albums[key][0]].songArtist.replaceAll(",", ", "),
      "playlistBg": "rgb(187, 37, 40)",
      "playlistData": []
    };
      albums[key].forEach(element => {
          ar.playlistData.push(
              {
                  "songindex": element
              }
          )
      });
      setTimeout(() => {
        window.playlists.unshift(ar);
        localStorage.setItem("playlists", JSON.stringify(window.playlists))
        window.forceUpdate()
        LoadListened();
      }, 1000)
  });
}
 
Load()

function LoadListened() {
axios.get("https://thundering-abyssinian-heart.glitch.me/rl").then(res => {
  window.RecentlyPlayed = [];
  res.data[window.User.uid].forEach((element, index) => {
    window.RecentlyPlayed.push(window.playlists.filter(item => item.title == element.name)[0]);
  })
  window.forceUpdate()
})
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
