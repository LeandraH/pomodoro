import React from 'react';

const CancelButton = ({ resetTimer }) => (
  <button className="cancel-button" onClick={resetTimer}>Cancel</button>
);

export default CancelButton;