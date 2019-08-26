import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import App from './App';

let div;
beforeEach(() => {
  div = document.createElement('div');
  document.body.appendChild(div);
});

afterEach(() => {
  unmountComponentAtNode(div);
  div.remove();
});

jest.useFakeTimers();

const clickStartTimer = () => {
  div
    .querySelector('.start-button')
    .dispatchEvent(new MouseEvent('click', { bubbles: true }));
};

const clickCancelTimer = () => {
  div
    .querySelector('.cancel-button')
    .dispatchEvent(new MouseEvent('click', { bubbles: true }));
};

const getTimerContent = () => div.querySelector('.show-time').textContent;

it('renders without crashing', () => {
  render(<App />, div);
});

it('starts the timer', () => {
  render(<App />, div);
  expect(getTimerContent()).toEqual('00:00');

  clickStartTimer();
  jest.advanceTimersByTime(3000);
  expect(getTimerContent()).toEqual('00:03');
});

it('starts, pauses, and restarts the timer', () => {
  render(<App />, div);
  expect(getTimerContent()).toEqual('00:00');

  clickStartTimer();
  jest.advanceTimersByTime(2000);
  expect(getTimerContent()).toEqual('00:02');

  clickStartTimer();
  jest.advanceTimersByTime(2000);
  expect(getTimerContent()).toEqual('00:02');

  clickStartTimer();
  jest.advanceTimersByTime(3000);
  expect(getTimerContent()).toEqual('00:05');
});

it('starts, pauses, cancels, and restarts the timer', () => {
  render(<App />, div);
  expect(getTimerContent()).toEqual('00:00');

  clickStartTimer();
  jest.advanceTimersByTime(1000);
  expect(getTimerContent()).toEqual('00:01');

  clickStartTimer();
  jest.advanceTimersByTime(3000);
  expect(getTimerContent()).toEqual('00:01');

  clickCancelTimer();
  expect(getTimerContent()).toEqual('00:00');
  jest.advanceTimersByTime(2000);
  expect(getTimerContent()).toEqual('00:00');

  clickStartTimer();
  jest.advanceTimersByTime(2000);
  expect(getTimerContent()).toEqual('00:02');
});

it('starts, cancels, and restarts the timer', () => {
  render(<App />, div);
  expect(getTimerContent()).toEqual('00:00');

  clickStartTimer();
  jest.advanceTimersByTime(2000);
  expect(getTimerContent()).toEqual('00:02');

  clickCancelTimer();
  expect(getTimerContent()).toEqual('00:00');
  jest.advanceTimersByTime(1000);
  expect(getTimerContent()).toEqual('00:00');

  clickStartTimer();
  jest.advanceTimersByTime(2000);
  expect(getTimerContent()).toEqual('00:02');
});