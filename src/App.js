import React from 'react';
import Timer from './Timer';
import StartButton from './StartButton';
import CancelButton from './CancelButton';
import './App.css';

const App = () => (
  <div className="App">
    <Timer time={23400} />
    <div className="buttons">
      <StartButton />
      <CancelButton />
    </div>
  </div>
);

export default App;
