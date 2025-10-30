import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useUpdatePrivateData } from '../../hooks/auth/mutations/useUpdatePrivateData';

import SmallLoader from '../../interface/_loaders/SmallLoader';

import { FaShieldAlt, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

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
      {/* HEADER */}
      <header className='w-full h-auto flex flex-col items-start justify-start'>
        <h6 className='text-xl text-white font-medium tracking-wide text-start'>
          Change Password
        </h6>

        <p className='text-base text-neutral-400 font-normal tracking-wide'>
          Update your password to keep your account secure
        </p>
      </header>

      {/* PRIVATE DATA FORM */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        aria-label='Update private data form'
        className='w-full h-auto flex flex-col gap-3'
      >
        {/* NEW PASSWORD FIELD */}
        <label
          htmlFor='newPassword'
          className='w-full h-auto flex flex-col gap-1.5 items-start justify-start relative'
        >
          <p className='flex items-center gap-2 text-base text-neutral-200 font-medium tracking-wider self-start text-start'>
            <span className='text-sm text-amber-400'>
              <FaShieldAlt aria-hidden='true' />
            </span>
            New Password
          </p>

          <input
            type={showNewPassword ? 'text' : 'password'}
            id='newPassword'
            name='newPassword'
            placeholder='Your new desired password'
            disabled={isPending}
            aria-required='true'
            aria-invalid={!!errors?.newPassword}
            aria-describedby={
              errors?.newPassword ? 'newPassword-error' : undefined
            }
            className='outline-none border border-neutral-700 w-full h-auto py-1 px-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-neutral-700 placeholder:text-neutral-400 placeholder:text-sm placeholder:font-medium placeholder:tracking-widest bg-black/75 text-white text-sm font-medium tracking-widest caret-amber-400 rounded-md hover:border-amber-400 focus-visible:border-amber-400 transition-all duration-300'
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
            <span
              id='newPassword-error'
              className='text-xs text-red-500 font-normal tracking-widest py-0.5 pl-3'
            >
              {errors?.newPassword?.message}
            </span>
          )}

          <button
            type='button'
            aria-label={
              showNewPassword ? 'Hide password text' : 'Show password text'
            }
            title={showNewPassword ? 'Hide password' : 'Show password'}
            onClick={() =>
              setShowNewPassword((showNewPassword) => !showNewPassword)
            }
            className={`absolute right-3 ${
              errors?.newPassword ? 'bottom-[33px]' : 'bottom-[7px]'
            } border-none outline-none text-base text-neutral-400 hover:text-amber-400 focus-visible:text-amber-400 transition-colors duration-300`}
          >
            {showNewPassword ? (
              <FaRegEyeSlash aria-hidden='true' />
            ) : (
              <FaRegEye aria-hidden='true' />
            )}
          </button>
        </label>

        {/* CONFIRM NEW PASSWORD FIELD */}
        <label
          htmlFor='newConfirmPassword'
          className='w-full h-auto flex flex-col gap-1.5 items-start justify-start relative'
        >
          <p className='flex items-center gap-2 text-base text-neutral-200 font-medium tracking-wider self-start text-start'>
            <span className='text-sm text-amber-400'>
              <FaShieldAlt aria-hidden='true' />
            </span>
            Confirm New Password
          </p>

          <input
            type={showConfirmNewPassword ? 'text' : 'password'}
            id='newConfirmPassword'
            name='newConfirmPassword'
            placeholder='Confirm your new desired password'
            disabled={isPending}
            aria-required='true'
            aria-invalid={!!errors?.newConfirmPassword}
            aria-describedby={
              errors?.newConfirmPassword
                ? 'newConfirmPassword-error'
                : undefined
            }
            className='outline-none border border-neutral-700 w-full h-auto py-1 px-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-neutral-700 placeholder:text-neutral-400 placeholder:text-sm placeholder:font-medium placeholder:tracking-widest bg-black/75 text-white text-sm font-medium tracking-widest caret-amber-400 rounded-md hover:border-amber-400 focus-visible:border-amber-400 transition-all duration-300'
            {...register('newConfirmPassword', {
              required: 'Confirm password field is required.',
              validate: (value) =>
                value === watchPassword || 'The passwords must match.',
            })}
          />
          {errors?.newConfirmPassword && (
            <span
              id='newConfirmPassword-error'
              className='text-xs text-red-500 font-normal tracking-widest py-0.5 pl-3'
            >
              {errors?.newConfirmPassword?.message}
            </span>
          )}

          <button
            type='button'
            aria-label={
              showConfirmNewPassword
                ? 'Hide password text'
                : 'Show password text'
            }
            title={showConfirmNewPassword ? 'Hide password' : 'Show password'}
            onClick={() =>
              setShowConfirmNewPassword(
                (showConfirmNewPassword) => !showConfirmNewPassword
              )
            }
            className={`absolute right-3 ${
              errors?.newConfirmPassword ? 'bottom-[33px]' : 'bottom-[7px]'
            } border-none outline-none text-base text-neutral-400 hover:text-amber-400 focus-visible:text-amber-400 transition-colors duration-300`}
          >
            {showConfirmNewPassword ? (
              <FaRegEyeSlash aria-hidden='true' />
            ) : (
              <FaRegEye aria-hidden='true' />
            )}
          </button>
        </label>

        {/* ACTIONS BUTTONS SECTION */}
        <div className='w-full h-auto grid grid-cols-2 gap-x-3'>
          <button
            type='submit'
            aria-label='Submit changes to your private profile'
            title='Submit changes to your private profile'
            disabled={
              !watchPassword ||
              !watchConfirmPassword ||
              watchPassword !== watchConfirmPassword ||
              isPending
            }
            className='w-full h-auto outline-none border-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-amber-400 py-1.5 px-6 flex items-center justify-center text-center rounded-md bg-amber-400 text-black text-sm font-medium tracking-wider hover:bg-amber-500 focus-visible:bg-amber-500 transition-colors duration-300'
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
            aria-label='Discard password changes'
            title='Discard password changes'
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
