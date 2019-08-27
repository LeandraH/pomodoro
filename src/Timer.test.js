import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import Timer from './Timer';

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
  render(<Timer time={0} />, div);
});

describe('shows correct times', () => {
  it('when there are 0 seconds left', () => {
    render(<Timer time={0} />, div);
    expect(div.textContent).toEqual('00:00');
  });

  it('when there are 5 seconds left', () => {
    render(<Timer time={5} />, div);
    expect(div.textContent).toEqual('00:05');
  });

  it('when there are 15 seconds left', () => {
    render(<Timer time={15} />, div);
    expect(div.textContent).toEqual('00:15');
  });

  it('when there are 5 minutes left', () => {
    render(<Timer time={300} />, div);
    expect(div.textContent).toEqual('05:00');
  });

  it('when there are 15 minutes left', () => {
    render(<Timer time={900} />, div);
    expect(div.textContent).toEqual('15:00');
  });

  it('when there are 15 minutes and 12 seconds left', () => {
    render(<Timer time={912} />, div);
    expect(div.textContent).toEqual('15:12');
  });
});
