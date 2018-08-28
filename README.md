# LIRI
Language Interpretation and Recognition Interface

<!-- Put a description of what the project is -->
Liri is like Siri, but in Node. It can find concert events, song info, and movie info.

concert-me [artist] - gives Artist event info
spotify-this-song [song name] - gives song info
movie-this [movie title] - gives movie info

# Link to deployed site
[Website](https://atton88.github.io/LIRI/)
[GitHub Profile](https://github.com/atton88/LIRI)

# Images
![About Me](CAPTURE.PNG)

# technology used
- Javascript
- Node.js
- NPM: dotenv, node-spotify-api, moment, request

# code snippets


Typical code for a request call. This is the Spotify request
```
// spotify-this-song function gets track info
function spotifyThis(track) {
    spotify.search({
        type: "track",
        query: track,
        limit: 1
    })
    .then (function(response){
        var songData = response.tracks.items[0];
        // console.log(songData);
        
        console.log("---------------------------------------\n");
        console.log("Song information for " + track + "\n");
        console.log("---------------------------------------");

        console.log("Artist: " + songData.artists[0].name);
        console.log("Song Name: " + songData.name);
        console.log("Album: " + songData.album.name);
        console.log("Preview Link: " + songData.preview_url);
        })
}


# Learning points
<!-- Learning points where you would write what you thought was helpful -->
- Learned to use node.js
- Learned to create requests and analyze the response using the request npm
- Learned to import files into js file

# Author 
<!-- make a link to the deployed site and have your name as the link -->
[Andrew Ton](https://github.com/atton88)

# License
Standard MIT License