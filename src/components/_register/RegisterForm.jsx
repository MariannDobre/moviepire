import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRegister } from '../../hooks/auth/mutations/useRegister';

import SmallLoader from '../loaders/SmallLoader';

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
      className='w-full max-w-[640px] h-auto flex flex-col items-center justify-center gap-3 lg:gap-6 p-3 lg:p-6 rounded-md lg:rounded-lg shadow-sm bg-black/75 backdrop-blur-md border border-neutral-500'
    >
      <div className='w-full h-auto flex flex-col items-center justify-center gap-1.5 lg:gap-3'>
        <h6 className='flex items-center justify-center gap-3 text-base md:text-lg lg:text-xl text-white font-medium tracking-wide'>
          <span className='w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 flex items-center justify-center text-base lg:text-xl xl:text-2xl text-white bg-gradient-to-br from-indigo-500 to-blue-400 rounded-md xl:rounded-lg shadow-sm'>
            <FaFilm />
          </span>
          Create Account
        </h6>

        <p className='text-xs md:text-sm lg:text-base text-gray-400 font-normal tracking-wide text-center'>
          Start your cinematic journey today
          <br />
          Join thousands of movie enthusiasts
        </p>
      </div>

      <label
        htmlFor='registerUsername'
        className='w-full h-auto flex flex-col gap-1.5'
      >
        <p className='self-start w-full flex items-center gap-1.5 text-sm md:text-base lg:text-lg text-white font-normal tracking-wide'>
          <span className='text-blue-400'>
            <FaUser />
          </span>
          Username
        </p>

        <input
          type='text'
          name='registerUsername'
          id='registerUsername'
          placeholder='John Doe'
          disabled={isPending}
          className='outline-none border border-neutral-500 disabled:border-neutral-500 disabled:cursor-not-allowed disabled:opacity-75 w-full h-auto py-1 lg:py-1.5 px-2 lg:px-3 rounded-sm lg:rounded-md shadow-sm bg-neutral-800 text-xs md:text-sm text-white font-normal tracking-wider placeholder:text-xs md:placeholder:text-sm placeholder:text-neutral-500 placeholder:font-normal placeholder:tracking-wider caret-blue-400 hover:border-blue-400 focus-visible:border-blue-400 hover:shadow-lg focus-visible:shadow-lg selection:bg-blue-400 selection:text-white transition-all duration-500'
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
          <span className='py-0.5 md:my-1.5 ml-2 md:ml-3 text-red-500 text-xs md:text-sm font-normal tracking-wider'>
            {errors?.registerUsername?.message}
          </span>
        )}
      </label>

      <label
        htmlFor='registerEmail'
        className='w-full h-auto flex flex-col gap-1.5'
      >
        <p className='self-start w-full flex items-center gap-1.5 text-sm md:text-base lg:text-lg text-white font-normal tracking-wide'>
          <span className='text-blue-400'>
            <MdOutlineEmail />
          </span>
          E-Mail
        </p>

        <input
          type='email'
          name='registerEmail'
          id='registerEmail'
          placeholder='john_doe@gmail.com'
          disabled={isPending}
          className='outline-none border border-neutral-500 disabled:border-neutral-500 disabled:cursor-not-allowed disabled:opacity-75 w-full h-auto py-1 lg:py-1.5 px-2 lg:px-3 rounded-sm lg:rounded-md shadow-sm bg-neutral-800 text-xs md:text-sm text-white font-normal tracking-wider placeholder:text-xs md:placeholder:text-sm placeholder:text-neutral-500 placeholder:font-normal placeholder:tracking-wider caret-blue-400 hover:border-blue-400 focus-visible:border-blue-400 hover:shadow-lg focus-visible:shadow-lg selection:bg-blue-400 selection:text-white transition-all duration-500'
          {...register('registerEmail', {
            required: 'Email field is required.',
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: 'Invalid email address.',
            },
          })}
        />
        {errors?.registerEmail && (
          <span className='py-0.5 md:my-1.5 ml-2 md:ml-3 text-red-500 text-xs md:text-sm font-normal tracking-wider'>
            {errors?.registerEmail?.message}
          </span>
        )}
      </label>

      <label
        htmlFor='registerPassword'
        className='w-full h-auto flex flex-col gap-1.5 relative'
      >
        <p className='self-start w-full flex items-center gap-1.5 text-sm md:text-base lg:text-lg text-white font-normal tracking-wide'>
          <span className='text-blue-400'>
            <FaShieldAlt />
          </span>
          Password
        </p>

        <input
          type={showPassword ? 'text' : 'password'}
          name='registerPassword'
          id='registerPassword'
          placeholder='your_strong_password'
          disabled={isPending}
          className='outline-none border border-neutral-500 disabled:border-neutral-500 disabled:cursor-not-allowed disabled:opacity-75 w-full h-auto py-1 lg:py-1.5 px-2 lg:px-3 rounded-sm lg:rounded-md shadow-sm bg-neutral-800 text-xs md:text-sm text-white font-normal tracking-wider placeholder:text-xs md:placeholder:text-sm placeholder:text-neutral-500 placeholder:font-normal placeholder:tracking-wider caret-blue-400 hover:border-blue-400 focus-visible:border-blue-400 hover:shadow-lg focus-visible:shadow-lg selection:bg-blue-400 selection:text-white transition-all duration-500'
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
          <span className='py-0.5 md:my-1.5 ml-2 md:ml-3 text-red-500 text-xs md:text-sm font-normal tracking-wider'>
            {errors?.registerPassword?.message}
          </span>
        )}

        <button
          type='button'
          onClick={() => setShowPassword((currentValue) => !currentValue)}
          className={`absolute right-3 ${
            errors?.registerPassword
              ? 'bottom-[33px] md:bottom-[48px]'
              : 'bottom-1.5 md:bottom-2.5'
          } border-none outline-none text-base text-neutral-500 hover:text-blue-400 focus-visible:text-blue-400 transition-all duration-500`}
        >
          {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
        </button>
      </label>

      <label
        htmlFor='registerConfirmPassword'
        className='w-full h-auto flex flex-col gap-1.5 relative'
      >
        <p className='self-start w-full flex items-center gap-1.5 text-sm md:text-base lg:text-lg text-white font-normal tracking-wide'>
          <span className='text-blue-400'>
            <FaShieldAlt />
          </span>
          Confirm Password
        </p>

        <input
          type={showConfirmPassword ? 'text' : 'password'}
          name='registerConfirmPassword'
          id='registerConfirmPassword'
          placeholder='confirm_your_strong_password'
          disabled={isPending}
          className='outline-none border border-neutral-500 disabled:border-neutral-500 disabled:cursor-not-allowed disabled:opacity-75 w-full h-auto py-1 lg:py-1.5 px-2 lg:px-3 rounded-sm lg:rounded-md shadow-sm bg-neutral-800 text-xs md:text-sm text-white font-normal tracking-wider placeholder:text-xs md:placeholder:text-sm placeholder:text-neutral-500 placeholder:font-normal placeholder:tracking-wider caret-blue-400 hover:border-blue-400 focus-visible:border-blue-400 hover:shadow-lg focus-visible:shadow-lg selection:bg-blue-400 selection:text-white transition-all duration-500'
          {...register('registerConfirmPassword', {
            required: 'Confirm Password field is required.',
            validate: (value) =>
              value === watchPassword || 'The passwords must match.',
          })}
        />
        {errors?.registerConfirmPassword && (
          <span className='py-0.5 md:my-1.5 ml-2 md:ml-3 text-red-500 text-xs md:text-sm font-normal tracking-wider'>
            {errors?.registerConfirmPassword?.message}
          </span>
        )}

        <button
          type='button'
          onClick={() =>
            setShowConfirmPassword((currentValue) => !currentValue)
          }
          className={`absolute right-3 ${
            errors?.registerConfirmPassword
              ? 'bottom-[33px] md:bottom-[48px]'
              : 'bottom-1.5 md:bottom-2.5'
          } border-none outline-none text-base text-neutral-500 hover:text-blue-400 focus-visible:text-blue-400 transition-all duration-500`}
        >
          {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
        </button>
      </label>

      <button
        type='submit'
        disabled={isPending}
        className='outline-none border-none w-full h-auto cursor-pointer disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-75 py-1 px-3 lg:py-1.5 lg:px-6 text-xs md:text-sm lg:text-base text-white font-normal tracking-wider lg:tracking-wide text-center rounded-sm lg:rounded-md shadow-sm bg-blue-400 hover:bg-blue-500 focus-visible:bg-blue-500 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
      >
        {isPending ? (
          <SmallLoader
            size='text-2xl'
            color='text-blue-400'
          />
        ) : (
          'Create Account'
        )}
      </button>

      <div className='w-full h-auto flex items-center justify-center gap-1.5 lg:gap-3'>
        <div className='w-full h-px bg-neutral-500' />

        <p className='w-[640px] text-xs lg:text-sm text-gray-400 font-normal tracking-wider text-center selection:bg-blue-400 selection:text-white'>
          Already have an account?
        </p>

        <div className='w-full h-px bg-neutral-500' />
      </div>

      <button
        type='button'
        disabled={isPending}
        onClick={() => navigate('/login')}
        className='outline-none border-none w-full h-auto cursor-pointer disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed disabled:opacity-75 py-1 px-3 lg:py-1.5 lg:px-6 text-xs md:text-sm lg:text-base text-white font-normal tracking-wider lg:tracking-wide text-center rounded-sm lg:rounded-md shadow-sm bg-blue-400 hover:bg-blue-500 focus-visible:bg-blue-500 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
      >
        {isPending ? (
          <SmallLoader
            size='text-2xl'
            color='text-blue-400'
          />
        ) : (
          'Sign In Instead'
        )}
      </button>
    </form>
  );
}
