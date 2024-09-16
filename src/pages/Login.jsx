import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLogin } from '../hooks/auth/mutations/useLogin';
import { useUser } from '../hooks/auth/useUser';
import SmallLoader from '../components/loaders/SmallLoader';

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { loginUser, isPending } = useLogin();
  const { isAuthenticated } = useUser();

  // the handler that will submit the data to the supabase client
  const onSubmit = ({ loginEmail, loginPassword }) => {
    loginUser({ loginEmail, loginPassword }, { onSettled: () => reset() });
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
              className='text-sm text-stone-200 tracking-wider pl-3'
              htmlFor='loginEmail'
            >
              Email
            </label>

            <input
              className='w-96 py-2 px-3 rounded-md shadow-lg tracking-wide caret-red-400 outline outline-1 outline-transparent border-none text-base text-stone-200 bg-neutral-800 placeholder-neutral-400/50 focus-visible:outline-red-400 transition-all duration-500 disabled:outline-gray-500/25 disabled:bg-neutral-900 disabled:text-gray-500/75 disabled:cursor-not-allowed'
              type='email'
              id='loginEmail'
              placeholder='example@gmail.com'
              disabled={isPending}
              {...register('loginEmail', {
                required: 'Email field is required.',
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: 'Invalid email address.',
                },
              })}
            />
            {errors?.loginEmail && (
              <span className='py-1 pl-3 text-sm tracking-wider text-red-500'>
                {errors?.loginEmail?.message}
              </span>
            )}
          </div>

          <div className='flex flex-col gap-1'>
            <label
              className='text-sm text-stone-200 tracking-wider pl-3'
              htmlFor='loginPassword'
            >
              Password
            </label>

            <input
              className='w-96 py-2 px-3 rounded-md shadow-lg tracking-wide caret-red-400 outline outline-1 outline-transparent border-none text-base text-stone-200 bg-neutral-800 placeholder-neutral-400/50 focus-visible:outline-red-400 transition-all duration-500 disabled:outline-gray-500/25 disabled:bg-neutral-900 disabled:text-gray-500/75 disabled:cursor-not-allowed'
              type='password'
              id='loginPassword'
              placeholder='mypassword'
              disabled={isPending}
              {...register('loginPassword', {
                required: 'Password field is required.',
              })}
            />
            {errors?.loginPassword && (
              <span className='py-1 pl-3 text-sm tracking-wider text-red-500'>
                {errors?.loginPassword?.message}
              </span>
            )}
          </div>

          <div className='flex flex-col gap-3 items-center w-full'>
            <button
              className='outline outline-1 outline-transparent border-none text-base tracking-wide font-medium bg-red-400 text-stone-200 w-full rounded-md shadow-lg py-2 px-3 hover:bg-red-500 hover:text-stone-100 focus-visible:bg-red-500 focus-visible:text-stone-100 transition-all duration-300 disabled:outline-gray-500/25 disabled:bg-neutral-900 disabled:text-gray-500/75 disabled:cursor-not-allowed'
              type='submit'
              disabled={isPending}
            >
              {isPending ? <SmallLoader /> : 'Sign In'}
            </button>

            <div className='flex items-center gap-3 w-full'>
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
            You`re currently logged into your account. If you need to switch
            accounts, please log out first. Otherwise, feel free to continue
            browsing or head over to your profile to manage your account.
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

export default Login;
