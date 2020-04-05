import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import App from '../App';
import StartButton from '../StartButton';
import CancelButton from '../CancelButton';
import Timer from '../Timer';

storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('StartButton', () => <StartButton />)
  .add('PauseButton', () => <StartButton isTimerRunning />)
  .add('CancelButton', () => <CancelButton />);

storiesOf('App', module)
  .add('default', () => <App />);

storiesOf('Timer', module)
  .add('at 0', () => <Timer time={0} />);
