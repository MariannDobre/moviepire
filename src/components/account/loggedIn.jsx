import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useSignout } from '../../hooks/useSignout';

import styled from 'styled-components';

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

function LoggedIn({ linksVariants }) {
  const { signoutFn, isPending } = useSignout();

  return (
    <>
      <MenuItem
        variants={linksVariants}
        to='/activity'
      >
        Your activity
      </MenuItem>

      <MenuItem
        variants={linksVariants}
        to='/viewlist'
      >
        Your viewlist
      </MenuItem>

      <MenuItem
        variants={linksVariants}
        to='/settings'
      >
        Account settings
      </MenuItem>

      <MenuItem
        variants={linksVariants}
        onClick={() => signoutFn()}
      >
        {isPending ? 'Loading...' : 'Sign out'}
      </MenuItem>
    </>
  );
}

export default LoggedIn;
