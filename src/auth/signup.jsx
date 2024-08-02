import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useSignup from '../hooks/useSignup';

import styled from 'styled-components';
import { Box, Input, Label, Title, Button } from '../globalVariables';

import MiniLoader from '../components/loaders/miniLoader';

const SignupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100dvh - 5.6rem);
  gap: 4.8rem;
  width: 120rem;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 48rem;
  padding: var(--padding-3xl) 0;
  background-color: rgba(26, 26, 26, 0.5);
  border: 0.15rem solid var(--color-main-950);
`;

function Signup() {
  const navigate = useNavigate();
  const { createUserFn, isPending } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ username, email, password }) {
    createUserFn(
      { username, email, password },
      {
        onSettled: reset(),
      }
    );
  }

  function handleCancel() {
    navigate(-1);
  }

  return (
    <SignupContainer
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
        Create an account
      </Title>

      <SignupForm
        style={{
          backdropFilter: 'blur(0.4rem)',
          border: `${
            errors?.username ||
            errors?.email ||
            errors?.password ||
            errors?.confirmPassword
              ? '0.15rem solid var(--color-error-600)'
              : ''
          }`,
          boxShadow: `${
            errors?.username ||
            errors?.email ||
            errors?.password ||
            errors?.confirmPassword
              ? '0 0 3.2rem 0.8rem rgba(220, 38, 38, 0.5)'
              : '0 0 3.2rem 0.8rem rgba(30, 27, 75, 0.5)'
          }`,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box
          $direction='column'
          $gap='0.8rem'
        >
          <Label htmlFor='username'>Username:</Label>
          {errors ? (
            <span style={{ color: 'orangered' }}>
              {errors?.username?.message}
            </span>
          ) : null}
          <Input
            type='text'
            id='username'
            disabled={isPending}
            $inputCustomStyles={`
              width: 32rem;
              ${
                errors?.username
                  ? 'border: 0.1rem solid var(--color-error-600); background-color: rgba(252, 165, 165, 0.35)'
                  : ''
              }
            `}
            {...register('username', {
              required: 'This field is required.',
              minLength: {
                value: 3,
                message: 'The username should have at least 3 characters.',
              },
              maxLength: {
                value: 13,
                message: 'The username should have at most 13 characters.',
              },
            })}
          />
        </Box>

        <Box
          $direction='column'
          $gap='0.8rem'
        >
          <Label htmlFor='email'>Email:</Label>
          {errors ? (
            <span style={{ color: 'orangered' }}>{errors?.email?.message}</span>
          ) : null}
          <Input
            type='email'
            id='email'
            disabled={isPending}
            $inputCustomStyles={`
              width: 32rem;
              ${
                errors?.email
                  ? 'border: 0.1rem solid var(--color-error-600); background-color: rgba(252, 165, 165, 0.35)'
                  : ''
              }
            `}
            {...register('email', {
              required: 'This field is required.',
              pattern: {
                value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                message: 'Please provide a valid email address.',
              },
            })}
          />
        </Box>

        <Box
          $direction='column'
          $gap='0.8rem'
        >
          <Label htmlFor='password'>
            Password&nbsp;
            <span style={{ color: '#d1d5db' }}>(min 6 characters)</span>:
          </Label>
          {errors ? (
            <span style={{ color: 'orangered' }}>
              {errors?.password?.message}
            </span>
          ) : null}
          <Input
            type='password'
            id='password'
            disabled={isPending}
            $inputCustomStyles={`
              width: 32rem;
              ${
                errors?.password
                  ? 'border: 0.1rem solid var(--color-error-600); background-color: rgba(252, 165, 165, 0.35)'
                  : ''
              }
            `}
            {...register('password', {
              required: 'This field is required.',
              minLength: {
                value: 6,
                message: 'The password should have at least 6 characters.',
              },
              maxLength: {
                value: 18,
                message: 'The password should have at most 18 characters.',
              },
            })}
          />
        </Box>

        <Box
          $direction='column'
          $gap='0.8rem'
        >
          <Label htmlFor='confirmPassword'>Confirm Password:</Label>
          {errors ? (
            <span style={{ color: 'orangered' }}>
              {errors?.confirmPassword?.message}
            </span>
          ) : null}
          <Input
            type='password'
            id='confirmPassword'
            disabled={isPending}
            $inputCustomStyles={`
              width: 32rem;
              ${
                errors?.confirmPassword
                  ? 'border: 0.1rem solid var(--color-error-600); background-color: rgba(252, 165, 165, 0.35)'
                  : ''
              }
            `}
            {...register('confirmPassword', {
              required: 'This field is required.',
              validate: (value) =>
                value === getValues().password || 'The passwords must match.',
            })}
          />
        </Box>

        <Box
          $width='32rem'
          $alignItems='center'
          $justifyContent='space-between'
          style={{ marginTop: '3rem' }}
        >
          <Button
            style={{
              color: `${
                errors?.username ||
                errors?.email ||
                errors?.password ||
                errors?.confirmPassword
                  ? 'var(--color-white)'
                  : ''
              }`,
              backgroundColor: `${
                errors?.username ||
                errors?.email ||
                errors?.password ||
                errors?.confirmPassword
                  ? 'var(--color-error-600)'
                  : ''
              }`,
              border: `${
                errors?.username ||
                errors?.email ||
                errors?.password ||
                errors?.confirmPassword
                  ? 'none'
                  : ''
              }`,
            }}
            disabled={isPending}
          >
            {!isPending ? `Sign Up` : <MiniLoader />}
          </Button>

          <Button
            style={{
              color: `${
                errors?.username ||
                errors?.email ||
                errors?.password ||
                errors?.confirmPassword
                  ? 'var(--color-white)'
                  : ''
              }`,
              backgroundColor: `${
                errors?.username ||
                errors?.email ||
                errors?.password ||
                errors?.confirmPassword
                  ? 'var(--color-error-600)'
                  : ''
              }`,
              border: `${
                errors?.username ||
                errors?.email ||
                errors?.password ||
                errors?.confirmPassword
                  ? 'none'
                  : ''
              }`,
            }}
            disabled={isPending}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Box>
      </SignupForm>
    </SignupContainer>
  );
}

export default Signup;
