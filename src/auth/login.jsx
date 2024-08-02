import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

import styled from 'styled-components';
import { Box, Input, Label, Title, Button } from '../globalVariables';

import MiniLoader from '../components/loaders/miniLoader';

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100dvh - 5.6rem);
  gap: 4.8rem;
  width: 120rem;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 48rem;
  padding: var(--padding-3xl) 0;
  background-color: rgba(26, 26, 26, 0.5);
  border: 0.15rem solid var(--color-main-950);
  box-shadow: 0 0 3.2rem 0.8rem rgba(30, 27, 75, 0.5);
`;

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginFn, isPending } = useLogin();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    loginFn(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      }
    );
  }

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <LoginContainer
      style={{
        background: `linear-gradient(
       90deg,
       rgba(0, 0, 0, 1),
       rgba(0, 0, 0, 0.875),
       rgba(0, 0, 0, 0.875),
       rgba(0, 0, 0, 1)
       ),url(loginBg.jpg) no-repeat center / cover`,
      }}
    >
      <Title
        $titleCustomStyles={`
        font-size: var(--font-size-3xl);
        letter-spacing: var(--letter-spacing-md);
      `}
      >
        Log into your account
      </Title>

      <LoginForm
        onSubmit={handleSubmit}
        style={{
          backdropFilter: 'blur(0.4rem)',
        }}
      >
        <Box
          $direction='column'
          $gap='0.8rem'
        >
          <Label htmlFor='loginEmail'>Email:</Label>
          <Input
            type='email'
            id='loginEmail'
            value={email}
            disabled={isPending}
            onChange={(e) => setEmail(e.target.value)}
            $inputCustomStyles={`
              width: 32rem;
              border-color: var(--color-gray-dark);
            `}
          />
        </Box>

        <Box
          $direction='column'
          $gap='0.8rem'
        >
          <Label htmlFor='loginPassword'>Password:</Label>
          <Input
            type='password'
            id='loginPassword'
            value={password}
            disabled={isPending}
            onChange={(e) => setPassword(e.target.value)}
            $inputCustomStyles={`
              width: 32rem;
              border-color: var(--color-gray-dark);
            `}
          />
        </Box>

        <Box
          $width='32rem'
          $alignItems='center'
          $justifyContent='space-between'
          style={{ marginTop: '1.6rem' }}
        >
          <Button disabled={isPending}>
            {!isPending ? 'Login' : <MiniLoader />}
          </Button>

          <Button onClick={handleGoBack}>Go Back</Button>
        </Box>
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;
