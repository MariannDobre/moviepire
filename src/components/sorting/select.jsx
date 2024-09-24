import React from 'react';

function Select({ options, value, onChange }) {
  return (
    <select
      className='border-none outline-none p-1.5 text-base tracking-wide text-stone-400 rounded-md bg-transparent cursor-pointer hover:text-stone-200 hover:bg-stone-400/10'
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <option
          className='bg-black text-sm tracking-wide'
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
