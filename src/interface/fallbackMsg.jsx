import React from 'react';
import styled from 'styled-components';

const StyledFallbackMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-medium);
  letter-spacing: var(--letter-spacing-sm);
`;

function FallbackMessage({ children }) {
  return <StyledFallbackMessage>{children}</StyledFallbackMessage>;
}

export default FallbackMessage;
