import React from 'react';

const padZeroes = num => num < 10 ? `0${num}` : num;

const Timer = ({ time }) => (
  <div className="show-time">{ padZeroes((Math.floor(time / 60)) % 60) }:{ padZeroes(time % 60) }</div>
);

export default Timer;