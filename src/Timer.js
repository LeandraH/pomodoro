import React from 'react';
import PropTypes from 'prop-types';

const padZeroes = (num) => (num < 10 ? `0${num}` : num);

const Timer = ({ time }) => {
  const paddedMinutes = padZeroes((Math.floor(time / 60)) % 60);
  const paddedSeconds = padZeroes(time % 60);
  return (
    <div className="show-time">
      {/* eslint-disable-next-line react/jsx-one-expression-per-line */}
      { paddedMinutes }:{ paddedSeconds }
    </div>
  );
};

export default Timer;

Timer.propTypes = {
  time: PropTypes.number.isRequired,
};
