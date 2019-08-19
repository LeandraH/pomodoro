import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import StartButton from './StartButton';

let div;
beforeEach(() => {
  div = document.createElement('div');
  document.body.appendChild(div);
});

afterEach(() => {
  unmountComponentAtNode(div);
  div.remove();
});

it('renders without crashing', () => {
  render(<StartButton />, div);
});

it('shows the correct text when the timer is not running', () => {
  render(<StartButton timerRunning={false} />, div);
  expect(div.textContent).toEqual('Start');
});

it('shows the correct text when the timer is not running', () => {
  render(<StartButton timerRunning={true} />, div);
  expect(div.textContent).toEqual('Pause');
});

it('calls the correct funtion when clicked while the timer is not running', () => {
  const startTimer = jest.fn();
  const pauseTimer = jest.fn();
  render(<StartButton startTimer={startTimer} pauseTimer={pauseTimer} timerRunning={false} />, div);
  document.querySelector('.start-button').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  expect(startTimer).toHaveBeenCalled();
  expect(pauseTimer).not.toHaveBeenCalled();
});

it('calls the correct funtion when clicked while the timer is running', () => {
  const startTimer = jest.fn();
  const pauseTimer = jest.fn();
  render(<StartButton startTimer={startTimer} pauseTimer={pauseTimer} timerRunning={true} />, div);
  document.querySelector('.start-button').dispatchEvent(new MouseEvent("click", { bubbles: true }));
  expect(startTimer).not.toHaveBeenCalled();
  expect(pauseTimer).toHaveBeenCalled();
});