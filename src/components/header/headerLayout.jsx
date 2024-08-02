import React from 'react';

import styled from 'styled-components';
import { Box } from '../../globalVariables';

import Menu from './menu';
import Logo from '../../interface/logo';
import SearchInput from './searchInput';
import Viewlist from './viewlist';
import Account from '../account/account';
import { useUser } from '../../hooks/useUser';

const StyledHeaderLayout = styled.header`
  --width: 100%;
  --height: 5.6rem;

  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  z-index: 100;
  width: var(--width);
  height: var(--height);
  background-color: var(--color-black-light);
`;

const VerticalBar = styled.div`
  height: 3.2rem;
  width: 0.2rem;
  background-color: var(--color-gray-dark);
`;

function HeaderLayout() {
  const { isAuthenticated } = useUser();

  return (
    <StyledHeaderLayout>
      <Box
        $alignItems='center'
        $justifyContent='space-between'
        $maxWidth='128rem'
        $maxHeight='5.6rem'
      >
        <Logo />
        <Menu />
        <SearchInput />
        {isAuthenticated ? (
          <>
            <Viewlist />
            <VerticalBar />
          </>
        ) : null}
        <Account />
      </Box>
    </StyledHeaderLayout>
  );
}

export default HeaderLayout;
