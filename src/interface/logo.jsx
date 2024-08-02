import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const StyledLogo = styled(Link)`
  outline: none;
  border: 0.15rem solid var(--color-main-400);
  color: var(--color-main-400);
  background-color: var(--color-main-950);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  text-decoration: none;
  border-radius: calc(var(--border-rounded-xs) / 2);
  padding: calc(var(--padding-md) / 2) var(--padding-md);
  letter-spacing: var(--letter-spacing-xs);
  transition: all 0.35s ease;

  &:hover,
  &:active {
    color: var(--color-main-500);
    border-color: var(--color-main-500);
  }

  @media (min-width: 0px) and (max-width: 480px) {
    font-size: var(--font-size-md);
    font-weight: var(--font-weight-medium);
  }
`;

function Logo() {
  return <StyledLogo to='/'>Moviepire</StyledLogo>;
}

export default Logo;
