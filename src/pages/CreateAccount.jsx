import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSignup } from '../hooks/auth/mutations/useSignup';
import { useUser } from '../hooks/auth/useUser';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import SmallLoader from '../components/loaders/SmallLoader';

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
  const { signupUser, isPending } = useSignup();
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
      {!isAuthenticated ? (
        <form
          className='flex flex-col gap-6 items-center rounded-md shadow-lg bg-neutral-400/20 backdrop-blur p-6 border-none outline outline-1 outline-neutral-800'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='flex flex-col gap-1'>
            <label
              className='text-sm text-stone-200 tracking-wider pl-3 self-start'
              htmlFor='registerUsername'
            >
              Username
            </label>

            <input
              className='w-96 py-2 px-3 rounded-md shadow-lg tracking-wide caret-red-400 outline outline-1 outline-transparent border-none text-base text-stone-200 bg-neutral-800 placeholder-neutral-400/50 focus-visible:outline-red-400 transition-all duration-500 disabled:outline-gray-500/25 disabled:bg-neutral-900 disabled:text-gray-500/75 disabled:cursor-not-allowed'
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
                  value: 15,
                  message: 'The username should have at most 15 characters.',
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
              className='text-sm text-stone-200 tracking-wider pl-3 self-start'
              htmlFor='registerEmail'
            >
              Email
            </label>

            <input
              className='w-96 py-2 px-3 rounded-md shadow-lg tracking-wide caret-red-400 outline outline-1 outline-transparent border-none text-base text-stone-200 bg-neutral-800 placeholder-neutral-400/50 focus-visible:outline-red-400 transition-all duration-500 disabled:outline-gray-500/25 disabled:bg-neutral-900 disabled:text-gray-500/75 disabled:cursor-not-allowed'
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
              className='text-sm text-stone-200 tracking-wider pl-3 self-start'
              htmlFor='registerPassword'
            >
              Password
            </label>

            <input
              className='w-96 py-2 px-3 rounded-md shadow-lg tracking-wide caret-red-400 outline outline-1 outline-transparent border-none text-base text-stone-200 bg-neutral-800 placeholder-neutral-400/50 focus-visible:outline-red-400 transition-all duration-500 disabled:outline-gray-500/25 disabled:bg-neutral-900 disabled:text-gray-500/75 disabled:cursor-not-allowed'
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
              className='text-sm text-stone-200 tracking-wider pl-3 self-start'
              htmlFor='registerConfirmPassword'
            >
              Confirm Password
            </label>

            <input
              className='w-96 py-2 px-3 rounded-md shadow-lg tracking-wide caret-red-400 outline outline-1 outline-transparent border-none text-base text-stone-200 bg-neutral-800 placeholder-neutral-400/50 focus-visible:outline-red-400 transition-all duration-500 disabled:outline-gray-500/25 disabled:bg-neutral-900 disabled:text-gray-500/75 disabled:cursor-not-allowed'
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
              className='outline outline-1 outline-transparent border-none text-base tracking-wide font-medium bg-red-400 text-stone-200 w-full rounded-md shadow-lg py-2 px-3 hover:bg-red-500 hover:text-stone-100 focus-visible:bg-red-500 focus-visible:text-stone-100 transition-all duration-300 disabled:outline-gray-500/25 disabled:bg-neutral-900 disabled:text-gray-500/75 disabled:cursor-not-allowed'
              type='submit'
              disabled={isPending}
            >
              {isPending ? <SmallLoader /> : 'Create Account'}
            </button>

            <div className='flex gap-3 items-center w-full'>
              <button
                className='outline outline-1 outline-transparent border-none text-base tracking-wide font-medium bg-red-400 text-stone-200 w-full rounded-md shadow-lg py-2 px-3 hover:bg-red-500 hover:text-stone-100 focus-visible:bg-red-500 focus-visible:text-stone-100 transition-all duration-300 disabled:outline-gray-500/25 disabled:bg-neutral-900 disabled:text-gray-500/75 disabled:cursor-not-allowed'
                type='button'
                onClick={handleCancelSubmit}
                disabled={isPending}
              >
                Cancel
              </button>

              <button
                className='outline outline-1 outline-transparent border-none text-base tracking-wide font-medium bg-red-400 text-stone-200 w-full rounded-md shadow-lg py-2 px-3 hover:bg-red-500 hover:text-stone-100 focus-visible:bg-red-500 focus-visible:text-stone-100 transition-all duration-300 disabled:outline-gray-500/25 disabled:bg-neutral-900 disabled:text-gray-500/75 disabled:cursor-not-allowed'
                type='button'
                onClick={handleRedirectHome}
                disabled={isPending}
              >
                Home
              </button>
            </div>
          </div>
        </form>
      ) : (
        <div className='w-[1280px] flex flex-col gap-3 items-center justify-center rounded-md shadow-lg bg-neutral-400/20 backdrop-blur p-6 border-none outline outline-1 outline-neutral-800'>
          <p className='text-stone-200 text-lg tracking-wider text-center'>
            It seems you already have an account and are currently logged in. If
            you wish to create a new account, please log out first. Otherwise,
            feel free to explore the rest of the app or visit your profile to
            update your details.
          </p>

          <div className='flex items-center justify-center gap-6'>
            <button
              className='outline-none border-none bg-neutral-900 text-base text-slate-500 font-medium tracking-wide py-2 px-3 rounded-md shadow-lg hover:bg-neutral-950 hover:text-slate-400 focus-visible:bg-neutral-950 focus-visible:text-slate-400 transition-all duration-300'
              type='button'
              onClick={() => navigate('/')}
            >
              Home Page
            </button>

            <button
              className='outline-none border-none bg-neutral-900 text-base text-slate-500 font-medium tracking-wide py-2 px-3 rounded-md shadow-lg hover:bg-neutral-950 hover:text-slate-400 focus-visible:bg-neutral-950 focus-visible:text-slate-400 transition-all duration-300'
              type='button'
              onClick={() => navigate('/discovery')}
            >
              Discovery
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateAccount;
