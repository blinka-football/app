import React, { useState, useEffect } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";

const GameSelection = ({ onSelectLevel, onStartGame, disabled, selectedLevel }) => {
  const [level, setLevel] = useState(selectedLevel); 

  useEffect(() => {
    const gameBody = document.querySelector('.game-body');
    
    const handleScroll = () => {
      const windowHeight = window.innerHeight; 
      const scrollPosition = window.pageYOffset || document.documentElement.scrollTop; 
      const gameBodyPosition = gameBody.getBoundingClientRect().top + scrollPosition; 

      if (scrollPosition > gameBodyPosition - windowHeight / 2) {
        gameBody.classList.add('underline'); 
      } else {
        gameBody.classList.remove('underline');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleStartGame = () => {
    onStartGame();
  };

  const handleSelectLevel = (event) => {
    setLevel(event.target.value);
    onSelectLevel(event);
  };

  return (
    <Container fluid>
      <Row className="justify-content-center align-items-center vh-100">
        <Col xs={12} md={6}>
          <div className="game-selection text-center">
            <h2 className="game-body">LET'S BEGIN</h2>
            <h3 className="game-description">SELECT A LEVEL BELOW</h3>
            <Form.Group
              controlId="levelSelect"
              id="level-selector"
              className="mb-3 d-flex justify-content-center"
            >
              <Form.Select
                value={level} // Set value of select to selectedLevel
                onChange={handleSelectLevel}
                className="custom-select"
                style={{ marginLeft: "0px" }}
              >
                <option value="">Select a level</option>
                <option value="6">Level 1</option>
                <option value="5">Level 2</option>
                <option value="4">Level 3</option>
                <option value="3">Level 4</option>
                <option value="2">Level 5</option>
                <option value="1">Level AI</option>
              </Form.Select>
            </Form.Group>
            <Button
              className="startBtn"
              variant="primary"
              disabled={disabled || !level} 
              onClick={handleStartGame}
            >
              <span className="start-btn-text">START GAME</span>
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default GameSelection;
