import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePrivateData } from '../../hooks/auth/mutations/useUpdatePrivateData';

import SmallLoader from '../loaders/SmallLoader';

import { FaShieldHalved } from 'react-icons/fa6';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

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

  const watchPassword = watch('newPassword');
  const watchConfirmPassword = watch('newConfirmPassword');

  // const isUpdatedPasswordEmpty =
  //   watchPassword === undefined || watchPassword === '';
  // const isUpdatedConfirmPasswordEmpty =
  //   watchConfirmPassword === undefined || watchConfirmPassword === '';

  const onSubmit = ({ newPassword }) => {
    updatePassword(newPassword);

    reset();
  };

  const handleCancelSubmit = () => {
    reset();
  };

  return (
    <React.Fragment>
      <header className='w-full h-auto flex flex-col items-start justify-start'>
        <h6 className='text-xl text-white font-medium tracking-wide text-start'>
          Change Password
        </h6>

        <p className='text-base text-neutral-400 font-normal tracking-wide'>
          Update your password to keep your account secure
        </p>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full h-auto flex flex-col gap-3'
      >
        <label
          htmlFor='newPassword'
          className='w-full h-auto flex flex-col gap-1.5 items-start justify-start relative'
        >
          <p className='flex items-center gap-2 text-sm text-neutral-200 font-medium tracking-wider self-start text-start'>
            <span className='text-base text-amber-400'>
              <FaShieldHalved />
            </span>
            New Password
          </p>

          <input
            type={showNewPassword ? 'text' : 'password'}
            id='newPassword'
            name='newPassword'
            placeholder='Your new desired password'
            disabled={isPending}
            className='outline-none border border-neutral-700 w-full h-auto py-1.5 px-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-neutral-700 placeholder:text-neutral-400 placeholder:text-base placeholder:font-medium placeholder:tracking-wider bg-black/75 text-white text-base font-medium tracking-wider caret-amber-400 rounded-md hover:border-amber-400 focus-visible:border-amber-400 transition-all duration-300'
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
            <span className='my-1.5 ml-3 text-red-500 text-sm font-normal tracking-wider'>
              {errors?.newPassword?.message}
            </span>
          )}

          <button
            type='button'
            onClick={() =>
              setShowNewPassword((showNewPassword) => !showNewPassword)
            }
            className={`absolute right-3 ${
              errors?.newPassword ? 'bottom-[50px]' : 'bottom-3'
            } border-none outline-none text-base text-neutral-400 hover:text-amber-400 focus-visible:text-amber-400 transition-colors duration-300`}
          >
            {showNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </label>

        <label
          htmlFor='newConfirmPassword'
          className='w-full h-auto flex flex-col gap-1.5 items-start justify-start relative'
        >
          <p className='flex items-center gap-2 text-sm text-neutral-200 font-medium tracking-wider self-start text-start'>
            <span className='text-base text-amber-400'>
              <FaShieldHalved />
            </span>
            Confirm New Password
          </p>

          <input
            type={showConfirmNewPassword ? 'text' : 'password'}
            id='newConfirmPassword'
            name='newConfirmPassword'
            placeholder='Confirm your new desired password'
            disabled={isPending}
            className='outline-none border border-neutral-700 w-full h-auto py-1.5 px-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-neutral-700 placeholder:text-neutral-400 placeholder:text-base placeholder:font-medium placeholder:tracking-wider bg-black/75 text-white text-base font-medium tracking-wider caret-amber-400 rounded-md hover:border-amber-400 focus-visible:border-amber-400 transition-all duration-300'
            {...register('newConfirmPassword', {
              required: 'Confirm password field is required.',
              validate: (value) =>
                value === watchPassword || 'The passwords must match.',
            })}
          />
          {errors?.newConfirmPassword && (
            <span className='my-1.5 ml-3 text-red-500 text-sm font-normal tracking-wider'>
              {errors?.newConfirmPassword?.message}
            </span>
          )}

          <button
            type='button'
            onClick={() =>
              setShowConfirmNewPassword(
                (showConfirmNewPassword) => !showConfirmNewPassword
              )
            }
            className={`absolute right-3 ${
              errors?.newConfirmPassword ? 'bottom-[50px]' : 'bottom-3'
            } border-none outline-none text-base text-neutral-400 hover:text-amber-400 focus-visible:text-amber-400 transition-colors duration-300`}
          >
            {showConfirmNewPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </label>

        <div className='w-full h-auto grid grid-cols-2 gap-x-3'>
          <button
            type='submit'
            // disabled={
            //   (isUpdatedPasswordEmpty && isUpdatedConfirmPasswordEmpty) ||
            //   isPending
            // }
            disabled={
              !watchPassword ||
              !watchConfirmPassword ||
              watchPassword !== watchConfirmPassword ||
              isPending
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

export default UpdatePrivateData;
