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
      durationPomodoro: 1500,
      durationShortBreak: 300,
      durationLongBreak: 900,
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
    const { intervalId } = this.state;
    clearInterval(intervalId);
  }

  getMessage() {
    const { currentTimer } = this.state;
    if (currentTimer === 'pomodoro') {
      return <p className="pomodoro-message">You can do it!</p>;
    }
    if (currentTimer === 'shortBreak') {
      return <p className="short-break-message">Have a quick break! Maybe look out the window for a minute?</p>;
    }
    return <p className="long-break-message">Have a longer break! Maybe walk around a bit?</p>;
  }

  pauseTimer() {
    const { isTimerRunning, intervalId } = this.state;
    if (!isTimerRunning) {
      return;
    }
    this.setState({ isTimerRunning: false });
    clearInterval(intervalId);
  }

  resetTimer() {
    const { durationPomodoro, intervalId } = this.state;
    this.setState({
      isTimerRunning: false,
      time: durationPomodoro,
      currentTimer: 'pomodoro',
    });
    clearInterval(intervalId);
  }

  startTimer() {
    const { isTimerRunning, time } = this.state;
    if (isTimerRunning) {
      return;
    }
    this.setState({
      isTimerRunning: true,
      intervalId: setInterval(() => {
        if (time > 0) {
          this.setState({ time: time - 1 });
        } else {
          this.switchTimerType();
        }
      }, 1000),
    });
  }

  switchTimerType() {
    const {
      currentTimer,
      durationPomodoro,
      durationShortBreak,
      durationLongBreak,
      pomodoroesUntilLongBreak,
      pomodoroes,
    } = this.state;
    if (currentTimer === 'shortBreak' || currentTimer === 'longBreak') {
      this.setState({
        currentTimer: 'pomodoro',
        time: durationPomodoro,
      });
    } else if (pomodoroes < pomodoroesUntilLongBreak - 1) {
      this.setState({
        currentTimer: 'shortBreak',
        time: durationShortBreak,
        pomodoroes: pomodoroes + 1,
      });
    } else {
      this.setState({
        currentTimer: 'longBreak',
        time: durationLongBreak,
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
