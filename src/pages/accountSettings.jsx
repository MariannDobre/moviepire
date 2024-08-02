import React, { useState } from 'react';

import styled from 'styled-components';
import { Box } from '../globalVariables';
import { FiUser, FiLock } from 'react-icons/fi';

import UpdateUserForm from '../auth/updateUserForm';
import UpdatePasswordForm from '../auth/updatePasswordForm';

const StyledAccountSettings = styled.div`
  --width: 128rem;
  --height: 64rem;
  --padding: calc(5.6rem + 2rem) 2rem 2rem 2rem;
  --margin: 0 0 4rem 0;

  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--width);
  height: var(--height);
  background-color: var(--color-black-light);
  padding: var(--padding);
  margin: var(--margin);
  border-radius: 0 0 calc(var(--border-rounded-xs) / 2)
    calc(var(--border-rounded-xs) / 2);
`;

const Main = styled.div`
  --width: 100%;
  --height: 100%;

  width: var(--width);
  height: var(--height);
  background-color: var(--color-black);
`;

const Sidebar = styled.div`
  --width: 100%;
  --max-width: 24rem;
  --height: 100%;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 2rem;
  width: var(--width);
  max-width: var(--max-width);
  height: var(--height);
  background-color: var(--color-black);
`;

const VerticalBar = styled.div`
  --width: 0.1rem;
  --height: 100%;

  width: var(--width);
  height: var(--height);
  background-color: var(--color-black-light);
`;

const SettingButton = styled.button`
  --width: 24rem;
  --height: 2.4rem;
  --font-size: 1.6rem;
  --font-size-svg: 2rem;
  --font-weight: 500;

  outline: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.8rem;
  width: var(--width);
  height: var(--height);
  font-size: var(--font-size);
  font-weight: var(--font-weight);
  letter-spacing: var(--letter-spacing-xs);
  word-spacing: var(--word-spacing-xs);
  color: var(--color-gray-light);
  background-color: transparent;
  cursor: pointer;

  svg {
    font-size: var(--font-size-svg);
  }
`;

function AccountSettings() {
  const [selectedSetting, setSelectedSetting] = useState('user-form');

  function handleUserForm() {
    setSelectedSetting('user-form');
  }

  function handlePasswordForm() {
    setSelectedSetting('password-form');
  }

  return (
    <StyledAccountSettings>
      <Box
        $gap='2rem'
        $width='100%'
        $maxWidth='128rem'
        $height='100%'
        $padding='2rem'
        $backgroundColor='var(--color-black)'
        style={{ borderRadius: `calc(var(--border-rounded-xs) / 2)` }}
      >
        <Sidebar>
          <SettingButton
            style={{ color: selectedSetting === 'user-form' ? 'white' : '' }}
            onClick={handleUserForm}
          >
            <FiUser
              style={{
                color:
                  selectedSetting === 'user-form'
                    ? 'var(--color-main-500)'
                    : '',
              }}
            />
            Account
          </SettingButton>

          <SettingButton
            style={{
              color: selectedSetting === 'password-form' ? 'white' : '',
            }}
            onClick={handlePasswordForm}
          >
            <FiLock
              style={{
                color:
                  selectedSetting === 'password-form'
                    ? 'var(--color-main-500)'
                    : '',
              }}
            />
            Password
          </SettingButton>
        </Sidebar>

        <VerticalBar />

        <Main>
          {selectedSetting === 'user-form' ? (
            <UpdateUserForm />
          ) : (
            <UpdatePasswordForm />
          )}
        </Main>
      </Box>
    </StyledAccountSettings>
  );
}

export default AccountSettings;
