/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function calculateMinutes(duration) {
    var timeSong = Math.floor(duration/60);
    var sec = duration - (timeSong * 60) + "";
    
    if(sec.length === 1) {
        sec = "0" +sec; 
    }
    
    return timeSong + ":" + sec;
}
