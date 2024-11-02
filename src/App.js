import './css/styles.css';
import React, { useState, useContext, useEffect, useRef } from 'react';
import Home from './components/Home';
import Footer from './components/Footer';
import GameSelection from './components/GameSelection';
import GameContainer from './components/GameContainer';
import { flashColors, stopGame } from './GameLogic';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate
} from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/Signup';
import ResetPassword from './components/ResetPassword';
import PrivateRoute from './PrivateRoute';
import ContactUs from './components/ContactUs';
import TC from './components/TC';
import Privacy from './components/Privacy';
import { AuthContext } from './AuthProvider';
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  return (
    <Router>
      <MainApp />
      <Analytics />
    </Router>
  );
};

const MainApp = () => {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [countdown, setCountdown] = useState(3); // Countdown state
  const [playMode, setPlayMode] = useState('once'); // Play mode state
  const [isCountingDown, setIsCountingDown] = useState(false); // State for countdown phase
  const [isStopped, setIsStopped] = useState(false); // To control the repeat play loop

  const { user } = useContext(AuthContext); // Get the user from AuthContext
  const location = useLocation(); // Get current location

  // Refs to hold interval and timeout IDs for countdown
  const countdownIntervalRef = useRef(null);

  // Define public routes where Header and Footer should not be displayed
  const publicRoutes = [
    '/login',
    '/signup',
    '/reset-password',
    '/contactus',
    '/t&c',
    '/privacy'
  ];

  // Check if the current path is a public route
  const isPublicRoute = publicRoutes.includes(location.pathname);

  const handleSelectLevel = (event) => {
    setSelectedLevel(event.target.value);
  };

  const handleStartGame = (selectedPlayMode) => {
    setPlayMode(selectedPlayMode); // Set play mode ('once' or 'repeat')
    resetStates(); // Reset all states before starting a new game
    setIsStopped(false); // Ensure stop flag is reset
    setGameStarted(true); // Set game as started
    startCountdown(selectedPlayMode); // Start countdown before flashing colors
  };

  const startCountdown = (currentPlayMode) => {
    setIsCountingDown(true); // Enter countdown phase
    document.body.style.backgroundColor = 'black'; // Set background to black during countdown

    // Clear any shape in case it appears during countdown
    const shapeContainer = document.getElementById('shape-container');
    if (shapeContainer) {
      shapeContainer.innerHTML = '';
    }

    let count = 3;
    setCountdown(count); // Set initial countdown value

    // Start countdown interval
    countdownIntervalRef.current = setInterval(() => {
      count--;
      if (count === 0) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
        setCountdown(null); // Reset countdown state
        setIsCountingDown(false); // Exit countdown phase
        setTimeout(() => {
          flashColors(selectedLevel, (pm) => endGameCallback(pm), currentPlayMode); // Start game flashes
        }, 0); // Wait for 0 milliseconds after countdown
      } else {
        setCountdown(count); // Update countdown value
      }
    }, 1000); // Update countdown every 1000 milliseconds (1 second)
  };

  const endGameCallback = (currentPlayMode) => {
    if (currentPlayMode === 'once' || isStopped) {
      // Stop the game if in "Play Once" mode or if "Stop Game" was pressed
      stopGame();
      resetStates(); // Reset game states
    } else if (currentPlayMode === 'repeat' && !isStopped) {
      // Recursive restart for "Repeat Play" mode
      setTimeout(() => {
        startCountdown(currentPlayMode);
      }, 1000); // Wait 1 second before restarting
    }
  };

  const handleStopGame = () => {
    setIsStopped(true); // Signal to stop the repeat loop
    stopGame(); // Stop the game logic
    resetStates(); // Reset game states
  };

  const resetStates = () => {
    setGameStarted(false); // Reset game state to stopped
    setCountdown(3); // Reset countdown state
    setIsCountingDown(false); // Reset countdown phase
    document.body.style.backgroundColor = ''; // Reset background color

    // Clear countdown interval if it's active
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  };

  useEffect(() => {
    // Cleanup on component unmount or navigation change
    return () => {
      stopGame(); // Ensure game is stopped if the component unmounts
      resetStates(); // Reset all states
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {!isPublicRoute && user && <Home />}

      <Routes>
        {/* Redirect from '/' to '/signup' using index route */}
        <Route index element={<Navigate to="/signup" replace />} />

        {/* Public routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/t&c" element={<TC />} />
        <Route path="/privacy" element={<Privacy />} />

        {/* Protected routes */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              {!gameStarted ? (
                <GameSelection
                  onSelectLevel={handleSelectLevel}
                  onStartGame={handleStartGame}
                  disabled={!selectedLevel}
                  selectedLevel={selectedLevel}
                />
              ) : (
                <GameContainer stopGame={handleStopGame} countdown={countdown} />
              )}
            </PrivateRoute>
          }
        />
      </Routes>

      {!isPublicRoute && <Footer />}
    </>
  );
};

export default App;
