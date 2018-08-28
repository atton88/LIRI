require("dotenv").config();
var keys = require("./keys.js");

var request = require("request");
var Spotify = require("node-spotify-api");
var moment = require("moment");
var fs = require("fs");


var spotify = new Spotify(keys.spotify);

var inputArr = process.argv;

// Title
console.log("\n ██╗         ██╗    ██████╗     ██╗\n",
               "██║         ██║    ██╔══██╗    ██║\n",
               "██║         ██║    ██████╔╝    ██║\n",
               "██║         ██║    ██╔══██╗    ██║\n",
               "███████╗    ██║    ██║  ██║    ██║\n",
               "╚══════╝    ╚═╝    ╚═╝  ╚═╝    ╚═╝\n")

start(inputArr);
            
function start(arr) {
    // Concert-this argument, searches bandsintown for event details
    if (arr[2] === "concert-this") {
        concertThis(createString(arr));
    }

    // Spotify argument
    else if (arr[2] === "spotify-this-song") {
        if (arr[3]) {
            var track = createString(arr);
        } else {
            var track = "The Sign ace of base";
        }
    spotifyThis(track);
    }

    // Movie-this argument
    else if (arr[2] === "movie-this") {
        if (arr[3]) {
            var movie = createString(arr);       
        } else {
            var movie = "Mr. Nobody"; // Default case if no name in given
        }
    movieThis(movie);
    }

    // Do what it says argument
    else if (arr[2] === "do-what-it-says") {
        doThis();
    }

    else {
        console.log("Invalid argument")
    }
}

// removes first three arguments and creates string with the remaining
function createString (arr) {
     // Remove first 3 elements of arr
     arr.shift(); 
     arr.shift();
     arr.shift();
     return arr.join(" ");
}

// concert-this function gets event info
function concertThis (artist) {
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

// movie-this function gets movie info
function movieThis(movie) {
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

// do-whatever-it-says function does what is contained in random.txt
function doThis() {
    fs.readFile("random.txt", "utf8", function(err, data) {
        if (err) {
            console.log(err);
        } else {
            var dataArr = data.split(",");
            var arr = [0, 0, dataArr[0], dataArr[1]];
            // console.log(arr);
            start(arr);
            // spotifyThis(dataArr[1]);
        }
    })
}