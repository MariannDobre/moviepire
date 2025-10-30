import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLogin } from '../../hooks/auth/mutations/useLogin';
import { Link } from 'react-router-dom';

import SmallLoader from '../../interface/_loaders/SmallLoader';

import { FaFilm, FaShieldAlt, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { MdOutlineEmail } from 'react-icons/md';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { loginUser, isPending } = useLogin();

  const onSubmit = ({ loginEmail, loginPassword }) => {
    loginUser({ loginEmail, loginPassword }, { onSettled: () => reset() });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      aria-label='Login form'
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
          Sign In
        </h6>

        <p className='w-full h-auto text-neutral-400 text-base font-normal tracking-wide text-center'>
          Welcome back to your cinematic journey
          <br />
          Enter your credentials to access your account
        </p>
      </div>

      {/* EMAIL FIELD */}
      <label
        htmlFor='loginEmail'
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
          id='loginEmail'
          name='loginEmail'
          placeholder='john_doe@gmail.com'
          disabled={isPending}
          aria-required='true'
          aria-invalid={!!errors?.loginEmail}
          aria-describedby={errors?.loginEmail ? 'loginEmail-error' : undefined}
          className='outline-none border border-neutral-700 w-full h-auto py-1 px-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-neutral-700 placeholder:text-neutral-400 placeholder:text-sm placeholder:font-medium placeholder:tracking-widest bg-black/75 text-white text-sm font-medium tracking-widest caret-amber-400 rounded-md hover:border-amber-400 focus-visible:border-amber-400 transition-all duration-300'
          {...register('loginEmail', {
            required: 'Email field is required.',
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'Invalid email address.',
            },
          })}
        />
        {errors?.loginEmail && (
          <span
            id='loginEmail-error'
            className='text-xs text-red-500 font-normal tracking-widest py-0.5 pl-3'
          >
            {errors?.loginEmail?.message}
          </span>
        )}
      </label>

      {/* PASSWORD FIELD */}
      <label
        htmlFor='loginPassword'
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
          id='loginPassword'
          name='loginPassword'
          placeholder='my_strong_password'
          disabled={isPending}
          aria-required='true'
          aria-invalid={!!errors?.loginPassword}
          aria-describedby={
            errors?.loginPassword ? 'loginPassword-error' : undefined
          }
          className='outline-none border border-neutral-700 w-full h-auto py-1 px-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-neutral-700 placeholder:text-neutral-400 placeholder:text-sm placeholder:font-medium placeholder:tracking-widest bg-black/75 text-white text-sm font-medium tracking-widest caret-amber-400 rounded-md hover:border-amber-400 focus-visible:border-amber-400 transition-all duration-300'
          {...register('loginPassword', {
            required: 'Password field is required.',
          })}
        />
        {errors?.loginPassword && (
          <span
            id='loginPassword-error'
            className='text-xs text-red-500 font-normal tracking-widest py-0.5 pl-3'
          >
            {errors?.loginPassword?.message}
          </span>
        )}

        <button
          type='button'
          aria-label={
            showPassword ? 'Hide password text' : 'Show password text'
          }
          title={showPassword ? 'Hide password' : 'Show password'}
          onClick={() => setShowPassword((currentValue) => !currentValue)}
          className={`absolute right-3 ${
            errors?.loginPassword ? 'bottom-[33px]' : 'bottom-[7px]'
          } border-none outline-none text-base text-neutral-400 hover:text-amber-400 focus-visible:text-amber-400 transition-colors duration-300`}
        >
          {showPassword ? (
            <FaRegEyeSlash aria-hidden='true' />
          ) : (
            <FaRegEye aria-hidden='true' />
          )}
        </button>
      </label>

      {/* ACTIONS BUTTONS SECTION */}
      <div className='w-full h-auto flex flex-col items-center gap-4'>
        <button
          type='submit'
          aria-label='Sign in to your account'
          title='Sign in to your account'
          disabled={isPending}
          className='w-full h-auto outline-none border-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-amber-400 py-1.5 px-6 flex items-center justify-center text-center rounded-md bg-amber-400 text-black text-sm font-medium tracking-wider hover:bg-amber-500 focus-visible:bg-amber-500 transition-colors duration-300'
        >
          {isPending ? (
            <SmallLoader
              size='text-xl'
              color='text-black'
            />
          ) : (
            'Sign In'
          )}
        </button>

        <div className='w-full h-auto flex items-center justify-center gap-1.5'>
          <div className='w-full h-px bg-neutral-700' />

          <p className='w-[640px] text-sm text-neutral-400 font-medium tracking-widest text-center'>
            Don't have an account yet?
          </p>

          <div className='w-full h-px bg-neutral-700' />
        </div>

        <Link
          to='/register'
          aria-label='Go to registration page to create a new account'
          title='Create a new account'
          disabled={isPending}
          className='w-full h-auto outline-none border-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-amber-400 py-1.5 px-6 flex items-center justify-center text-center rounded-md bg-amber-400 text-black text-sm font-medium tracking-wider hover:bg-amber-500 focus-visible:bg-amber-500 transition-colors duration-300'
        >
          {isPending ? (
            <SmallLoader
              size='text-xl'
              color='text-black'
            />
          ) : (
            'Create an Account'
          )}
        </Link>
      </div>
    </form>
  );
}
