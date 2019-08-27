import React, { Component } from 'react';
import Timer from './Timer';
import StartButton from './StartButton';
import CancelButton from './CancelButton';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      time: 1500,
      pomodoro: 1500,
      shortBreak: 300,
      longBreak: 900,
      isTimerRunning: false,
      intervalId: null,
      currentTimer: 'pomodoro', // other ones: shortBreak, longBreak
      pomodoroes: 0,
      pomodoroesUntilLongBreak: 4,
    };
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  getMessage() {
    if (this.state.currentTimer === 'pomodoro') {
      return <p className="pomodoro-message">You can do it!</p>;
    } else if (this.state.currentTimer === 'shortBreak') {
      return <p className="short-break-message">Have a quick break! Maybe look out the window for a minute?</p>;
    } else {
      return <p className="long-break-message">Have a longer break! Maybe walk around a bit?</p>;
    }
  }

  pauseTimer() {
    if (!this.state.isTimerRunning) {
      return;
    }
    this.setState({ isTimerRunning: false });
    clearInterval(this.state.intervalId);
  }

  resetTimer() {
    this.setState({
      isTimerRunning: false,
      time: this.state.pomodoro,
      currentTimer: 'pomodoro',
    });
    clearInterval(this.state.intervalId);
  }

  startTimer() {
    if (this.state.isTimerRunning) {
      return;
    }
    this.setState({
      isTimerRunning: true,
      intervalId: setInterval(() => {
        if (this.state.time > 0) {
          this.setState({ time: this.state.time - 1 });
        } else {
          this.switchTimerType();
        }
      }, 1000),
    });
  }

  switchTimerType() {
    if (this.state.currentTimer === 'shortBreak' || this.state.currentTimer === 'longBreak') {
      this.setState({
        currentTimer: 'pomodoro',
        time: this.state.pomodoro,
      });
    } else if (this.state.pomodoroes < this.state.pomodoroesUntilLongBreak - 1) {
      this.setState({
        currentTimer: 'shortBreak',
        time: this.state.shortBreak,
        pomodoroes: this.state.pomodoroes + 1,
      });
    } else {
      this.setState({
        currentTimer: 'longBreak',
        time: this.state.longBreak,
        pomodoroes: 0,
      });
    }
  }

  render() {
    return <div className="App">
      {this.getMessage()}
      <Timer time={this.state.time} />
      <div className="buttons">
        <StartButton startTimer={this.startTimer} pauseTimer={this.pauseTimer} isTimerRunning={this.state.isTimerRunning} />
        <CancelButton resetTimer={this.resetTimer} />
      </div>
    </div>;
  }
}

export default App;
