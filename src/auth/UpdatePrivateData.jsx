import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePrivateData } from '../hooks/auth/mutations/useUpdatePrivateData';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import SmallLoader from '../components/loaders/SmallLoader';

function UpdatePrivateData() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { updatePassword, isPending } = useUpdatePrivateData();

  // track if the confirm password field match with the password field
  const newPassword = watch('newPassword');

  // the handler that will submit the data to the supabase client
  const onSubmit = (data) => {
    console.log(data);
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
        <div className='relative w-96 flex flex-col gap-1'>
          <label
            className='text-sm text-stone-300 tracking-wider pl-3 self-start'
            htmlFor='newPassword'
          >
            New Password:
          </label>

          <input
            className='w-96 py-2 px-3 rounded-md shadow-lg tracking-wide caret-red-400 outline outline-1 outline-stone-300/20 border-none text-base text-stone-200 bg-neutral-800 placeholder-neutral-400/50 focus-visible:outline-red-400 transition-all duration-500 disabled:outline-gray-500/25 disabled:bg-neutral-900 disabled:text-gray-500/75 disabled:cursor-not-allowed'
            type={showNewPassword ? 'text' : 'password'}
            id='newPassword'
            placeholder='mynewpassword'
            disabled={isPending}
            {...register('newPassword', {
              required: 'New password field is required.',
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
          {errors?.newPassword && (
            <span className='py-1 pl-3 text-sm tracking-wider text-red-500'>
              {errors?.newPassword?.message}
            </span>
          )}

          <button
            className={`absolute ${
              errors?.newPassword ? 'bottom-11' : 'bottom-3'
            } right-0 pr-3 border-none outline-none text-base text-stone-200 hover:text-red-500 focus-visible:text-red-500 transition-all duration-300`}
            type='button'
            onClick={() =>
              setShowNewPassword((showNewPassword) => !showNewPassword)
            }
          >
            {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>

        <div className='relative w-96 flex flex-col gap-1'>
          <label
            className='text-sm text-stone-300 tracking-wider pl-3 self-start'
            htmlFor='newConfirmPassword'
          >
            Confirm Password:
          </label>

          <input
            className='w-96 py-2 px-3 rounded-md shadow-lg tracking-wide caret-red-400 outline outline-1 outline-stone-300/20 border-none text-base text-stone-200 bg-neutral-800 placeholder-neutral-400/50 focus-visible:outline-red-400 transition-all duration-500 disabled:outline-gray-500/25 disabled:bg-neutral-900 disabled:text-gray-500/75 disabled:cursor-not-allowed'
            type={showConfirmNewPassword ? 'text' : 'password'}
            id='newConfirmPassword'
            placeholder='confirm mynewpassword'
            disabled={isPending}
            {...register('newConfirmPassword', {
              required: 'Confirm password field is required.',
              validate: (value) =>
                value === newPassword || 'The passwords must match.',
            })}
          />
          {errors?.newConfirmPassword && (
            <span className='py-1 pl-3 text-sm tracking-wider text-red-500'>
              {errors?.newConfirmPassword?.message}
            </span>
          )}

          <button
            className={`absolute ${
              errors?.newConfirmPassword ? 'bottom-11' : 'bottom-3'
            } right-0 pr-3 border-none outline-none text-base text-stone-200 hover:text-red-500 focus-visible:text-red-500 transition-all duration-300`}
            type='button'
            onClick={() =>
              setShowConfirmNewPassword(
                (showConfirmNewPassword) => !showConfirmNewPassword
              )
            }
          >
            {showConfirmNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>

        <div className='w-96 flex items-center gap-3'>
          <button
            className='outline outline-1 outline-transparent border-none text-base tracking-wide font-medium bg-red-400 text-stone-200 w-1/2 rounded-md shadow-lg py-2 px-3 hover:bg-red-500 hover:text-stone-100 focus-visible:bg-red-500 focus-visible:text-stone-100 transition-all duration-300 disabled:outline-gray-500/25 disabled:bg-neutral-900 disabled:text-gray-500/75 disabled:cursor-not-allowed'
            type='submit'
            disabled={isPending}
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

export default UpdatePrivateData;
