import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '../hooks/useUser';
import { useUpdateUser } from '../hooks/useUpdateData';
import { FaUser } from 'react-icons/fa6';
import SmallLoader from '../components/loaders/SmallLoader';

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
    <div>
      <>
        {userAvatar === '' ? (
          <div>
            <FaUser />
          </div>
        ) : (
          <img
            src={userAvatar}
            alt={`Avatar of ${username}`}
          />
        )}
      </>

      <form>
        <div>
          <label htmlFor='newUsername'>Username:</label>
          <input
            type='text'
            id='newUsername'
            placeholder='between 3-13 characters'
            onChange={(e) => setUsername(e.target.value)}
            disabled={isPending}
            maxLength={13}
            minLength={3}
          />

          <label htmlFor='email'>Email:</label>
          <input
            id='email'
            value={user?.email}
            disabled
          />
        </div>

        <label htmlFor='avatar'>Avatar:</label>
        <input
          type='file'
          accept='image/*'
          id='avatar'
          onChange={(e) => {
            setAvatar(e.target.files[0]);
          }}
          disabled={isPending}
        />

        <button
          onClick={handleUpdateUser}
          disabled={isPending}
        >
          {!isPending ? `Update` : <SmallLoader />}
        </button>

        <button
          type='reset'
          onClick={handleCancel}
          disabled={isPending}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default UpdateUserForm;
