// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes

const emojis = ['🦖', '🦕', '🐉', '🐲']; // Add your array of emojis here
const deathEmoji = '💀'; // Define a death emoji
function Dinosaur({ gameOver, isJumping, setIsJumping }) {
  const [bottom, setBottom] = useState(0);
  const [currentEmoji, setCurrentEmoji] = useState(emojis[0]); // Initialize with the first emoji

  const jump = useCallback(() => {
    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
      if (jumpHeight < 100) {
        jumpHeight += 10;
        setBottom(jumpHeight);
      } else {
        clearInterval(jumpInterval);
        fall();
      }
    }, 20);
  }, []);

  const fall = () => {
    let fallHeight = 100;
    const fallInterval = setInterval(() => {
      if (fallHeight > 0) {
        fallHeight -= 10;
        setBottom(fallHeight);
      } else {
        clearInterval(fallInterval);
        setIsJumping(false);
      }
    }, 20);
  };

  // Memoized function to get a random emoji that is different from the current one
  const getRandomEmoji = useCallback(() => {
    let newEmoji;
    do {
      newEmoji = emojis[Math.floor(Math.random() * emojis.length)];
    } while (newEmoji === currentEmoji);
    return newEmoji;
  }, [currentEmoji]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === ' ') {
        if (!isJumping && !gameOver) {
          // Prevent jumping if game is over
          setIsJumping(true);
          setCurrentEmoji(getRandomEmoji()); // Set a new emoji on jump
          jump();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isJumping, jump, getRandomEmoji, gameOver]); // Include gameOver in the dependency array

  useEffect(() => {
    if (gameOver) {
      setCurrentEmoji(deathEmoji); // Change to death emoji when game is over
    }
  }, [gameOver]); // Effect to handle game over state

  return (
    <div
      className="dinosaur"
      style={{
        bottom: `${bottom}px`,
        left: '50px',
      }}
    >
      {currentEmoji} {/* Use the current emoji state */}
    </div>
  );
}

// Define PropTypes for emoji
Dinosaur.propTypes = {
  gameOver: PropTypes.bool.isRequired, // gameOver must be a boolean and is required
  isJumping: PropTypes.bool.isRequired, // isJumping must be a boolean and is required
  setIsJumping: PropTypes.func.isRequired, // setIsJumping must be a function and is required
};

export default Dinosaur;
