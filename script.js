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
var newRow;
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
    newRow = historyTable.insertRow(tableSize + 1);
    tableSize++;
    newStart = newRow.insertCell(0);
    startLatitude = newRow.insertCell(1);
    startLongitude = newRow.insertCell(2);
    newStop = newRow.insertCell(3);
    stopLatitude = newRow.insertCell(4);
    stopLongitude = newRow.insertCell(5);
    elapsedTime = newRow.insertCell(6);
    newStart.innerHTML = Date(startTime);
    if ("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(startCoor);}
    else {
      startLatitude.innerHTML = "N/A";
      startLongitude.innerHTML = "N/A";
    }
    timeInterval = setInterval(getDisplayTime, 10);
    running = 1;
    paused = 0;
  }
  saveToLocalStorage();
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
  saveToLocalStorage();
}
function resetStopWatch() {
  while (tableSize) {
    historyTable.deleteRow(1);
    tableSize--;
  }
  if (running || paused) {
    clearInterval(timeInterval);
    timeDisplay.innerHTML = "00:00:00:00";
    running = 0;
    paused = 0;
  }
  saveToLocalStorage();
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

function loadFromLocalStorage() {
  if (storageAvailable("localStorage")) {
    startTime = Number(localStorage.getItem("startTime"));
    historyTable.innerHTML = historyTable;
    running = Number(localStorage.getItem('running'));
    paused = Number(localStorage.getItem('paused'));
    if (running) {
      timeInterval = setInterval(getDisplayTime, 10);
    }
  }
}

function saveToLocalStorage() {
  if (storageAvailable("localStorage")) {
    localStorage.setItem("startTime", startTime);
    localStorage.setItem("historyTable", historyTable);
    localStorage.running = running;
    localStorage.paused = paused;
    localStorage.useStorage = 1;
  }
}

if (
  storageAvailable("localStorage") &&
  Number(localStorage.getItem("useStorage"))
) {
  loadFromLocalStorage();
}
