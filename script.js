let startTime = 0;
let elapsedTime = 0;
let lapTimes = [];
let timerInterval;

const display = document.getElementById('display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapTimesDiv = document.getElementById('lap-times');

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', lapTimer);

function startTimer() {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000);
    startBtn.disabled = true;
    pauseBtn.disabled = false;
}

function pauseTimer() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    lapTimes = [];
    display.textContent = '00:00:00';
    lapTimesDiv.innerHTML = '';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function lapTimer() {
    const currentTime = new Date().getTime();
    const lapTime = (currentTime - startTime) / 1000;
    lapTimes.push(lapTime);
    const lapTimeHtml = `<p class="lap-time">Lap ${lapTimes.length}: ${formatTime(lapTime)}</p>`;
    lapTimesDiv.innerHTML += lapTimeHtml;
}

function updateTimer() {
    const currentTime = new Date().getTime();
    elapsedTime = currentTime - startTime;
    display.textContent = formatTime(elapsedTime / 1000);
}

function formatTime(time) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
}

function padZero(value) {
    return (value < 10 ? '0' : '') + value;
}