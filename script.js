// script.js
let stopwatch;
let isRunning = false;
let startTime;
let elapsedTime = 0;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lapList');

function startStopwatch() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        stopwatch = setInterval(updateDisplay, 10);
        isRunning = true;
        startButton.textContent = 'Pause';
    } else {
        clearInterval(stopwatch);
        isRunning = false;
        startButton.textContent = 'Resume';
    }
}

function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    minutesDisplay.textContent = formattedTime.minutes;
    secondsDisplay.textContent = formattedTime.seconds;
    millisecondsDisplay.textContent = formattedTime.milliseconds;
}

function formatTime(time) {
    const totalSeconds = Math.floor(time / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    const milliseconds = (time % 1000).toString().padStart(3, '0');
    return { minutes, seconds, milliseconds };
}

function resetStopwatch() {
    clearInterval(stopwatch);
    isRunning = false;
    elapsedTime = 0;
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    millisecondsDisplay.textContent = '000';
    startButton.textContent = 'Start';
    lapList.innerHTML = '';
}

function lap() {
    if (isRunning) {
        const currentTime = Date.now();
        const lapTime = currentTime - startTime;
        const formattedLapTime = formatTime(lapTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = `${formattedLapTime.minutes}:${formattedLapTime.seconds}.${formattedLapTime.milliseconds}`;
        lapList.appendChild(lapItem);
    }
}

startButton.addEventListener('click', startStopwatch);
pauseButton.addEventListener('click', startStopwatch);
resetButton.addEventListener('click', resetStopwatch);
lapButton.addEventListener('click', lap);
resetStopwatch();
