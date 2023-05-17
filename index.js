"use strict";

// Initialize variables
let seconds = 0; // Total duration in seconds
let startTime = 0; // Start time in milliseconds
let timerInterval; // Interval ID for the timer
let timerDisplay = document.getElementById("timer"); // Timer display element

function setDuration(duration) {
  // Stop the timer if running
  stopTimer();

  // Set the new duration and update the display
  seconds = duration;
  displayTime();

  // Remove active class from all timer buttons
  let timerButtons = document.getElementsByClassName("timer-btn");
  for (let i = 0; i < timerButtons.length; i++) {
    timerButtons[i].classList.remove("active");
  }
  
  // Add active class to the clicked button
  event.target.classList.add("active");
}

function startTimer() {
  // Check if a valid duration is selected
  if (seconds <= 0) {
    alert("Please select a timer duration.");
    return;
  }

  // Play a sound when the timer starts
  let startSound = new Audio("media/sounds/button-sound.mp3");
  startSound.play();

  // Record the start time and start the timer interval
  startTime = new Date().getTime();
  timerInterval = setInterval(updateTimer, 250); // Set up a recurring interval to call the updateTimer function every 250 milliseconds
}

function stopTimer() {
  // Clear the timer interval and reset variables
  clearInterval(timerInterval);
  seconds = 0;
  startTime = 0;
  displayTime();
}

function updateTimer() {
  // Calculate the elapsed time and remaining seconds
  let currentTime = new Date().getTime();
  let elapsedTime = Math.floor((currentTime - startTime) / 1000);
  let remainingSeconds = seconds - elapsedTime;

  if (remainingSeconds <= 0) {
    // Timer has reached zero, play an alert sound and show a message
    clearInterval(timerInterval);
    let alertSound = new Audio("media/sounds/break.mp3");
    alertSound.play();
    alert("Time's up!");

    // Reset variables and display
    seconds = 0;
    startTime = 0;
    displayTime();
  } else {
    // Update the display with remaining time
    displayTime(remainingSeconds);
  }
}

function displayTime(remainingSeconds) {
  remainingSeconds = remainingSeconds || seconds;
  let minutes = Math.floor(remainingSeconds / 60);
  let secondsToShow = remainingSeconds % 60;

  // Format the time and update the display
  timerDisplay.innerHTML = 
    ("0" + minutes).slice(-2) + ":" + ("0" + secondsToShow).slice(-2);
}
