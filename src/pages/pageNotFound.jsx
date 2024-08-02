import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, Title } from '../globalVariables';

import styled from 'styled-components';

const PageNotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-white);
  height: calc(100dvh - 5.6rem);
  width: 144rem;
`;

const ErrorBody = styled.p`
  color: var(--color-white);
  font-size: var(--font-size-md);
  letter-spacing: var(--letter-spacing-xs);
  word-spacing: var(--word-spacing-xs);

  code {
    color: var(--color-gray);
    font-weight: var(--font-weigt-medium);
  }
`;

const AdditionInfo = styled.p`
  color: var(--color-gray);
  font-size: var(--font-size-base);
  letter-spacing: var(--letter-spacing-xs);
  word-spacing: var(--word-spacing-xs);
`;

function PageNotFound() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <PageNotFoundContainer
      style={{
        background: `linear-gradient(
     90deg,
     rgba(0, 0, 0, 1),
     rgba(0, 0, 0, 0.875),
     rgba(0, 0, 0, 0.875),
     rgba(0, 0, 0, 1)
     ),url(https://www.themoviedb.org/t/p/original/7Pv3ocLAj1BfcdUUsslMYyDMYXK.jpg) no-repeat center / cover`,
      }}
    >
      <Box
        $direction='column'
        $alignItems='center'
        $justifyContent='center'
        $gap='1.4rem'
      >
        <Title
          $titleCustomStyles={`
            color: var(--color-main-600);
            font-size: var(--font-size-3xl);
            letter-spacing: var(--letter-spacing-md);
        `}
        >
          Something went wrong
        </Title>

        <ErrorBody>
          The current URL path that you just tried:&nbsp;
          <code>"{location.pathname}"</code>&nbsp;doesn't exist
        </ErrorBody>

        <AdditionInfo>
          The button below will redirect you to the home page
        </AdditionInfo>

        <Button
          $buttonCustomStyles={`
            margin-top: var(--margin-xl);
            width: 14rem;
            padding: calc(var(--padding-md) / 2) 0;
            word-spacing: var(--word-spacing-xl);
        `}
          onClick={() => navigate('/')}
        >
          Home Page
        </Button>
      </Box>
    </PageNotFoundContainer>
  );
}

export default PageNotFound;
