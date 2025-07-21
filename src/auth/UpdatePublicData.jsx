import React from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '../hooks/auth/useUser';
import { useUpdatePublicData } from '../hooks/auth/mutations/useUpdatePublicData';

import SmallLoader from '../components/loaders/SmallLoader';

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

        <p className='text-base text-gray-400 font-normal tracking-wide'>
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
              <span className='w-full h-full flex items-center justify-center rounded-full drop-shadow-sm bg-black/75 text-xl text-white font-medium'>
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
            className='w-[calc(100%-64px-12px)] h-auto outline-none border-none py-1.5 px-3 bg-transparent text-neutral-500 text-base font-normal tracking-wider file:mr-3 file:rounded-md file:shadow-sm file:outline-none file:border-none file:cursor-pointer file:bg-blue-400 file:text-white file:text-sm file:font-medium file:tracking-wider file:py-1 file:px-3 file:hover:bg-blue-500 file:focus-visible:bg-blue-500 file:hover:shadow-lg file:focus-visible:shadow-lg file:transition-all file:duration-500 file:disabled:cursor-not-allowed file:disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-500'
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
          <p className='flex items-center gap-2 text-sm text-blue-400 font-medium tracking-wider self-start text-start'>
            <span>
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
            className='outline-none border border-neutral-500 w-full h-auto py-1.5 px-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-neutral-500 placeholder:text-neutral-500 bg-neutral-900 text-white text-balance font-normal tracking-wider caret-blue-400 rounded-md shadow-sm hover:border-blue-400 focus-visible:border-blue-400 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500 selection:bg-blue-400 selection:text-white'
          />
        </label>

        <label
          htmlFor='newUsername'
          className='w-full h-auto flex flex-col gap-1.5 items-start justify-start'
        >
          <p className='flex items-center gap-2 text-sm text-blue-400 font-medium tracking-wider self-start text-start'>
            <span>
              <FaRegUser />
            </span>
            New Username
          </p>

          <input
            type='text'
            id='newUsername'
            name='newUsername'
            placeholder='Your fresh desired username'
            disabled={isPending}
            className='outline-none border border-neutral-500 w-full h-auto py-1.5 px-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-neutral-500 placeholder:text-neutral-500 bg-neutral-900 text-white text-balance font-normal tracking-wider caret-blue-400 rounded-md shadow-sm hover:border-blue-400 focus-visible:border-blue-400 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500 selection:bg-blue-400 selection:text-white'
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

        <div className='w-full h-auto grid grid-cols-2 gap-x-3'>
          <button
            type='submit'
            disabled={
              (isUpdatedUsernameEmpty && isUpdatedAvatarEmpty) || isPending
            }
            className='w-full h-auto outline-none border-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-blue-400 disabled:shadow-sm py-1.5 px-6 flex items-center justify-center text-center rounded-md shadow-sm bg-blue-400 text-white text-sm font-medium tracking-wider hover:bg-blue-500 focus-visible:bg-blue-500 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
          >
            {isPending ? <SmallLoader /> : 'Update'}
          </button>

          <button
            type='button'
            onClick={handleCancelSubmit}
            disabled={isPending}
            className='w-full h-auto outline-none border-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-75 disabled:bg-red-400 disabled:shadow-sm py-1.5 px-6 flex items-center justify-center text-center rounded-md shadow-sm bg-red-400 text-white text-sm font-medium tracking-wider hover:bg-red-500 focus-visible:bg-red-500 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
          >
            Cancel
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}

export default UpdatePublicData;
