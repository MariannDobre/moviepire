import React from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';
import { motion } from 'framer-motion';

const MenuItem = styled(motion(Link))`
  text-decoration: none;
  color: var(--color-white);
  font-size: var(--font-size-md);
  letter-spacing: var(--letter-spacing-xs);
  word-spacing: var(--word-spacing-sm);
  padding: calc(var(--padding-xl) / 2) var(--padding-md);

  &:hover,
  &:active {
    background-color: var(--color-main-800);
  }
`;

function NotLoggedIn({ linksVariants }) {
  return (
    <>
      <MenuItem
        variants={linksVariants}
        to='/login'
      >
        Log into account
      </MenuItem>

      <MenuItem
        variants={linksVariants}
        to='/signup'
      >
        Create an account
      </MenuItem>
    </>
  );
}

export default NotLoggedIn;
