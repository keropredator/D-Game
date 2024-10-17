// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import Cactus from './Cactus';
import Dinosaur from './Dinosaur';

function GameArea() {
  const [gameOver, setGameOver] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [cactusPosition, setCactusPosition] = useState(800); // Initial position of the cactus

  // Move the cactus
  useEffect(() => {
    const interval = setInterval(() => {
      setCactusPosition((prev) => {
        if (prev <= -50) {
          // Reset position when cactus goes off-screen
          return 800; // Reset to initial position (right side)
        }
        return prev - 5; // Move cactus to the left
      });
    }, 10); // Adjust speed as needed

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  useEffect(() => {
    if (!isJumping && cactusPosition < 100 && cactusPosition > 50)
      setGameOver(true);
  }, [cactusPosition]);

  return (
    <div className="game-area">
      <Dinosaur
        gameOver={gameOver}
        isJumping={isJumping}
        setIsJumping={setIsJumping}
      />{' '}
      {/* Pass gameOver state */}
      <Cactus bottom={0} left={cactusPosition} />
      {gameOver && <div className="game-over">Game Over!</div>}
    </div>
  );
}

export default GameArea;
