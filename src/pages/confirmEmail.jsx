import React from 'react';
import { useUser } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { Box, Button, Title } from '../globalVariables';

const ConfirmEmailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 144rem;
  height: calc(100dvh - 5.6rem);
  margin: 0 auto;
`;

const NoteBody = styled.span`
  color: var(--color-white);
  font-size: var(--font-size-md);
  letter-spacing: var(--letter-spacing-xs);
  word-spacing: var(--word-spacing-xs);
  text-align: center;
  line-height: 1.4;
  width: 64rem;

  span {
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

function ConfirmEmail() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();

  return (
    <ConfirmEmailContainer
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
      {isAuthenticated ? (
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
            Email already verified
          </Title>

          <NoteBody>
            The email for the account name&nbsp;
            <span>"{user?.user_metadata?.username}"</span>&nbsp;is already
            verified
          </NoteBody>

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
      ) : (
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
            Email verification required
          </Title>

          <NoteBody>
            You can still navigate to the home page and use it for free, but
            without some features unlocked
          </NoteBody>

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
      )}
    </ConfirmEmailContainer>
  );
}

export default ConfirmEmail;
