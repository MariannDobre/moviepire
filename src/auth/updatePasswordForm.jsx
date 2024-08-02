import React, { useState } from 'react';
import { useUpdateUserPass } from '../hooks/useUpdatePass';

import styled from 'styled-components';
import { Box, Label, Input, Button } from '../globalVariables';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

import MiniLoader from '../components/loaders/miniLoader';

const UpdateDataContainer = styled.div`
  --width: 100%;
  --height: 100%;

  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: var(--width);
  height: var(--height);
  background-color: transparent;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const Div = styled.div`
  position: relative;

  button {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translate(-50%, -50%);
  }
`;

const ShowPasswordButton = styled.button`
  display: block;
  outline: none;
  border: none;
  background: transparent;
  cursor: pointer;
  /* pointer-events: none; */

  svg {
    font-size: var(--font-size-lg);
    color: var(--color-main-400);
  }

  &:focus {
    outline: none;
    border: none;
  }
`;

function UpdatePasswordForm() {
  const { updateUserPassFn, isPending } = useUpdateUserPass();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const passwordMatch = password === confirmPassword;
  const passwordLength = password.length < 6;

  function handleSubmit(e) {
    e.preventDefault();
    if (!password || !confirmPassword) return;

    if (passwordMatch) {
      updateUserPassFn(password);
      setFormSubmitted(true);
      setPassword('');
      setConfirmPassword('');
    } else {
      setFormSubmitted(true);
      setConfirmPassword('');
    }
  }

  function handleCancel(e) {
    e.preventDefault();

    setPassword('');
    setConfirmPassword('');
    setFormSubmitted(false);
  }

  return (
    <UpdateDataContainer
      style={{
        backdropFilter: 'blur(0.4rem)',
      }}
    >
      <Form onSubmit={handleSubmit}>
        <Box
          $direction='column'
          $gap='0.8rem'
        >
          <Label htmlFor='newPassword'>
            New Password&nbsp;
            <span style={{ color: '#999999' }}>(min 6 characters)</span>:
          </Label>

          <span
            style={{
              fontSize: '1.2rem',
              color: 'orangered',
              letterSpacing: '0.1rem',
            }}
          >
            {password.length > 1 && passwordLength
              ? 'The password should have at least 6 characters.'
              : null}
          </span>

          <Div>
            <Input
              type={showPassword ? 'text' : 'password'}
              id='newPassword'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isPending}
              minLength={6}
              maxLength={18}
              $inputCustomStyles={`
               width: 28rem;
               color: var(--color-gray);
               ${
                 password.length > 1 && passwordLength
                   ? 'border: 0.1rem solid var(--color-error-600); background-color: rgba(252, 165, 165, 0.35)'
                   : ''
               }
              `}
            />

            <ShowPasswordButton
              type='button'
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            >
              {showPassword ? (
                <BsEyeSlashFill
                  style={{
                    color: `${
                      password.length > 1 && passwordLength ? '#dc2626' : ''
                    }`,
                  }}
                />
              ) : (
                <BsEyeFill
                  style={{
                    color: `${
                      password.length > 1 && passwordLength ? '#dc2626' : ''
                    }`,
                  }}
                />
              )}
            </ShowPasswordButton>
          </Div>
        </Box>

        <Box
          $direction='column'
          $gap='0.8rem'
        >
          <Label htmlFor='confirmNewPassword'>Confirm Password:</Label>

          {!passwordMatch && formSubmitted && (
            <span
              style={{
                fontSize: '1.2rem',
                color: 'orangered',
                letterSpacing: '0.1rem',
              }}
            >
              Passwords should match.
            </span>
          )}

          <Input
            type={showPassword ? 'text' : 'password'}
            id='confirmNewPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isPending}
            minLength={6}
            maxLength={18}
            $inputCustomStyles={`
              width: 28rem;
              color: var(--color-gray);
             ${
               !passwordMatch && formSubmitted
                 ? 'border: 0.1rem solid var(--color-error-600); background-color: rgba(252, 165, 165, 0.35)'
                 : ''
             }
           `}
          />
        </Box>

        <Box
          $alignItems='center'
          $justifyContent='space-between'
        >
          <Button disabled={isPending}>
            {!isPending ? `Change` : <MiniLoader />}
          </Button>

          <Button
            type='reset'
            onClick={handleCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
        </Box>
      </Form>
    </UpdateDataContainer>
  );
}

export default UpdatePasswordForm;
