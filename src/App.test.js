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

const getMessageClass = () => div.querySelector('p').className;

it('renders without crashing', () => {
  render(<App />, div);
});

it('starts the timer', () => {
  render(<App />, div);
  expect(getTimerContent()).toEqual('25:00');

  clickStartTimer();
  jest.advanceTimersByTime(3000);
  expect(getTimerContent()).toEqual('24:57');
});

it('starts, pauses, and restarts the timer', () => {
  render(<App />, div);
  expect(getTimerContent()).toEqual('25:00');

  clickStartTimer();
  jest.advanceTimersByTime(2000);
  expect(getTimerContent()).toEqual('24:58');

  clickStartTimer();
  jest.advanceTimersByTime(2000);
  expect(getTimerContent()).toEqual('24:58');

  clickStartTimer();
  jest.advanceTimersByTime(3000);
  expect(getTimerContent()).toEqual('24:55');
});

it('starts, pauses, cancels, and restarts the timer', () => {
  render(<App />, div);
  expect(getTimerContent()).toEqual('25:00');

  clickStartTimer();
  jest.advanceTimersByTime(1000);
  expect(getTimerContent()).toEqual('24:59');

  clickStartTimer();
  jest.advanceTimersByTime(3000);
  expect(getTimerContent()).toEqual('24:59');

  clickCancelTimer();
  expect(getTimerContent()).toEqual('25:00');
  jest.advanceTimersByTime(2000);
  expect(getTimerContent()).toEqual('25:00');

  clickStartTimer();
  jest.advanceTimersByTime(2000);
  expect(getTimerContent()).toEqual('24:58');
});

it('starts, cancels, and restarts the timer', () => {
  render(<App />, div);
  expect(getTimerContent()).toEqual('25:00');

  clickStartTimer();
  jest.advanceTimersByTime(2000);
  expect(getTimerContent()).toEqual('24:58');

  clickCancelTimer();
  expect(getTimerContent()).toEqual('25:00');
  jest.advanceTimersByTime(1000);
  expect(getTimerContent()).toEqual('25:00');

  clickStartTimer();
  jest.advanceTimersByTime(2000);
  expect(getTimerContent()).toEqual('24:58');
});

it('switches between pomodoroes and breaks in the happy path', () => {
  render(<App />, div);
  clickStartTimer();
  expect(getMessageClass()).toEqual('pomodoro-message');
  jest.advanceTimersByTime(1500000);
  expect(getTimerContent()).toEqual('00:00');

  jest.advanceTimersByTime(1000);
  expect(getTimerContent()).toEqual('05:00');
  expect(getMessageClass()).toEqual('short-break-message');

  jest.advanceTimersByTime(300000);
  expect(getTimerContent()).toEqual('00:00');

  // second pomodoro begins
  jest.advanceTimersByTime(1000);
  expect(getTimerContent()).toEqual('25:00');
  expect(getMessageClass()).toEqual('pomodoro-message');

  // third pomodoro begins
  jest.advanceTimersByTime(1802000);
  expect(getTimerContent()).toEqual('25:00');
  expect(getMessageClass()).toEqual('pomodoro-message');

  // fourth pomodoro begins
  jest.advanceTimersByTime(1802000);
  expect(getTimerContent()).toEqual('25:00');
  expect(getMessageClass()).toEqual('pomodoro-message');

  jest.advanceTimersByTime(1501000);
  expect(getTimerContent()).toEqual('15:00');
  expect(getMessageClass()).toEqual('long-break-message');

  jest.advanceTimersByTime(900000);
  expect(getTimerContent()).toEqual('00:00');

  jest.advanceTimersByTime(1000);
  expect(getTimerContent()).toEqual('25:00');
  expect(getMessageClass()).toEqual('pomodoro-message');
});