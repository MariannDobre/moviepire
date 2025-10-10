import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../hooks/auth/useUser';

import UpdatePublicData from '../components/_auth/UpdatePublicData';
import UpdatePrivateData from '../components/_auth/UpdatePrivateData';
import AccountDetails from '../components/_auth/AccountDetails';
import SmallLoader from '../components/loaders/SmallLoader';
import LazyImage from '../utils/LazyImage';

import { FaGlobe, FaShieldAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const accountButtons = [
  {
    label: 'Public informations',
    value: 'public-informations',
    type: 'button',
    icon: <FaGlobe />,
  },
  {
    label: 'Private informations',
    value: 'private-informations',
    type: 'button',
    icon: <FaShieldAlt />,
  },
  {
    label: 'Account details',
    value: 'account-details',
    type: 'button',
    icon: <MdEmail />,
  },
];

const renderedComponent = {
  'public-informations': <UpdatePublicData />,
  'private-informations': <UpdatePrivateData />,
  'account-details': <AccountDetails />,
};

export default function AccountPage() {
  const [currentView, setCurrentView] = useState('public-informations');
  const { isFetching, isAuthenticated } = useUser();

  if (isFetching) {
    return (
      <div className='w-full h-[calc(100vh-72px)] p-6 flex flex-col items-center justify-center gap-3 bg-yellow-950/45 border border-yellow-500 rounded-md'>
        <p className='text-yellow-500 text-base font-normal tracking-wider text-center'>
          Checking your credentials...
        </p>

        <SmallLoader
          size='text-2xl'
          color='text-yellow-500'
        />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <LazyImage
        asBackground
        src='./authBg.jpg'
        gradient='radial-gradient(circle, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 1))'
        backgroundSize='cover'
        backgroundPosition='center'
        backgroundRepeat='no-repeat'
        className='w-full h-[calc(100vh-72px)] flex items-center justify-center'
      >
        <div className='max-w-[calc(476px*2)] h-auto border border-neutral-700 bg-black/50 backdrop-blur-md p-9 flex flex-col items-center justify-center rounded-md'>
          <h6 className='w-full text-center text-white text-2xl font-medium tracking-wide mb-1.5'>
            Oops, something's missing...
          </h6>

          <p className='w-full text-center text-neutral-400 text-lg font-normal tracking-wider mb-6'>
            This page is available only to authenticated users. Please sign in
            with a verified account to proceed.
          </p>

          <div className='w-full h-auto flex items-center justify-center gap-6'>
            <Link
              to='/login'
              className='outline-none border border-neutral-400 cursor-pointer w-64 h-auto py-2 px-4 flex items-center justify-center text-center rounded-md bg-transparent text-white text-base font-medium tracking-wider hover:bg-white/10 focus-visible::bg-white/10 transition-colors duration-300'
            >
              Login
            </Link>

            <Link
              to='/register'
              className='outline-none border border-neutral-400 cursor-pointer w-64 h-auto py-2 px-4 flex items-center justify-center text-center rounded-md bg-transparent text-white text-base font-medium tracking-wider hover:bg-white/10 focus-visible::bg-white/10 transition-colors duration-300'
            >
              Register
            </Link>
          </div>
        </div>
      </LazyImage>
    );
  }

  return (
    <LazyImage
      asBackground
      src='./authBg.jpg'
      gradient='radial-gradient(circle, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 1))'
      backgroundSize='cover'
      backgroundPosition='center'
      backgroundRepeat='no-repeat'
      className='w-full h-[calc(100vh-72px)] flex items-center justify-center'
    >
      <div className='w-full max-w-[calc(512px*2)] h-auto border border-neutral-700 flex flex-col items-center justify-center gap-6 p-6 rounded-md bg-black/50 backdrop-blur-md'>
        <h6 className='self-start text-start text-white text-2xl font-medium tracking-wide'>
          Account Settings
        </h6>

        <div className='w-full h-auto flex flex-col gap-3 rounded-md'>
          <div className='w-full h-auto bg-black/75 rounded-md p-1.5 grid grid-cols-3 gap-x-3 gap-y-0'>
            {accountButtons.map((btn, index) => (
              <button
                key={index}
                type={btn.type}
                aria-label={`Set the view to ${btn.value}`}
                value={btn.value}
                onClick={() => setCurrentView(btn.value)}
                className={`group flex items-center justify-center gap-1.5 ${
                  currentView === btn.value
                    ? 'text-white bg-neutral-50/20 shadow-sm'
                    : 'text-neutral-400 bg-transparent shadow-none'
                } outline-none border-none cursor-pointer rounded-md w-full h-full py-1.5 px-3 text-sm font-medium tracking-wider text-center hover:bg-neutral-50/25 focus-visible:bg-neutral-50/25 transition-colors duration-300`}
              >
                <span
                  className={`text-lg ${
                    currentView === btn.value
                      ? 'text-amber-400'
                      : 'text-neutral-400'
                  } transition-colors duration-300`}
                >
                  {btn.icon}
                </span>
                {btn.label}
              </button>
            ))}
          </div>

          {/* MAIN VIEW */}
          <div className='w-full h-auto bg-neutral-700/50 rounded-md p-[18px] flex flex-col gap-3'>
            {renderedComponent[currentView]}
          </div>
        </div>
      </div>
    </LazyImage>
  );
}
