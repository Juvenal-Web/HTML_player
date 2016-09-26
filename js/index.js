/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Create(callback) {
  var timeCounter = 0;
  return { 
    checkCounter: function(p) { timeCounter = p; callback(timeCounter); }
  };
}

var currentTime = 0;
var playMode = false;
var songSelected = 0;

var id;

var currentDuration;

var helperQueue = Create(function(counter) {
  if (counter === 0) {
      songSelected++;
      swapCurrentSong(songSelected);
  }
});

function swapCurrentSong(index) {
    
    document.querySelector("#list_screen_container").className = "move_down";
    
    if(index < 0) {
        index = album.songList.length - 1;
    } 
    if(index > (album.songList.length - 1)) {
        index = 0;
    }
    
    document.querySelector("#current_tittle").textContent = album.songList[index].name;
    document.querySelector("#current_time").textContent = calculateMinutes(album.songList[index].duration);
    
    currentTime = currentDuration = album.songList[index].duration;
    songSelected = index;
}

function startTime() {
    currentTime--;
    console.log(currentTime);
    document.querySelector("#current_time").textContent = calculateMinutes(currentTime);
    
    helperQueue.checkCounter(currentTime);
    var percentage = (currentTime * 100) / currentDuration;
    drawProgress(percentage);
}



function drawProgress(al){
    
    var diff;
    var start = 4.72; //270º en radianes
    var ctx = document.getElementById('my_canvas').getContext('2d');
    var cWidth = ctx.canvas.width;
    var cHeigth = ctx.canvas.height; 

    diff = ((al / 100) * Math.PI*2);
    ctx.clearRect(0, 0, cWidth, cHeigth);
    ctx.lineWidth = 5;
    ctx.fillStyle = '#000'; 
    ctx.strokeStyle = "#37FDFC";
    ctx.shadowColor = '#FFF';
    ctx.shadowBlur = 5;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.beginPath();
    ctx.arc(250, 250, 240, start-diff, start, true); // el booleano es para saber si va a favor de reloj o en contra
    ctx.stroke();

    point((240 * Math.cos(start-diff)) + 250, (240 * Math.sin(start-diff)) + 250 , ctx);
}

function point(x, y, canvas){
    
    console.log(x + " - " + y);
    
    canvas.beginPath();
    canvas.arc(x, y, 5, 0, 2 * Math.PI, true);
    canvas.fill();
    canvas.stroke();
}

function playOrPause() {
    if(!playMode) {
            id = setInterval(startTime,1000);
            playMode = true;
            document.querySelector("#play").className = "icon_font paused";
        } else {
            document.querySelector("#play").className = "icon_font playing";
            clearInterval(id);
            playMode = false;
        }
}

window.addEventListener("load", function() {
    
    swapCurrentSong(songSelected);
      
    document.querySelector("#running_song_container").addEventListener("click", playOrPause);
    document.querySelector("#play").addEventListener("click", playOrPause);
    
    document.querySelector("#rewind").addEventListener("click", function() {
        songSelected--;
        swapCurrentSong(songSelected);
    });
    document.querySelector("#rewind_forward").addEventListener("click", function() {
        songSelected++;
        swapCurrentSong(songSelected);
    });
    
    document.querySelector("#swap_page_up").addEventListener("click", function(){
        document.querySelector("#list_screen_container").className = "move_up";
    });
    
    document.querySelector("#swap_page_down").addEventListener("click", function(){
        document.querySelector("#list_screen_container").className = "move_down";
    });
});