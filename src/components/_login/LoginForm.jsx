import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLogin } from '../../hooks/auth/mutations/useLogin';

import SmallLoader from '../loaders/SmallLoader';

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
  const navigate = useNavigate();

  const onSubmit = ({ loginEmail, loginPassword }) => {
    loginUser({ loginEmail, loginPassword }, { onSettled: () => reset() });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full max-w-[640px] h-auto flex flex-col items-center justify-center gap-6 p-6 rounded-lg shadow-sm bg-black/75 backdrop-blur-md border border-neutral-500'
    >
      <div className='w-full h-auto flex flex-col items-center justify-center gap-3'>
        <h6 className='flex items-center justify-center gap-3 text-xl text-white font-medium tracking-wide'>
          <span className='w-12 h-12 flex items-center justify-center text-2xl text-white bg-gradient-to-br from-indigo-500 to-blue-400 rounded-lg shadow-sm'>
            <FaFilm />
          </span>
          Sign In
        </h6>

        <p className='text-base text-gray-400 font-normal tracking-wide text-center'>
          Welcome back to your cinematic journey
          <br />
          Enter your credentials to access your account
        </p>
      </div>

      <label
        htmlFor='loginEmail'
        className='w-full h-auto flex flex-col gap-1.5'
      >
        <p className='self-start w-full flex items-center gap-1.5 text-lg text-white font-normal tracking-wide'>
          <span className='text-blue-400'>
            <MdOutlineEmail />
          </span>
          E-Mail
        </p>

        <input
          type='email'
          name='loginEmail'
          id='loginEmail'
          placeholder='john_doe@gmail.com'
          disabled={isPending}
          className='outline-none border border-neutral-500 disabled:border-neutral-500 disabled:cursor-not-allowed disabled:opacity-75 w-full h-auto py-1.5 px-3 rounded-md shadow-sm bg-neutral-800 text-sm text-white font-normal tracking-wider placeholder:text-sm placeholder:text-neutral-500 placeholder:font-normal placeholder:tracking-wider caret-blue-400 hover:border-blue-400 focus-visible:border-blue-400 hover:shadow-lg focus-visible:shadow-lg selection:bg-blue-400 selection:text-white transition-all duration-500'
          {...register('loginEmail', {
            required: 'Email field is required.',
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'Invalid email address.',
            },
          })}
        />
        {errors?.loginEmail && (
          <span className='my-1.5 ml-3 text-red-500 text-sm font-normal tracking-wider'>
            {errors?.loginEmail?.message}
          </span>
        )}
      </label>

      <label
        htmlFor='loginPassword'
        className='w-full h-auto flex flex-col gap-1.5 relative'
      >
        <p className='self-start w-full flex items-center gap-1.5 text-lg text-white font-normal tracking-wide'>
          <span className='text-blue-400'>
            <FaShieldAlt />
          </span>
          Password
        </p>

        <input
          type={showPassword ? 'text' : 'password'}
          name='loginPassword'
          id='loginPassword'
          placeholder='my_strong_password'
          disabled={isPending}
          className='outline-none border border-neutral-500 disabled:border-neutral-500 disabled:cursor-not-allowed disabled:opacity-75 w-full h-auto py-1.5 px-3 rounded-md shadow-sm bg-neutral-800 text-sm text-white font-normal tracking-wider placeholder:text-sm placeholder:text-neutral-500 placeholder:font-normal placeholder:tracking-wider caret-blue-400 hover:border-blue-400 focus-visible:border-blue-400 hover:shadow-lg focus-visible:shadow-lg selection:bg-blue-400 selection:text-white transition-all duration-500'
          {...register('loginPassword', {
            required: 'Password field is required.',
          })}
        />
        {errors?.loginPassword && (
          <span className='my-1.5 ml-3 text-red-500 text-sm font-normal tracking-wider'>
            {errors?.loginPassword?.message}
          </span>
        )}

        <button
          type='button'
          onClick={() => setShowPassword((currentValue) => !currentValue)}
          className={`absolute right-3 ${
            errors?.loginPassword ? 'bottom-[50px]' : 'bottom-3'
          } border-none outline-none text-base text-neutral-500 hover:text-blue-400 focus-visible:text-blue-400 transition-all duration-500`}
        >
          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
        </button>
      </label>

      <button
        type='submit'
        disabled={isPending}
        className='outline-none border-none w-full h-auto cursor-pointer disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-75 py-1.5 px-6 text-base text-white font-normal tracking-wide text-center rounded-md shadow-sm bg-blue-400 hover:bg-blue-500 focus-visible:bg-blue-500 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
      >
        {isPending ? (
          <SmallLoader
            size='text-2xl'
            color='text-blue-400'
          />
        ) : (
          'Sign In'
        )}
      </button>

      <div className='w-full h-auto flex items-center justify-center gap-3'>
        <div className='w-full h-px bg-neutral-500' />

        <p className='w-[640px] text-sm text-gray-400 font-normal tracking-wider text-center selection:bg-blue-400 selection:text-white'>
          Don't have an account yet?
        </p>

        <div className='w-full h-px bg-neutral-500' />
      </div>

      <button
        type='button'
        disabled={isPending}
        onClick={() => navigate('/register')}
        className='outline-none border-none w-full h-auto cursor-pointer disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-75 py-1.5 px-6 text-base text-white font-normal tracking-wide text-center rounded-md shadow-sm bg-blue-400 hover:bg-blue-500 focus-visible:bg-blue-500 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
      >
        {isPending ? (
          <SmallLoader
            size='text-2xl'
            color='text-blue-400'
          />
        ) : (
          'Create an Account'
        )}
      </button>
    </form>
  );
}
