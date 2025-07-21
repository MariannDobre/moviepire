import React from 'react';
import { useUser } from '../hooks/auth/useUser';
import { useNavigate } from 'react-router-dom';

import SmallLoader from '../components/loaders/SmallLoader';

import { MdOutlineEmail } from 'react-icons/md';

export default function ConfirmEmail() {
  const navigate = useNavigate();
  const { user, isAuthenticated, isFetching } = useUser();

  if (isFetching)
    return (
      <div className='w-full h-[calc(100vh-48px-48px-80px)] p-6 flex flex-col items-center justify-center gap-3 bg-neutral-50/10 border border-yellow-700 rounded-lg shadow-sm'>
        <p className='text-yellow-500 text-lg font-normal tracking-wide text-center'>
          Checking if there is any user session...
        </p>

        <SmallLoader
          size='text-2xl'
          color='text-yellow-700'
        />
      </div>
    );

  return (
    <section
      style={{
        background: `
                radial-gradient(
                 circle,
                 rgba(0, 0, 0, 0) 25%,
                 rgba(0, 0, 0, 1) 95%
                ),
                linear-gradient(
                 to bottom,
                 rgba(0, 0, 0, 1),
                 rgba(0, 0, 0, 0.6),
                 rgba(0, 0, 0, 0.4),
                 rgba(0, 0, 0, 0.2),
                 rgba(0, 0, 0, 0.4),
                 rgba(0, 0, 0, 0.6),
                 rgba(0, 0, 0, 1)
                ),
                url(https://www.themoviedb.org/t/p/original/7Pv3ocLAj1BfcdUUsslMYyDMYXK.jpg) no-repeat center / cover
              `,
      }}
      className='w-full h-[calc(100vh-80px-48px-48px)] flex flex-col items-center justify-center'
    >
      {user && isAuthenticated ? (
        <div className='w-full max-w-[760px] h-auto flex flex-col items-center justify-center gap-6 p-6 rounded-lg shadow-sm bg-black/75 backdrop-blur-md border border-neutral-500'>
          <div className='w-16 h-16 flex items-center justify-center rounded-full shadow-sm'>
            <span className='w-full h-full flex items-center justify-center rounded-full drop-shadow-sm bg-blue-400 text-3xl text-white'>
              <MdOutlineEmail />
            </span>
          </div>

          <div className='w-full h-auto flex flex-col items-center gap-1.5'>
            <h6 className='text-2xl text-white font-medium tracking-wide text-center'>
              Email already verified
            </h6>

            <p className='text-neutral-400 text-base font-normal tracking-wide text-center'>
              The email for the account name&nbsp;
              <span className='text-blue-400 italic'>
                "{user?.user_metadata?.username}"
              </span>
              &nbsp;is already verified
            </p>
          </div>

          <button
            type='button'
            onClick={() => navigate('/')}
            className='outline-none border-none w-auto h-auto flex items-center justify-center text-center cursor-pointer bg-blue-400 text-white text-base font-normal tracking-wide py-1.5 px-6 rounded-md shadow-sm hover:bg-blue-500 focus-visible:bg-blue-500 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
          >
            Home Page
          </button>
        </div>
      ) : !user ? (
        <div className='w-full max-w-[760px] h-auto flex flex-col items-center justify-center gap-6 p-6 rounded-lg shadow-sm bg-black/75 backdrop-blur-md border border-neutral-500'>
          <div className='w-16 h-16 flex items-center justify-center rounded-full shadow-sm'>
            <span className='w-full h-full flex items-center justify-center rounded-full drop-shadow-sm bg-blue-400 text-3xl text-white'>
              <MdOutlineEmail />
            </span>
          </div>

          <div className='w-full h-auto flex flex-col items-center gap-1.5'>
            <h6 className='text-2xl text-white font-medium tracking-wide text-center'>
              Join to unlock all features
            </h6>

            <p className='text-neutral-400 text-base font-normal tracking-wide text-center'>
              You haven't created an account yet. To unlock diary, rating,
              favorites, and profile features, please create an account and
              confirm your email address.
              <br />
              Meanwhile, you can continue browsing the app as a guest.
            </p>
          </div>

          <button
            type='button'
            onClick={() => navigate('/register')}
            className='outline-none border-none w-auto h-auto flex items-center justify-center text-center cursor-pointer bg-blue-400 text-white text-base font-normal tracking-wide py-1.5 px-6 rounded-md shadow-sm hover:bg-blue-500 focus-visible:bg-blue-500 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
          >
            Create Account
          </button>
        </div>
      ) : (
        <div className='w-full max-w-[760px] h-auto flex flex-col items-center justify-center gap-6 p-6 rounded-lg shadow-sm bg-black/75 backdrop-blur-md border border-neutral-500'>
          <div className='w-16 h-16 flex items-center justify-center rounded-full shadow-sm'>
            <span className='w-full h-full flex items-center justify-center rounded-full drop-shadow-sm bg-blue-400 text-3xl text-white'>
              <MdOutlineEmail />
            </span>
          </div>

          <div className='w-full h-auto flex flex-col items-center gap-1.5'>
            <h6 className='text-2xl text-white font-medium tracking-wide text-center'>
              Email verification required
            </h6>

            <p className='text-neutral-400 text-base font-normal tracking-wide text-center'>
              Visit your email inbox and confirm your email to proceed
              <br />
              We've sent a confirmation link to your email address. Click the
              link to verify your account and continue.
              <br />
              You can still use the app for free, but without some features.
            </p>
          </div>

          <button
            type='button'
            onClick={() => navigate('/')}
            className='outline-none border-none w-auto h-auto flex items-center justify-center text-center cursor-pointer bg-blue-400 text-white text-base font-normal tracking-wide py-1.5 px-6 rounded-md shadow-sm hover:bg-blue-500 focus-visible:bg-blue-500 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
          >
            Home Page
          </button>
        </div>
      )}
    </section>
  );
}
