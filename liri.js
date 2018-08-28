require("dotenv").config();
var keys = require("./keys.js");

var request = require("request");
var Spotify = require("node-spotify-api");
var moment = require("moment");


var spotify = new Spotify(keys.spotify);

var inputArr = process.argv;

// Title
console.log(" ██╗         ██╗    ██████╗     ██╗\n",
            "██║         ██║    ██╔══██╗    ██║\n",
            "██║         ██║    ██████╔╝    ██║\n",
            "██║         ██║    ██╔══██╗    ██║\n",
            "███████╗    ██║    ██║  ██║    ██║\n",
            "╚══════╝    ╚═╝    ╚═╝  ╚═╝    ╚═╝\n")
                                  

// Concert-this argument, searches bandsintown for event details
if (inputArr[2] === "concert-this") {
    var artist = inputArr[3];
    var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    
    // API request
    request(URL, function(error, response, body){
        if (!error && response.statusCode === 200) { 

            var data = JSON.parse(body);
            // console.log(data)

            console.log("---------------------------------------\n");
            console.log("Event information for " + artist + "\n");
            console.log("---------------------------------------");

            // Prints out for every event
            for (var i = 0; i < data.length; i++) {
                console.log("Name of venue: " + data[i].venue.name);
                console.log("Location: " + data[i].venue.city);
                console.log("Date of Event: " + data[i].datetime); //moment needed
                console.log("---------------------------------------")
            }
        }
    })
}

// Spotify argument
else if (inputArr[2] === "spotify-this-song") {

    spotify.search({
        type: "track",
        query: createString(inputArr[3]),
        limit: 1
    })
    .then (function(response){
        var songData = response.tracks.items[0];
        // console.log(songData);
        
        console.log("Artist: " + songData.artists[0].name);
        console.log("Song Name: " + songData.name);
        console.log("Album: " + songData.album.name);
        console.log("Preview Link: " + songData.preview_url);
        }
    )


}

// Movie-this argument
else if (inputArr[2] === "movie-this") {
    if (inputArr[3]) {
        movie = createString(inputArr);       
    } else {
       var movie = "Mr. Nobody"; // Default case if no name in given
    }
    console.log("---------------------------------------\n");
    console.log("Movie information for " + movie + "\n");
    console.log("---------------------------------------");    
    var URL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie;
    console.log(URL);

    request(URL, function(error, response, body){
        if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);

            // Prints info for one movie
            console.log("Title: " + data.Title);
            console.log("Year: " + data.Year);
            console.log("IMDB Rating: " + data.imdbRating);
            console.log("Rotten Tomatoes Rating: " + data.Ratings[1].Value);
            console.log("Country: " + data.Country);
            console.log("Language: " + data.Language);
            console.log("Plot: " + data.Plot);
            console.log("Actors: " + data.Actors);
        }
    })
}

// Do what it says
else if (inputArr[2] === "do-what-it-says") {
}

else {
    console.log("Invalid argument")
}

function createString (arr) {
     // Remove first 3 elements of inputArr
     inputArr.shift(); 
     inputArr.shift();
     inputArr.shift();
     return inputArr.join(" ");
}