import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '../hooks/useUser';
import { useUpdateUser } from '../hooks/useUpdateData';

import styled from 'styled-components';
import { Box } from '../globalVariables';
import { FaUser } from 'react-icons/fa6';

import MiniLoader from '../components/loaders/miniLoader';

const StyledUpdateUserForm = styled.div`
  --width: 100%;
  --height: 100%;

  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  width: var(--width);
  height: var(--height);
  background-color: transparent;
`;

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 8rem;
  height: 8rem;
  background-color: var(--color-black-light);
  border-radius: 50%;

  svg {
    color: var(--color-gray-light);
    font-size: var(--font-size-3xl);
  }
`;

const Avatar = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const Label = styled.label`
  color: orange;
`;

const Input = styled.input`
  &::placeholder {
    color: var(--color-gray-light);
  }

  &:disabled {
    border: 0.15rem solid var(--color-gray-dark);
    background-color: rgba(51, 51, 51, 0.35);
    background-color: transparent;
    opacity: 0.75;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    background-color: rgba(30, 27, 75, 0.5);
    caret-color: var(--color-white);
    border-color: var(--color-main-400);
    color: var(--color-white);
  }
`;

const FileInput = styled.input`
  outline: none;
  color: var(--color-white);
  font-size: var(--font-size-sm);
  font-weight: 700;
  letter-spacing: var(--letter-spacing-xs);
  cursor: pointer;

  &::file-selector-button {
    outline: none;
    width: 14rem;
    background-color: var(--color-main-950);
    color: var(--color-main-400);
    border: 0.15rem solid var(--color-main-400);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-semibold);
    text-transform: uppercase;
    border-radius: calc(var(--border-rounded-xs) / 2);
    padding: calc(var(--padding-sm) / 2) 0;
    letter-spacing: var(--letter-spacing-xs);
    word-spacing: var(--word-spacing-sm);
    margin-right: var(--margin-sm);
    cursor: pointer;
    transition: all 0.35s ease;

    &:active {
      transform: translateY(0.2rem);
    }

    &:hover {
      border-color: var(--color-main-500);
      color: var(--color-main-500);
    }
  }
`;

const UpdateButton = styled.button`
  outline: none;
  border: none;
  cursor: pointer;

  &:active {
    transform: translateY(0.2rem);
  }

  &:disabled {
    color: var(--color-white);
    border-color: var(--color-gray-light);
    background-color: var(--color-gray-light);
    opacity: 0.75;
    cursor: not-allowed;
  }

  &:hover {
    color: var(--color-main-500);
    border-color: var(--color-main-500);
  }

  &:hover:disabled {
    background-color: var(--color-gray-dark);
    color: var(--color-white);
  }

  &:focus {
    outline: none;
    border: none;
  }
`;

const CancelButton = styled.button`
  outline: none;
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
    border: none;
  }
`;

function UpdateUserForm() {
  const { user } = useUser();
  const { updateCurrentUserFn, isPending } = useUpdateUser();
  const [username, setUsername] = useState(user?.user_metadata?.username);
  const [avatar, setAvatar] = useState(null);
  const { reset } = useForm();
  const userAvatar = user?.user_metadata?.avatar;

  function handleUpdateUser(e) {
    e.preventDefault();
    if (!username) return;

    updateCurrentUserFn(
      { username, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.form.reset();
        },
      }
    );
  }

  function handleCancel() {
    setUsername(user?.user_metadata?.username);
    setAvatar(null);
    reset();
  }

  return (
    <StyledUpdateUserForm>
      <>
        {userAvatar === '' ? (
          <AvatarContainer>
            <FaUser />
          </AvatarContainer>
        ) : (
          <Avatar
            src={userAvatar}
            alt={`Avatar of ${username}`}
          />
        )}
      </>

      <Form>
        <Box>
          <Label htmlFor='newUsername'>Username:</Label>
          <Input
            type='text'
            id='newUsername'
            placeholder='between 3-13 characters'
            onChange={(e) => setUsername(e.target.value)}
            disabled={isPending}
            maxLength={13}
            minLength={3}
          />

          <Label htmlFor='email'>Email:</Label>
          <Input
            id='email'
            value={user?.email}
            disabled
          />
        </Box>

        <Label htmlFor='avatar'>Avatar:</Label>
        <FileInput
          type='file'
          accept='image/*'
          id='avatar'
          onChange={(e) => {
            setAvatar(e.target.files[0]);
          }}
          disabled={isPending}
        />

        <UpdateButton
          onClick={handleUpdateUser}
          disabled={isPending}
        >
          {!isPending ? `Update` : <MiniLoader />}
        </UpdateButton>

        <CancelButton
          type='reset'
          onClick={handleCancel}
          disabled={isPending}
        >
          Cancel
        </CancelButton>
      </Form>
    </StyledUpdateUserForm>
  );
}

export default UpdateUserForm;
