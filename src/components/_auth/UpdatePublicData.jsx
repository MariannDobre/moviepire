import React from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '../../hooks/auth/useUser';
import { useUpdatePublicData } from '../../hooks/auth/mutations/useUpdatePublicData';

import SmallLoader from '../loaders/SmallLoader';

import { FaRegUser } from 'react-icons/fa6';

function UpdatePublicData() {
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useUser();
  const { updateUserPublicData, isPending } = useUpdatePublicData();

  const userAvatar = user?.user_metadata?.avatar;

  const watchedUsername = watch('newUsername');
  const watchedAvatar = watch('newAvatar');

  const newAvatarFile =
    watchedAvatar && watchedAvatar.length > 0 ? watchedAvatar[0] : null;
  const isUpdatedUsernameEmpty =
    watchedUsername === undefined || watchedUsername === '';
  const isUpdatedAvatarEmpty =
    watchedAvatar === undefined || watchedAvatar.length === 0;

  const onSubmit = ({ newUsername }) => {
    updateUserPublicData({ newUsername, newAvatarFile });

    reset();
  };

  const handleCancelSubmit = () => {
    reset();
  };

  return (
    <React.Fragment>
      <header className='w-full h-auto flex flex-col items-start justify-start'>
        <h6 className='text-xl text-white font-medium tracking-wide text-start'>
          Public Profile
        </h6>

        <p className='text-base text-neutral-400 font-normal tracking-wide'>
          Manage your public profile information
        </p>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full h-auto flex flex-col gap-3'
      >
        <div className='w-full h-16 flex items-center gap-3'>
          <div className='w-16 h-16'>
            {userAvatar ? (
              <div className='w-full h-full flex items-center justify-center rounded-full'>
                <img
                  className='w-full h-full rounded-full object-cover drop-shadow-sm'
                  src={userAvatar}
                  alt='User avatar'
                />
              </div>
            ) : (
              <span className='w-full h-full flex items-center justify-center rounded-full drop-shadow-sm bg-black/75 text-2xl text-white font-medium'>
                {user?.user_metadata?.username
                  ?.trim()
                  ?.charAt(0)
                  ?.toUpperCase()}
              </span>
            )}
          </div>

          <input
            type='file'
            accept='image/*'
            id='newAvatar'
            name='newAvatar'
            disabled={isPending}
            className='w-auto h-auto outline-none border-none py-1.5 px-3 bg-transparent text-neutral-400 text-base font-normal tracking-wider file:mr-3 file:rounded-md file:outline-none file:border-none file:cursor-pointer file:bg-amber-400 file:text-black file:text-sm file:font-medium file:tracking-wider file:py-1 file:px-3 file:hover:bg-amber-500 file:focus-visible:bg-amber-500 file:transition-colors file:duration-300 file:disabled:cursor-not-allowed file:disabled:opacity-50 disabled:cursor-not-allowed'
            {...register('newAvatar')}
          />
          {errors?.newAvatar && (
            <span className='py-1 pl-3 text-sm tracking-wider text-red-500'>
              {errors?.newAvatar?.message}
            </span>
          )}
        </div>

        <label
          htmlFor='currentUsername'
          className='w-full h-auto flex flex-col gap-1.5 items-start justify-start'
        >
          <p className='flex items-center gap-2 text-sm text-neutral-200 font-medium tracking-wider self-start text-start'>
            <span className='text-base text-amber-400'>
              <FaRegUser />
            </span>
            Current Username
          </p>

          <input
            type='text'
            id='currentUsername'
            name='currentUsername'
            placeholder={user?.user_metadata?.username}
            disabled
            className='outline-none border border-neutral-700 w-full h-auto py-1.5 px-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-neutral-700 placeholder:text-neutral-400 placeholder:text-base placeholder:font-medium placeholder:tracking-wider bg-black/75 rounded-md'
          />
        </label>

        <label
          htmlFor='newUsername'
          className='w-full h-auto flex flex-col gap-1.5 items-start justify-start'
        >
          <p className='flex items-center gap-2 text-sm text-neutral-200 font-medium tracking-wider self-start text-start'>
            <span className='text-base text-amber-400'>
              <FaRegUser />
            </span>
            New Username
          </p>

          <input
            type='text'
            id='newUsername'
            name='newUsername'
            placeholder='Your new desired username'
            disabled={isPending}
            className='outline-none border border-neutral-700 w-full h-auto py-1.5 px-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-neutral-700 placeholder:text-neutral-400 placeholder:text-base placeholder:font-medium placeholder:tracking-wider bg-black/75 text-white text-base font-medium tracking-wider caret-amber-400 rounded-md hover:border-amber-400 focus-visible:border-amber-400 transition-all duration-300'
            {...register('newUsername', {
              minLength: {
                value: 3,
                message: 'The username should have at least 3 characters.',
              },
              maxLength: {
                value: 15,
                message: 'The username should have at most 15 characters.',
              },
            })}
          />
          {errors?.updatedUsername && (
            <span className='text-sm text-red-500 font-normal tracking-wider py-1 pl-3'>
              {errors?.updatedUsername?.message}
            </span>
          )}
        </label>

        <div className='w-full h-auto grid grid-cols-2 gap-x-3 gap-y-0'>
          <button
            type='submit'
            disabled={
              (isUpdatedUsernameEmpty && isUpdatedAvatarEmpty) || isPending
            }
            className='w-full h-auto outline-none border-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-amber-400 py-1.5 px-6 flex items-center justify-center text-center rounded-md shadow-sm bg-amber-400 text-black text-sm font-medium tracking-wider hover:bg-amber-500 focus-visible:bg-amber-500 transition-colors duration-300'
          >
            {isPending ? (
              <SmallLoader
                size='text-xl'
                color='text-black'
              />
            ) : (
              'Update'
            )}
          </button>

          <button
            type='button'
            onClick={handleCancelSubmit}
            disabled={isPending}
            className='w-full h-auto outline-none border-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-red-500 py-1.5 px-6 flex items-center justify-center text-center rounded-md bg-red-500 text-white text-sm font-medium tracking-wider hover:bg-red-700 focus-visible:bg-red-700 transition-colors duration-300'
          >
            Cancel
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}

export default UpdatePublicData;
