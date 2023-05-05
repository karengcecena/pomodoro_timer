"use strict";

let seconds = 0;
let startTime = 0;
let timerInterval;
let timerDisplay = document.getElementById("timer");

function setDuration(duration) {
  stopTimer();
  seconds = duration;
  displayTime();

  // remove active class from all timer buttons
  let timerButtons = document.getElementsByClassName("timer-btn");
  for (let i = 0; i < timerButtons.length; i++) {
    timerButtons[i].classList.remove("active");
  }
  // add active class to clicked button
  event.target.classList.add("active");
}

function startTimer() {
  if (seconds <= 0) {
    alert("Please select a timer duration.");
    return;
  }
  let startSound = new Audio("media/sounds/button-sound.mp3");
  startSound.play();
  startTime = new Date().getTime();
  timerInterval = setInterval(updateTimer, 250);
}

function stopTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  startTime = 0;
  displayTime();
}

function updateTimer() {
  let currentTime = new Date().getTime();
  let elapsedTime = Math.floor((currentTime - startTime) / 1000);
  let remainingSeconds = seconds - elapsedTime;

  if (remainingSeconds <= 0) {
    clearInterval(timerInterval);
    let alertSound = new Audio("media/sounds/break.mp3");
    alertSound.play();
    alert("Time's up!");
    seconds = 0;
    startTime = 0;
    displayTime();
  } else {
    displayTime(remainingSeconds);
  }
}

function displayTime(remainingSeconds) {
  remainingSeconds = remainingSeconds || seconds;
  let minutes = Math.floor(remainingSeconds / 60);
  let secondsToShow = remainingSeconds % 60;
  timerDisplay.innerHTML = 
    ("0" + minutes).slice(-2) + ":" + ("0" + secondsToShow).slice(-2);
}
