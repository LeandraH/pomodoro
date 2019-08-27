import React from 'react';
import PropTypes from 'prop-types';

const CancelButton = ({ resetTimer }) => (
  <button className="cancel-button" onClick={resetTimer}>Cancel</button>
);

export default CancelButton;

CancelButton.propTypes = {
  resetTimer: PropTypes.func.isRequired,
};
