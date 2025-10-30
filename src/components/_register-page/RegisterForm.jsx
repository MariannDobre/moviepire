import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRegister } from '../../hooks/auth/mutations/useRegister';

import SmallLoader from '../../interface/_loaders/SmallLoader';

import {
  FaFilm,
  FaShieldAlt,
  FaUser,
  FaRegEye,
  FaRegEyeSlash,
} from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const { registerUser, isPending } = useRegister();
  const navigate = useNavigate();

  const watchPassword = watch('registerPassword');

  const onSubmit = ({
    registerUsername,
    registerEmail,
    registerPassword,
    registerConfirmPassword,
  }) => {
    registerUser(
      {
        registerUsername,
        registerEmail,
        registerPassword,
      },
      { onSettled: () => reset() }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      aria-label='Register a new account form'
      className='w-full max-w-[760px] h-auto flex flex-col items-center justify-center gap-6 p-6 rounded-md bg-black/50 backdrop-blur-md border border-neutral-700'
    >
      {/* HEADER */}
      <div className='w-full h-auto flex flex-col items-center gap-1.5'>
        <Link
          to='/'
          aria-label='Back to home page'
          title='Back to home page'
          className='outline-none border-none cursor-pointer w-12 h-12 rounded-md flex items-center justify-center text-white text-2xl bg-gradient-to-br from-rose-500 to-amber-400 hover:from-rose-700 hover:to-amber-400'
        >
          <FaFilm aria-hidden='true' />
        </Link>

        <h6 className='w-full h-auto text-white text-2xl font-medium tracking-wide text-center'>
          Create Account
        </h6>

        <p className='w-full h-auto text-neutral-400 text-base font-normal tracking-wide text-center'>
          Start your cinematic journey today
          <br />
          Join thousands of movie enthusiasts
        </p>
      </div>

      {/* USERNAME FIELD */}
      <label
        htmlFor='registerUsername'
        className='w-full h-auto flex flex-col gap-1.5 items-start justify-start'
      >
        <p className='flex items-center gap-2 text-base text-neutral-200 font-medium tracking-wider self-start text-start'>
          <span className='text-sm text-amber-400'>
            <FaUser aria-hidden='true' />
          </span>
          Username
        </p>

        <input
          type='text'
          name='registerUsername'
          id='registerUsername'
          placeholder='John Doe'
          disabled={isPending}
          aria-required='true'
          aria-invalid={!!errors?.registerUsername}
          aria-describedby={
            errors?.registerUsername ? 'registerUsername-error' : undefined
          }
          className='outline-none border border-neutral-700 w-full h-auto py-1 px-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-neutral-700 placeholder:text-neutral-400 placeholder:text-sm placeholder:font-medium placeholder:tracking-widest bg-black/75 text-white text-sm font-medium tracking-widest caret-amber-400 rounded-md hover:border-amber-400 focus-visible:border-amber-400 transition-all duration-300'
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
          <span
            id='registerUsername-error'
            className='text-xs text-red-500 font-normal tracking-widest py-0.5 pl-3'
          >
            {errors?.registerUsername?.message}
          </span>
        )}
      </label>

      {/* EMAIL FIELD */}
      <label
        htmlFor='registerEmail'
        className='w-full h-auto flex flex-col gap-1.5 items-start justify-start'
      >
        <p className='flex items-center gap-2 text-base text-neutral-200 font-medium tracking-wider self-start text-start'>
          <span className='text-sm text-amber-400'>
            <MdOutlineEmail aria-hidden='true' />
          </span>
          E-Mail
        </p>

        <input
          type='email'
          name='registerEmail'
          id='registerEmail'
          placeholder='john_doe@gmail.com'
          disabled={isPending}
          aria-required='true'
          aria-invalid={!!errors?.registerEmail}
          aria-describedby={
            errors?.registerEmail ? 'registerEmail-error' : undefined
          }
          className='outline-none border border-neutral-700 w-full h-auto py-1 px-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-neutral-700 placeholder:text-neutral-400 placeholder:text-sm placeholder:font-medium placeholder:tracking-widest bg-black/75 text-white text-sm font-medium tracking-widest caret-amber-400 rounded-md hover:border-amber-400 focus-visible:border-amber-400 transition-all duration-300'
          {...register('registerEmail', {
            required: 'Email field is required.',
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'Invalid email address.',
            },
          })}
        />
        {errors?.registerEmail && (
          <span
            id='registerEmail-error'
            className='text-xs text-red-500 font-normal tracking-widest py-0.5 pl-3'
          >
            {errors?.registerEmail?.message}
          </span>
        )}
      </label>

      {/* PASSWORD FIELD */}
      <label
        htmlFor='registerPassword'
        className='w-full h-auto flex flex-col gap-1.5 items-start justify-start relative'
      >
        <p className='flex items-center gap-2 text-base text-neutral-200 font-medium tracking-wider self-start text-start'>
          <span className='text-sm text-amber-400'>
            <FaShieldAlt aria-hidden='true' />
          </span>
          Password
        </p>

        <input
          type={showPassword ? 'text' : 'password'}
          name='registerPassword'
          id='registerPassword'
          placeholder='your_strong_password'
          disabled={isPending}
          aria-required='true'
          aria-invalid={!!errors?.registerPassword}
          aria-describedby={
            errors?.registerPassword ? 'registerPassword-error' : undefined
          }
          className='outline-none border border-neutral-700 w-full h-auto py-1 px-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-neutral-700 placeholder:text-neutral-400 placeholder:text-sm placeholder:font-medium placeholder:tracking-widest bg-black/75 text-white text-sm font-medium tracking-widest caret-amber-400 rounded-md hover:border-amber-400 focus-visible:border-amber-400 transition-all duration-300'
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
          <span
            id='registerPassword-error'
            className='text-xs text-red-500 font-normal tracking-widest py-0.5 pl-3'
          >
            {errors?.registerPassword?.message}
          </span>
        )}

        <button
          type='button'
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          title={showPassword ? 'Hide password' : 'Show password'}
          onClick={() => setShowPassword((currentValue) => !currentValue)}
          className={`absolute right-3 ${
            errors?.registerPassword ? 'bottom-[33px]' : 'bottom-[7px]'
          } border-none outline-none text-base text-neutral-400 hover:text-amber-400 focus-visible:text-amber-400 transition-colors duration-300`}
        >
          {showPassword ? (
            <FaRegEyeSlash aria-hidden='true' />
          ) : (
            <FaRegEye aria-hidden='true' />
          )}
        </button>
      </label>

      {/* CONFIRM PASSWORD FIELD */}
      <label
        htmlFor='registerConfirmPassword'
        className='w-full h-auto flex flex-col gap-1.5 items-start justify-start relative'
      >
        <p className='flex items-center gap-2 text-base text-neutral-200 font-medium tracking-wider self-start text-start'>
          <span className='text-sm text-amber-400'>
            <FaShieldAlt aria-hidden='true' />
          </span>
          Confirm Password
        </p>

        <input
          type={showConfirmPassword ? 'text' : 'password'}
          name='registerConfirmPassword'
          id='registerConfirmPassword'
          placeholder='confirm_your_strong_password'
          disabled={isPending}
          aria-required='true'
          aria-invalid={!!errors?.registerConfirmPassword}
          aria-describedby={
            errors?.registerConfirmPassword
              ? 'registerConfirmPassword-error'
              : undefined
          }
          className='outline-none border border-neutral-700 w-full h-auto py-1 px-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-neutral-700 placeholder:text-neutral-400 placeholder:text-sm placeholder:font-medium placeholder:tracking-widest bg-black/75 text-white text-sm font-medium tracking-widest caret-amber-400 rounded-md hover:border-amber-400 focus-visible:border-amber-400 transition-all duration-300'
          {...register('registerConfirmPassword', {
            required: 'Confirm Password field is required.',
            validate: (value) =>
              value === watchPassword || 'The passwords must match.',
          })}
        />
        {errors?.registerConfirmPassword && (
          <span
            id='registerConfirmPassword-error'
            className='text-xs text-red-500 font-normal tracking-widest py-0.5 pl-3'
          >
            {errors?.registerConfirmPassword?.message}
          </span>
        )}

        <button
          type='button'
          aria-label={
            showConfirmPassword
              ? 'Hide confirm password'
              : 'Show confirm password'
          }
          title={
            showConfirmPassword
              ? 'Hide confirm password'
              : 'Show confirm password'
          }
          onClick={() =>
            setShowConfirmPassword((currentValue) => !currentValue)
          }
          className={`absolute right-3 ${
            errors?.registerConfirmPassword ? 'bottom-[33px]' : 'bottom-[7px]'
          } border-none outline-none text-base text-neutral-400 hover:text-amber-400 focus-visible:text-amber-400 transition-colors duration-300`}
        >
          {showConfirmPassword ? (
            <FaRegEyeSlash aria-hidden='true' />
          ) : (
            <FaRegEye aria-hidden='true' />
          )}
        </button>
      </label>

      <div className='w-full h-auto flex flex-col items-center gap-4'>
        <button
          type='submit'
          aria-label='Submit registration form'
          title='Create your account'
          disabled={isPending}
          className='w-full h-auto outline-none border-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-amber-400 py-1.5 px-6 flex items-center justify-center text-center rounded-md bg-amber-400 text-black text-sm font-medium tracking-wider hover:bg-amber-500 focus-visible:bg-amber-500 transition-colors duration-300'
        >
          {isPending ? (
            <SmallLoader
              size='text-xl'
              color='text-black'
            />
          ) : (
            'Create Account'
          )}
        </button>

        <div className='w-full h-auto flex items-center justify-center gap-1.5'>
          <div className='w-full h-px bg-neutral-700' />

          <p className='w-[640px] text-sm text-neutral-400 font-medium tracking-widest text-center'>
            Already have an account?
          </p>

          <div className='w-full h-px bg-neutral-700' />
        </div>

        <button
          type='button'
          aria-label='Go to login page'
          title='Sign in instead'
          disabled={isPending}
          onClick={() => navigate('/login')}
          className='w-full h-auto outline-none border-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-amber-400 py-1.5 px-6 flex items-center justify-center text-center rounded-md bg-amber-400 text-black text-sm font-medium tracking-wider hover:bg-amber-500 focus-visible:bg-amber-500 transition-colors duration-300'
        >
          {isPending ? (
            <SmallLoader
              size='text-xl'
              color='text-black'
            />
          ) : (
            'Sign In Instead'
          )}
        </button>
      </div>
    </form>
  );
}
