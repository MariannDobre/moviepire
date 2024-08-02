import React from 'react';
import { Outlet } from 'react-router-dom';

import styled from 'styled-components';

import HeaderLayout from '../components/header/headerLayout';

const StyledAppLayout = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <HeaderLayout />
      <Outlet />
    </StyledAppLayout>
  );
}

export default AppLayout;
