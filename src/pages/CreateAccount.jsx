import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSignup } from '../hooks/useSignup';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useUser } from '../hooks/useUser';

function CreateAccount() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const { createUserFn, isPending } = useSignup();
  const { isAuthenticated } = useUser();

  // track if the confirm password field match with the password field
  const registerPassword = watch('registerPassword');

  // the handler that will submit the data to the supabase client
  const onSubmit = ({
    registerUsername,
    registerEmail,
    registerPassword,
    registerConfirmPassword,
  }) => {
    console.log(
      registerUsername,
      registerEmail,
      registerPassword,
      registerConfirmPassword
    );
  };

  // the handler that will cancel the login action and will redirect the user with a step back in the history
  const handleCancelSubmit = () => {
    reset();
  };

  // the handler that will redirect the user to the home page
  const handleRedirectHome = () => {
    navigate('/');
  };

  return (
    <div
      // viewport height - py of the layout - nav height
      style={{
        height: 'calc(100vh - 96px - 61px)',
        background: `radial-gradient(
      circle,
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0.8),
      rgba(0, 0, 0, 0.9),
      rgba(0, 0, 0, 1)
      ),url(authBg.jpg) no-repeat center / cover`,
      }}
      className='flex items-center justify-center w-full'
    >
      <form
        className='flex flex-col gap-6 items-center rounded-md shadow-lg bg-neutral-400/20 backdrop-blur p-6 border-none outline outline-1 outline-neutral-800'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col gap-1'>
          <label
            className='text-sm text-stone-200 tracking-wider pl-3'
            htmlFor='registerUsername'
          >
            Username
          </label>

          <input
            className='w-96 py-2 px-3 rounded-md shadow-lg tracking-wide caret-red-400 outline outline-1 outline-transparent border-none text-base text-stone-200 bg-neutral-800 placeholder-neutral-400/50 focus-visible:outline-red-400 transition-all duration-500'
            type='text'
            id='registerUsername'
            placeholder='John Doe'
            disabled={isPending}
            {...register('registerUsername', {
              required: 'Username field is required.',
              minLength: {
                value: 3,
                message: 'The username should have at least 3 characters.',
              },
              maxLength: {
                value: 13,
                message: 'The username should have at most 13 characters.',
              },
            })}
          />
          {errors?.registerUsername && (
            <span className='py-1 pl-3 text-sm tracking-wider text-red-500'>
              {errors?.registerUsername?.message}
            </span>
          )}
        </div>

        <div className='flex flex-col gap-1'>
          <label
            className='text-sm text-stone-200 tracking-wider pl-3'
            htmlFor='registerEmail'
          >
            Email
          </label>

          <input
            className='w-96 py-2 px-3 rounded-md shadow-lg tracking-wide caret-red-400 outline outline-1 outline-transparent border-none text-base text-stone-200 bg-neutral-800 placeholder-neutral-400/50 focus-visible:outline-red-400 transition-all duration-500'
            type='email'
            id='registerEmail'
            placeholder='example@gmail.com'
            disabled={isPending}
            {...register('registerEmail', {
              required: 'Email field is required.',
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: 'Invalid email address.',
              },
            })}
          />
          {errors?.registerEmail && (
            <span className='py-1 pl-3 text-sm tracking-wider text-red-500'>
              {errors?.registerEmail?.message}
            </span>
          )}
        </div>

        <div className='relative flex flex-col gap-1'>
          <label
            className='text-sm text-stone-200 tracking-wider pl-3'
            htmlFor='registerPassword'
          >
            Password
          </label>

          <input
            className='w-96 py-2 px-3 rounded-md shadow-lg tracking-wide caret-red-400 outline outline-1 outline-transparent border-none text-base text-stone-200 bg-neutral-800 placeholder-neutral-400/50 focus-visible:outline-red-400 transition-all duration-500'
            type={showPassword ? 'text' : 'password'}
            id='registerPassword'
            placeholder='mypassword'
            disabled={isPending}
            {...register('registerPassword', {
              required: 'Password field is required.',
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
          {errors?.registerPassword && (
            <span className='py-1 pl-3 text-sm tracking-wider text-red-500'>
              {errors?.registerPassword?.message}
            </span>
          )}

          <button
            className={`absolute ${
              errors?.registerPassword ? 'bottom-11' : 'bottom-3'
            } right-0 pr-3 border-none outline-none text-base text-stone-200 hover:text-red-500 focus-visible:text-red-500 transition-all duration-300`}
            type='button'
            onClick={() => setShowPassword((showPassword) => !showPassword)}
          >
            {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>

        <div className='relative flex flex-col gap-1'>
          <label
            className='text-sm text-stone-200 tracking-wider pl-3'
            htmlFor='registerConfirmPassword'
          >
            Confirm Password
          </label>

          <input
            className='w-96 py-2 px-3 rounded-md shadow-lg tracking-wide caret-red-400 outline outline-1 outline-transparent border-none text-base text-stone-200 bg-neutral-800 placeholder-neutral-400/50 focus-visible:outline-red-400 transition-all duration-500'
            type={showConfirmPassword ? 'text' : 'password'}
            id='registerConfirmPassword'
            placeholder='confirm mypassword'
            disabled={isPending}
            {...register('registerConfirmPassword', {
              required: 'Confirm password field is required.',
              validate: (value) =>
                value === registerPassword || 'The passwords must match.',
            })}
          />
          {errors?.registerConfirmPassword && (
            <span className='py-1 pl-3 text-sm tracking-wider text-red-500'>
              {errors?.registerConfirmPassword?.message}
            </span>
          )}

          <button
            className={`absolute ${
              errors?.registerConfirmPassword ? 'bottom-11' : 'bottom-3'
            } right-0 pr-3 border-none outline-none text-base text-stone-200 hover:text-red-500 focus-visible:text-red-500 transition-all duration-300`}
            type='button'
            onClick={() =>
              setShowConfirmPassword(
                (showConfirmPassword) => !showConfirmPassword
              )
            }
          >
            {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>

        <div className='flex flex-col gap-3 items-center w-full'>
          <button
            className='outline outline-1 outline-transparent border-none text-base tracking-wide font-medium bg-red-400 text-stone-200 w-full rounded-md shadow-lg py-2 px-3 hover:bg-red-500 hover:text-stone-100 focus-visible:bg-red-500 focus-visible:text-stone-100 transition-all duration-300'
            type='submit'
            disabled={isPending}
          >
            Create Account
          </button>

          <div className='flex gap-3 items-center w-full'>
            <button
              className='outline outline-1 outline-transparent border-none text-base tracking-wide font-medium bg-red-400 text-stone-200 w-full rounded-md shadow-lg py-2 px-3 hover:bg-red-500 hover:text-stone-100 focus-visible:bg-red-500 focus-visible:text-stone-100 transition-all duration-300'
              type='button'
              onClick={handleCancelSubmit}
              disabled={isPending}
            >
              Cancel
            </button>

            <button
              className='outline outline-1 outline-transparent border-none text-base tracking-wide font-medium bg-red-400 text-stone-200 w-full rounded-md shadow-lg py-2 px-3 hover:bg-red-500 hover:text-stone-100 focus-visible:bg-red-500 focus-visible:text-stone-100 transition-all duration-300'
              type='button'
              onClick={handleRedirectHome}
              disabled={isPending}
            >
              Home
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateAccount;
