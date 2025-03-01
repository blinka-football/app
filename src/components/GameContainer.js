// GameContainer.js

import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Countdown from './Countdown'; 
import '../css/Countdown.css';

const GameContainer = ({ stopGame, countdown }) => {
  const handleStopGame = () => {
    stopGame();
  };

  // Scroll to the GameContainer when component is mounted
  useEffect(() => {
    const gameContainer = document.getElementById('game-container');
    if (gameContainer) {
      gameContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="game-container-wrapper" style={{ position: 'relative' }}>
      <div
        id="game-container" // Set the ID here
        className="game-container"
      >
        <div className="col-sm-12 top"></div>
        <div
          className="col-sm-12 middle"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: '40px',
            paddingBottom: '20px',
            color: '#000000',
          }}
        >
          {countdown !== null ? <Countdown countdown={countdown} /> : null}
        </div>
      </div>
      <div
        id="shape-container"
        className="shapes-container"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: '2',
        }}
      >
      </div>
      <Button
        className="stopBtn"
        variant="danger"
        onClick={handleStopGame}
        style={{
          position: 'absolute',
          bottom: '50px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: '3',
          maxWidth: '90%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span className="stop-btn-text">
          STOP GAME
        </span>
      </Button>
    </div>
  );
};

export default GameContainer;