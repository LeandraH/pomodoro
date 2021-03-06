import React from 'react';
import PropTypes from 'prop-types';

const StartButton = ({ startTimer, pauseTimer, isTimerRunning }) => (
  <button type="button" className="start-button" onClick={isTimerRunning ? pauseTimer : startTimer}>{isTimerRunning ? 'Pause' : 'Start'}</button>
);

export default StartButton;

StartButton.propTypes = {
  startTimer: PropTypes.func.isRequired,
  pauseTimer: PropTypes.func.isRequired,
  isTimerRunning: PropTypes.bool,
};

StartButton.defaultProps = {
  isTimerRunning: false,
};
