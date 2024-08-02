import React from 'react';

import styled, { keyframes } from 'styled-components';
import { ImSpinner11 } from 'react-icons/im';

const SpinnerAnimation = keyframes`
0% {
  transform: rotate(0deg);
}
100% {
  transform :rotate(360deg);
}
`;

const FullPageLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100dvh;
  background-color: var(--color-black-light);

  svg {
    font-size: var(--font-size-3xl);
    color: var(--color-main-600);
    animation: ${SpinnerAnimation} 2s linear infinite;
  }
`;

function Loader() {
  return (
    <FullPageLoader>
      <ImSpinner11 />
    </FullPageLoader>
  );
}

export default Loader;
