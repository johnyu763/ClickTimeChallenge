var startButton = document.querySelector('.startWatch');
var pauseButton = document.querySelector('.pauseWatch');
var resetButton = document.querySelector('.resetWatch');
var historyTable = document.querySelector('table');
var startTime;
var currentTime;
var timeInterval;
var running = 0;
var paused = 0;

function startStopWatch(){
  if(!running){
    startTime = new Date().getTime();
    timeInterval = setTimeInterval(getDisplayTime, 1);
    
    running = 1;
    paused = 0;
  }
}
function pauseStopWatch(){
  
}
function resetStopWatch(){
  
}
function setTimeInterval(){
  currentTime = new Date().getTime();
  if()
}


