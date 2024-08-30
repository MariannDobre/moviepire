import React from 'react';

function Select({ options, value, onChange }) {
  return (
    <select
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option
          key={option.label}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
