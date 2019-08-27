import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import StartButton from './StartButton';

let div;
let startTimer;
let pauseTimer;
beforeEach(() => {
  div = document.createElement('div');
  document.body.appendChild(div);
  startTimer = jest.fn();
  pauseTimer = jest.fn();
});

afterEach(() => {
  unmountComponentAtNode(div);
  div.remove();
});

it('renders without crashing', () => {
  render(<StartButton startTimer={startTimer} pauseTimer={pauseTimer} />, div);
});

it('shows the correct text when the timer is not running', () => {
  render(<StartButton startTimer={startTimer} pauseTimer={pauseTimer} isTimerRunning={false} />, div);
  expect(div.textContent).toEqual('Start');
});

it('shows the correct text when the timer is not running', () => {
  render(<StartButton startTimer={startTimer} pauseTimer={pauseTimer} isTimerRunning />, div);
  expect(div.textContent).toEqual('Pause');
});

it('calls the correct funtion when clicked while the timer is not running', () => {
  render(<StartButton
    startTimer={startTimer}
    pauseTimer={pauseTimer}
    isTimerRunning={false}
  />, div);
  document.querySelector('.start-button').dispatchEvent(new MouseEvent('click', { bubbles: true }));
  expect(startTimer).toHaveBeenCalled();
  expect(pauseTimer).not.toHaveBeenCalled();
});

it('calls the correct funtion when clicked while the timer is running', () => {
  render(<StartButton startTimer={startTimer} pauseTimer={pauseTimer} isTimerRunning />, div);
  document.querySelector('.start-button').dispatchEvent(new MouseEvent('click', { bubbles: true }));
  expect(startTimer).not.toHaveBeenCalled();
  expect(pauseTimer).toHaveBeenCalled();
});
