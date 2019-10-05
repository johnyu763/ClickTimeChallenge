var startButton = document.querySelector('.startWatch');
var pauseButton = document.querySelector('.pauseWatch');
var resetButton = document.querySelector('.resetWatch');
var historyTable = document.querySelector('table');
var startTime;
var running = 0;

function startStopWatch(){
  if(!running){
    startTime = new Date().getTime();
    running = 1;
  }
}
function pauseStopWatch(){
  
}
function resetStopWatch(){
  
}


