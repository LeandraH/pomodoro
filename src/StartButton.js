import React from 'react';
import PropTypes from 'prop-types';

const StartButton = ({ startTimer, pauseTimer, timerRunning = false }) => (
  <button className="start-button" onClick={timerRunning ? pauseTimer : startTimer}>{timerRunning ? 'Pause' : 'Start'}</button>
);

export default StartButton;

StartButton.prototype = {
  startTimer: PropTypes.func.isRequired,
  pauseTimer: PropTypes.func.isRequired,
  timerRunning: PropTypes.bool,
};