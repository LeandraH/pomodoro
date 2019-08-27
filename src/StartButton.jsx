import React from 'react';
import PropTypes from 'prop-types';

const StartButton = ({ startTimer, pauseTimer, isTimerRunning = false }) => (
  <button className="start-button" onClick={isTimerRunning ? pauseTimer : startTimer}>{isTimerRunning ? 'Pause' : 'Start'}</button>
);

export default StartButton;

StartButton.prototype = {
  startTimer: PropTypes.func.isRequired,
  pauseTimer: PropTypes.func.isRequired,
  isTimerRunning: PropTypes.bool,
};