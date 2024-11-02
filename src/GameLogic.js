// GameLogic.js

import { Howl } from 'howler';
import beepSound from './media/beep.mp3'; // Import the beep sound file

let beepAudio = null; // Declare beepAudio globally

// Define the shape mapping for colors
const SHAPE_MAPPING = {
  '#64c823': 'diamond',
  '#FC4705': 'square',
  '#FFFF00': 'circle',
  '#7ed0ff': 'triangle'
};

const COLORS = Object.keys(SHAPE_MAPPING); // Array of color codes
const LEVEL_DURATIONS = [0.5, 1, 1.5, 2, 2.5, 3]; // Durations for each level
const NUM_FLASHES = 12; // Set number of flashes to 12

// Variables to hold game state
let gameInterval;
let timeout;
let isGameRunning = false;
let counter = 0;
let previousColor = null;

// Initialize the beep sound using Howler.js (Singleton pattern)
export function initializeBeepSound() {
  // Ensure only one instance of Howl is created
  if (!beepAudio) {
    beepAudio = new Howl({
      src: [beepSound], // Path to the beep sound
      volume: 1,        // Volume level (1 = 100%)
      loop: false,      // Ensure the sound doesn't loop
      onend: () => {    // Optional: Log or handle after sound ends
        console.log("Beep sound finished playing");
      }
    });
  }
}

// Function to start flashing colors
export function flashColors(level, endGameCallback, playMode = 'once') {
  const duration = LEVEL_DURATIONS[level - 1];

  // Initialize the beep sound when the game starts
  initializeBeepSound(); // Always ensure the beep sound is initialized

  // Reset game state before starting a new game
  counter = 0;
  previousColor = null;
  isGameRunning = true; // Set game as running

  // Clear any leftover background color from the previous game
  document.body.style.backgroundColor = ''; 

  // Cache the shape container element
  const shapeContainer = document.getElementById('shape-container');
  if (shapeContainer) {
    shapeContainer.innerHTML = ''; // Clear previous shape content
  }

  // Play beep sound and start color flashing immediately
  timeout = setTimeout(() => {
    if (!isGameRunning) return; // Check if game is still running before playing sound

    beepAudio.play(); // Play beep sound using Howler.js

    // Start flashing colors at intervals based on the level duration
    gameInterval = setInterval(() => {
      if (!isGameRunning) return; // Prevent further execution if game is stopped

      let color;
      do {
        color = COLORS[Math.floor(Math.random() * COLORS.length)];
      } while (color === previousColor); // Ensure a new color is selected

      // Set the background color and display shape
      document.body.style.backgroundColor = color;
      previousColor = color;

      // Display shape corresponding to the color
      const shape = SHAPE_MAPPING[color];
      if (shapeContainer) {
        shapeContainer.innerHTML = shape ? `<div class="shape ${shape}"></div>` : '';
      }

      counter++; // Increment counter after setting the color and shape

      if (counter >= NUM_FLASHES) {
        // Stop the game exactly after 12 flashes
        clearInterval(gameInterval); // Stop the interval
        gameInterval = null;
        isGameRunning = false; // Set game as not running

        // Wait for the level duration to complete, then add a 1-second delay
        setTimeout(() => {
          endGameCallback(playMode); // Call the endGameCallback function
        }, duration * 1000 + 1000); // Wait for level duration + 1 second
      }
    }, duration * 1000);
  }, 0);
}

// **Hardcoded Approach** to forcefully stop all game state and audio
export function stopGame() {
  // Stop the game interval and timeout
  if (gameInterval) {
    clearInterval(gameInterval);
    gameInterval = null;
  }
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }

  // Set game state to not running
  isGameRunning = false;

  // Reset game state variables
  counter = 0;
  previousColor = null;

  // **Forcibly stop the beep audio**
  if (beepAudio) {
    try {
      beepAudio.stop(); // Stop the beep sound using Howler.js
      beepAudio.unload(); // Completely unload and reset the Howler instance
      beepAudio = null; // Ensure the Howler instance is cleared
    } catch (error) {
      console.error("Error stopping the beep audio:", error);
    }
  }

  // Reset UI elements to the initial state
  document.body.style.backgroundColor = ''; // Reset the background color to default
  const shapeContainer = document.getElementById('shape-container');
  if (shapeContainer) {
    shapeContainer.innerHTML = ''; // Clear any shapes displayed in the game
  }

  console.log("Game and audio have been reset to their initial state.");
}
