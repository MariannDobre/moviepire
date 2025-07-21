import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/auth/useUser';

import UpdatePublicData from '../auth/UpdatePublicData';
import UpdatePrivateData from '../auth/UpdatePrivateData';
import AccountDetails from '../auth/AccountDetails';

import { FaGlobe, FaShieldAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useState } from 'react';

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

export default function Account() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  const [currentView, setCurrentView] = useState('public-informations');

  if (!isAuthenticated) {
    return (
      <div
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
                url(authBg.jpg) no-repeat center / cover
              `,
        }}
        className='w-full h-[calc(100vh-80px-48px-48px)] flex flex-col items-center justify-center gap-3'
      >
        <div className='w-full max-w-[760px] h-auto p-6 flex flex-col items-center justify-center gap-3 rounded-lg shadow-sm bg-black/75 backdrop-blur-md border border-neutral-500'>
          <p className='text-white text-lg font-medium tracking-wider text-center'>
            To fully engage with this page and unlock the complete features of
            the app, please log in with your verified account.
          </p>

          <div className='w-full max-w-[760px] flex items-center justify-between gap-3'>
            <button
              type='button'
              onClick={() => navigate('/')}
              className='w-full h-auto outline-none border-none cursor-pointer flex items-center justify-center text-center text-white text-base font-normal tracking-wide bg-blue-400 py-1.5 px-6 rounded-md shadow-sm hover:bg-blue-500 focus-visible:bg-blue-500 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
            >
              Home Page
            </button>

            <button
              type='button'
              onClick={() => navigate('/login')}
              className='w-full h-auto outline-none border-none cursor-pointer flex items-center justify-center text-center text-white text-base font-normal tracking-wide bg-blue-400 py-1.5 px-6 rounded-md shadow-sm hover:bg-blue-500 focus-visible:bg-blue-500 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    );
  }

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
                url(authBg.jpg) no-repeat center / cover
              `,
      }}
      className='w-full h-[calc(100vh-80px-48px-48px)] flex flex-col items-center justify-center'
    >
      <div className='w-full max-w-[800px] h-auto flex flex-col items-center justify-center gap-6 p-6 rounded-lg shadow-sm bg-black/75 backdrop-blur-md border border-neutral-500 transition-all duration-500'>
        <h6 className='self-start text-start text-2xl text-white font-medium tracking-wide'>
          Account Settings
        </h6>

        <div className='w-full h-auto flex flex-col gap-3 rounded-md'>
          <div className='w-full h-auto bg-neutral-800/90 rounded-md shadow-sm p-1.5 grid grid-cols-3 gap-x-3'>
            {accountButtons.map((btn, index) => (
              <button
                key={index}
                type={btn.type}
                value={btn.value}
                onClick={() => setCurrentView(btn.value)}
                className={`group flex items-center justify-center gap-1.5 ${
                  currentView === btn.value
                    ? 'text-white bg-gray-50/20 shadow-sm'
                    : 'text-gray-400 bg-transparent shadow-none'
                } outline-none border-none cursor-pointer rounded-md w-full h-full py-1.5 px-3 text-sm font-medium tracking-wider text-center hover:bg-neutral-50/10 focus-visible:bg-neutral-50/10 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500`}
              >
                <span
                  className={`text-lg ${
                    currentView === btn.value
                      ? 'text-blue-400'
                      : 'text-gray-200'
                  } transition-all duration-500`}
                >
                  {btn.icon}
                </span>
                {btn.label}
              </button>
            ))}
          </div>

          {/* MAIN VIEW */}
          <div className='w-full h-auto bg-neutral-800/90 rounded-md shadow-sm p-[18px] flex flex-col gap-3'>
            {renderedComponent[currentView]}
          </div>
        </div>
      </div>
    </section>
  );
}
