import React from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '../hooks/auth/useUser';
import { useUpdatePublicData } from '../hooks/auth/mutations/useUpdatePublicData';
import { FaUser } from 'react-icons/fa';
import SmallLoader from '../components/loaders/SmallLoader';

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

  // derived state to get the avatar of the user
  const userAvatar = user?.user_metadata?.avatar;

  // derived state to track if the inputs are empty or not so the update button can be disabled in certain scenarios
  const updatedUsername = watch('updatedUsername');
  const updatedAvatar = watch('updatedAvatar');
  const updatedAvatarFile =
    updatedAvatar && updatedAvatar.length > 0 ? updatedAvatar[0] : null;
  const isUpdatedUsernameEmpty =
    updatedUsername === undefined || updatedUsername === '';
  const isUpdatedAvatarEmpty =
    updatedAvatar === undefined || updatedAvatar.length === 0;

  // the handler that will submit the data to the supabase client
  const onSubmit = ({ updatedUsername }) => {
    updateUserPublicData({ updatedUsername, updatedAvatarFile });
  };

  // the handler that will cancel the login action and will redirect the user with a step back in the history
  const handleCancelSubmit = () => {
    reset();
  };

  return (
    <div className='flex flex-col'>
      <form
        className='flex flex-col gap-6 bg-neutral-50/10 p-3 rounded-md shadow-lg outline outline-1 outline-neutral-800'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='w-20 h-20'>
          {userAvatar ? (
            <span className='flex items-center justify-center rounded-full w-full h-full'>
              <img
                className='rounded-full w-full h-full'
                src={userAvatar}
                alt='User avatar'
              />
            </span>
          ) : (
            <span className='flex items-center justify-center rounded-full w-full h-full bg-black/85'>
              <FaUser className='text-gray-500 text-3xl' />
            </span>
          )}
        </div>

        <div className='flex flex-col gap-1'>
          <label
            className='text-sm text-stone-300 tracking-wider pl-3 self-start'
            htmlFor='updatedUsername'
          >
            New Username:
          </label>

          <input
            className='w-96 py-2 px-3 rounded-md shadow-lg tracking-wide caret-red-400 outline outline-1 outline-stone-300/20 border-none text-base text-stone-200 bg-neutral-800 placeholder-neutral-400/50 focus-visible:outline-red-400 transition-all duration-500 disabled:outline-gray-500/25 disabled:bg-neutral-900 disabled:text-gray-500/75 disabled:cursor-not-allowed'
            type='text'
            id='updatedUsername'
            placeholder='new username'
            disabled={isPending}
            {...register('updatedUsername', {
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
            <span className='py-1 pl-3 text-sm tracking-wider text-red-500'>
              {errors?.updatedUsername?.message}
            </span>
          )}
        </div>

        <div className='flex flex-col gap-1'>
          <label
            className='text-sm text-stone-300 tracking-wider pl-3 self-start'
            htmlFor='updatedAvatar'
          >
            Avatar:
          </label>

          <input
            className='w-96 py-2 px-3 rounded-md shadow-lg tracking-wide caret-red-400 outline outline-1 outline-stone-300/20 border-none text-base bg-neutral-800 text-neutral-400/50 focus-visible:outline-red-400 transition-all duration-500 file:mr-3 file:rounded-md file:shadow-lg file:outline-none file:border-none file:cursor-pointer file:bg-red-400 file:text-stone-200 focus-visible:file:bg-red-500 focus-visible:file:text-stone-100 hover:file:text-stone-100 hover:file:bg-red-500 file:text-sm file:tracking-wide file:font-semibold file:px-2 file:transition-all file:duration-300 file:disabled:cursor-not-allowed file:disabled:bg-gray-500/75 file:disabled:text-neutral-900 disabled:outline-gray-500/25 disabled:bg-neutral-900 disabled:text-gray-500/75 disabled:cursor-not-allowed'
            type='file'
            accept='image/*'
            id='updatedAvatar'
            disabled={isPending}
            {...register('updatedAvatar')}
          />
          {errors?.updatedAvatar && (
            <span className='py-1 pl-3 text-sm tracking-wider text-red-500'>
              {errors?.updatedAvatar?.message}
            </span>
          )}
        </div>

        <div className='w-96 flex items-center gap-3'>
          <button
            className='outline outline-1 outline-transparent border-none text-base tracking-wide font-medium bg-red-400 text-stone-200 w-1/2 rounded-md shadow-lg py-2 px-3 hover:bg-red-500 hover:text-stone-100 focus-visible:bg-red-500 focus-visible:text-stone-100 transition-all duration-300 disabled:outline-gray-500/25 disabled:bg-neutral-900 disabled:text-gray-500/75 disabled:cursor-not-allowed'
            type='submit'
            disabled={
              (isUpdatedUsernameEmpty && isUpdatedAvatarEmpty) || isPending
            }
          >
            {isPending ? <SmallLoader /> : 'Update'}
          </button>

          <button
            className='outline outline-1 outline-transparent border-none text-base tracking-wide font-medium bg-red-400 text-stone-200 w-1/2 rounded-md shadow-lg py-2 px-3 hover:bg-red-500 hover:text-stone-100 focus-visible:bg-red-500 focus-visible:text-stone-100 transition-all duration-300 disabled:outline-gray-500/25 disabled:bg-neutral-900 disabled:text-gray-500/75 disabled:cursor-not-allowed'
            type='button'
            onClick={handleCancelSubmit}
            disabled={isPending}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePublicData;
