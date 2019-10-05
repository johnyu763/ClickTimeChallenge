var startButton = document.querySelector(".startWatch");
var pauseButton = document.querySelector(".pauseWatch");
var resetButton = document.querySelector(".resetWatch");
var historyTable = document.querySelector("table");
var tableSize = 0;
var timeDisplay = document.querySelector(".timer");
var startTime;
var currentTime;
var timeInterval;
var running = 0;
var paused = 0;
var newStart;
var startLatitude;
var startLongitude;
var newStop;
var stopLatitude;
var stopLongitude;
var elapsedTime;
var hours;
var minutes;
var seconds;
var centiseconds;

function startStopWatch() {
  if (!running) {
    startTime = new Date().getTime();
    var NewRow = historyTable.insertRow(tableSize + 1);
    tableSize++;
    newStart = NewRow.insertCell(0);
    startLatitude = NewRow.insertCell(1);
    startLongitude = NewRow.insertCell(2);
    newStop = NewRow.insertCell(3);
    stopLatitude = NewRow.insertCell(4);
    stopLongitude = NewRow.insertCell(5);
    elapsedTime = NewRow.insertCell(6);

    newStart.innerHTML = Date(startTime);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(startCoor);
    } else {
      startLatitude.innerHTML = "N/A";
      startLongitude.innerHTML = "N/A";
    }
    timeInterval = setInterval(getDisplayTime, 10);

    running = 1;
    paused = 0;
  }
}
function pauseStopWatch() {
  if (running && !paused) {
    currentTime = new Date().getTime();
    getFormattedTime();
    clearInterval(timeInterval);
    running = 0;
    paused = 1;
    newStop.innerHTML = Date(currentTime);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(stopCoor);
    } else {
      stopLatitude.innerHTML = "N/A";
      stopLongitude.innerHTML = "N/A";
    }
    elapsedTime.innerHTML =
      hours + ":" + minutes + ":" + seconds + ":" + centiseconds;
  }
}
function resetStopWatch() {
  while(tableSize){
    historyTable.deleteRow(1);
    tableSize--;
  }
  
}

function getDisplayTime() {
  currentTime = new Date().getTime();

  getFormattedTime();

  timeDisplay.innerHTML =
    hours + ":" + minutes + ":" + seconds + ":" + centiseconds;
}

function getFormattedTime() {
  var difference = currentTime - startTime;
  hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  seconds = Math.floor((difference % (1000 * 60)) / 1000);
  centiseconds = Math.floor((difference % 1000) / 10);
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  centiseconds = centiseconds < 10 ? "0" + centiseconds : centiseconds;
}

function startCoor(pos) {
  startLatitude.innerHTML = pos.coords.latitude.toFixed(2);
  startLongitude.innerHTML = pos.coords.longitude.toFixed(2);
}

function stopCoor(pos) {
  stopLatitude.innerHTML = pos.coords.latitude.toFixed(2);
  stopLongitude.innerHTML = pos.coords.longitude.toFixed(2);
}
