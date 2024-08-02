import React from 'react';
import styled from 'styled-components';

const StyledSelect = styled.select`
  outline: none;
  border: none;
  width: 18rem;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--letter-spacing-xs);
  word-spacing: var(--word-spacing-xs);
  padding: var(--padding-xs) var(--padding-md);
  color: var(--color-gray);
  background-color: var(--color-gray-dark);
  border-radius: calc(var(--border-rounded-xs) / 4);
  cursor: pointer;

  &:focus {
    outline: none;
    border: none;
  }
`;

const Option = styled.option`
  font-weight: var(--font-weight-medium);
`;

function Select({ options, value, onChange }) {
  return (
    <StyledSelect
      value={value}
      onChange={onChange}
    >
      {options.map((option) => (
        <Option
          key={option.label}
          value={option.value}
        >
          {option.label}
        </Option>
      ))}
    </StyledSelect>
  );
}

export default Select;
