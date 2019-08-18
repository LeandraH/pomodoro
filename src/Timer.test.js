import React from 'react';
import ReactDOM from 'react-dom';
import Timer from './Timer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Timer />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('shows correct times', () => {
  it('when there are 5 seconds left', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Timer time={5} />, div);
    expect(div.textContent).toEqual('00:05');
  });

  it('when there are 15 seconds left', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Timer time={15} />, div);
    expect(div.textContent).toEqual('00:15');
  });

  it('when there are 5 minutes left', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Timer time={300} />, div);
    expect(div.textContent).toEqual('05:00');
  });

  it('when there are 15 minutes left', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Timer time={900} />, div);
    expect(div.textContent).toEqual('15:00');
  });

  it('when there are 15 minutes and 12 seconds left', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Timer time={912} />, div);
    expect(div.textContent).toEqual('15:12');
  });

  it('when there are 5 hours left', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Timer time={18000} />, div);
    expect(div.textContent).toEqual('5:00:00');
  });

  it('when there are 4 hours, 59 minutes and 59 seconds left', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Timer time={17999} />, div);
    expect(div.textContent).toEqual('4:59:59');
  });
});
