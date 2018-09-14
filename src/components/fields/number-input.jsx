import React from 'react';
import PropTypes from 'prop-types';

const NumberInput = ({ name, value, onChange, label }) => (
  <div className="grid-item">
    <label htmlFor={name}>
      {label}
      <input
        type="number"
        name={name}
        min="1"
        className="number-field"
        onChange={onChange}
        value={value}
      />
    </label>
  </div>
);

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

export default NumberInput;
