var SONG_CLASSES = {
    containerSongClass: "containerSong",
    tittleClass: "appfont",
    artistClass: "artistname",
    timeClass: "timesong"
}

function calculateMinutes(duration) {
    var timeSong = duration/60;
    var sec = ((timeSong - timeSong.toFixed(0)) * 100).toFixed(0);
    if(sec < 0) {
        sec = (sec * -1) + "";
    }
    if(sec.length === 1) {
        sec = "0" +sec; 
    }
    
    return timeSong.toFixed(0) + ":" + sec;
}

function createSkeletoonSong(i) { 
    
    var spanTittleSong = document.createElement("span");
    spanTittleSong.classList.add(SONG_CLASSES.tittleClass);
    spanTittleSong.textContent = album.songList[i].name;
    
    var spanArtistSong = document.createElement("span");
    spanArtistSong.classList.add("small");
    spanArtistSong.classList.add(SONG_CLASSES.artistClass);
    spanArtistSong.textContent = album.songList[i].interpreter;
    
    var spanTimeSong = document.createElement("time");
    spanTimeSong.classList.add(SONG_CLASSES.timeClass);
    spanTimeSong.textContent = calculateMinutes(album.songList[i].duration);
    
    var customDiv = document.createElement("div");
    customDiv.classList.add(SONG_CLASSES.containerSongClass);
    
    customDiv.appendChild(spanTittleSong);
    customDiv.appendChild(spanArtistSong);
    customDiv.appendChild(spanTimeSong);
    
    return customDiv;
   
}

function swapCurrentSong(index) {
    document.querySelector("#current_tittle").textContent = album.songList[index].name;
    document.querySelector("#current_time").textContent = calculateMinutes(album.songList[index].duration);
}

function addSongs() {
    for (var i = 0; i < album.songList.length; i++) {
        var b = createSkeletoonSong(i);
        
        (function(a) { b.addEventListener("click", function() {
            swapCurrentSong(a);
        });
        })(i);
        
        document.querySelector("#list_screen_container").appendChild(b);
    }
}

window.addEventListener("load", function() {
    addSongs();
});