// App.js

import './css/styles.css';
import React, { useState, useContext, useEffect } from 'react';
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
  Navigate  // Import Navigate
} from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/Signup';
import ResetPassword from './components/ResetPassword';
import PrivateRoute from './PrivateRoute';
import ContactUs from './components/ContactUs';
import TC from './components/TC';
import Privacy from './components/Privacy';
import { AuthContext } from './AuthProvider';

const App = () => {
  return (
    <Router>
      <MainApp />
    </Router>
  );
};

const MainApp = () => {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [gameStarted, setGameStarted] = useState(false);
  const [countdown, setCountdown] = useState(3); // Countdown state

  const { user } = useContext(AuthContext); // Get the user from AuthContext
  const location = useLocation(); // Get current location

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

  // Modify handleStartGame to accept playMode
  const handleStartGame = (playMode) => {
    // Ensure any previous game is stopped
    stopGame(); // Stop any ongoing game to prevent overlap

    setGameStarted(true); // Set game as started
    startCountdown(playMode); // Start countdown before flashing colors
  };

  // Modify startCountdown to accept playMode
  const startCountdown = (playMode) => {
    let count = 3;
    setCountdown(count); // Set initial countdown value

    const countdownInterval = setInterval(() => {
      count--;
      if (count === 0) {
        clearInterval(countdownInterval);
        setCountdown(null); // Reset countdown state
        setTimeout(() => {
          flashColors(selectedLevel, () => setGameStarted(false), playMode); // Pass playMode
        }, 0); // Wait for 0 milliseconds after countdown
      } else {
        setCountdown(count); // Update countdown value
      }
    }, 1000); // Update countdown every 1000 milliseconds (1 second)
  };

  const handleStopGame = () => {
    stopGame(); // Stop the game logic
    setGameStarted(false); // Reset game state to stopped
    setCountdown(3); // Reset countdown state
    document.body.style.backgroundColor = ''; // Reset background color
  };

  useEffect(() => {
    // Cleanup on component unmount or navigation change
    return () => {
      stopGame(); // Ensure game is stopped if the component unmounts
    };
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
