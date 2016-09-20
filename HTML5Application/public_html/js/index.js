/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function Create(callback) {
  var timeCounter = 0;
  return { 
    checkCounter   : function(p) { timeCounter = p; callback(timeCounter); }
  };
}

var currentTime = 0;
var playMode = false;
var songSelected = 0;

var helperQueue = Create(function(counter) {
  if (counter === 0) {
      songSelected++;
      if(songSelected > (album.songList.length - 1)) {
        songSelected = 0;
      }
      swapCurrentSong(songSelected);
  }
});

function swapCurrentSong(index) {
    document.querySelector("#current_tittle").textContent = album.songList[index].name;
    document.querySelector("#current_time").textContent = calculateMinutes(album.songList[index].duration);
    
    currentTime = album.songList[index].duration;
}

function startTime() {
    currentTime--;
    console.log(currentTime);
    document.querySelector("#current_time").textContent = calculateMinutes(currentTime);
    
    helperQueue.checkCounter(currentTime);
}

window.addEventListener("load", function() {
    
    swapCurrentSong(songSelected);
    
    var id;
      
    document.querySelector("#player_container").addEventListener("click", function (){
        if(!playMode) {
            id = setInterval(startTime,1000);
            playMode = true;
        } else {
            clearInterval(id);
            playMode = false;
        }
    });
});
