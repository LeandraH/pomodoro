import React from 'react';

const padZeroes = num => num < 10 ? `0${num}` : num;

const Timer = ({ time }) => (
  <div>{time > 3600 ? `${Math.floor(time / 3600)}:` : ''}{ padZeroes((Math.floor(time / 60)) % 60) }:{ padZeroes(time % 60) }</div>
);

export default Timer;