import React from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledFilter = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

const FilterButton = styled.button`
  outline: none;
  border: none;
  background-color: transparent;
  font-size: var(--font-size-md);
  color: var(--color-gray);
  cursor: pointer;

  &:focus {
    outline: none;
    border: none;
  }
`;

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterBy = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          style={{ color: filterBy === option.value ? '#4f46e5' : '' }}
          onClick={() => handleClick(option.value)}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
