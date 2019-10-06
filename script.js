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
var hours = 0;
var minutes = 0;
var seconds = 0;
var centiseconds = 0;

/**
 * Starts the timer when the start 
 * button is clicked, and writes
 * start time, latitude, and longitude
 * to history table
 */
function startStopWatch() {
  if (!running) {
    startTime = new Date().getTime();
    tableSize++;
    newRow = historyTable.insertRow(tableSize);
    
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
    saveToLocalStorage();
  }
}

/**
 * Stops the timer when the stop 
 * button is clicked, and writes
 * stop time, latitude, longitude,
 * and elapsed time to history table
 */
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
    saveToLocalStorage();
  }
}

/**
 * Empties history table
 * and resets timer and settings
 */
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
  localStorage.clear();
}

/**
 * Changes the time displayed on
 * timer, format is hr:min:sec:centisec
 */
function getDisplayTime() {
  currentTime = new Date().getTime();

  getFormattedTime();

  timeDisplay.innerHTML =
    hours + ":" + minutes + ":" + seconds + ":" + centiseconds;
}

/**
 * Gets the time elapsed for timer
 */
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

/**
 * Gets current coordinates
 * and puts them in the table
 */
function startCoor(pos) {
  startLatitude.innerHTML = pos.coords.latitude.toFixed(2);
  startLongitude.innerHTML = pos.coords.longitude.toFixed(2);
  saveToLocalStorage();
}

/**
 * Gets current coordinates
 * and puts them in the table
 */
function stopCoor(pos) {
  stopLatitude.innerHTML = pos.coords.latitude.toFixed(2);
  stopLongitude.innerHTML = pos.coords.longitude.toFixed(2);
  saveToLocalStorage();
}

/**
 * Loads stored values from
 * local storage for table
 * and timer
 */
function loadFromLocalStorage() {
  startTime = Number(localStorage.getItem("startTime"));
  historyTable.innerHTML = localStorage.historyTable;
  timeDisplay.innerHTML = localStorage.timeDisplay;
  running = Number(localStorage.getItem('running'));
  paused = Number(localStorage.getItem('paused'));
  tableSize = localStorage.tableSize;
  currentTime = new Date().getTime(); 
  
  newRow = historyTable.rows[tableSize];
  newStart = newRow.cells[0];
  startLatitude = newRow.cells[1];
  startLongitude = newRow.cells[2];  
  newStop = newRow.cells[3];
  stopLatitude = newRow.cells[4];
  stopLongitude = newRow.cells[5];
  elapsedTime = newRow.cells[6];
  
  if (running) {
    timeInterval = setInterval(getDisplayTime, 10);
  }
  else if(paused && timeInterval){
    clearInterval(timeInterval);
  }
}

/**
 * Saves values into
 * local storage for table
 * and timer
 */
function saveToLocalStorage() {
  localStorage.setItem("startTime", startTime);
  localStorage.running = running;
  localStorage.paused = paused;
  localStorage.tableSize = tableSize;
  localStorage.setItem("historyTable", historyTable.innerHTML);
  localStorage.setItem("timeDisplay", timeDisplay.innerHTML);
  localStorage.useStorage = 1;
}

//loads settings if they exist
if(localStorage.getItem("useStorage")) {
  loadFromLocalStorage();  
}
