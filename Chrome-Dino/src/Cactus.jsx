// eslint-disable-next-line no-unused-vars
import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import './App.css';

function Cactus({ bottom, left }) {
  return (
    <div
      className="cactus"
      style={{
        position: 'absolute',
        bottom: `${bottom}px`,
        left: `${left}px`, // Add left positioning
      }}
    >
      🌵
    </div>
  );
}

Cactus.propTypes = {
  bottom: PropTypes.number.isRequired, // bottom should be a number and is required
  left: PropTypes.number.isRequired, // left should be a number and is required
};

export default Cactus;
