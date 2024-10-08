import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/auth/useUser';
import UpdatePublicData from '../auth/UpdatePublicData';
import UpdatePrivateData from '../auth/UpdatePrivateData';
import AccountDetails from '../auth/AccountDetails';
import { FaGlobe, FaShieldAlt } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const settingsButtons = [
  {
    label: 'Public informations',
    value: 'public-informations',
    type: 'button',
    icon: <FaGlobe />,
    componentToRender: <UpdatePublicData />,
  },
  {
    label: 'Private informations',
    value: 'private-informations',
    type: 'button',
    icon: <FaShieldAlt />,
    componentToRender: <UpdatePrivateData />,
  },
  {
    label: 'Account details',
    value: 'account-details',
    type: 'button',
    icon: <MdEmail />,
    componentToRender: <AccountDetails />,
  },
];

function AccountSettings() {
  const navigate = useNavigate();
  // state to control what form should be displayed
  const [selectSetting, setSelectSetting] = useState('public-informations');
  // custom hook call to render dynamically the UI based if the user is logged in or is using the app without an account
  const { isAuthenticated } = useUser();
  // derived state to dynamically render the UI according to the selected button
  const { value, label, componentToRender } = settingsButtons.find(
    ({ value }) => selectSetting === value
  );

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
      {isAuthenticated ? (
        <div className='w-[1280px] h-[560px] bg-black/85 flex p-6 outline outline-1 outline-neutral-800 rounded-md shadow-lg'>
          <div className='w-[400px] flex flex-col gap-6 border-r border-neutral-800'>
            <h1 className='text-lg text-stone-200 tracking-wide'>
              Choose what do you want to modify
            </h1>

            <div className='flex flex-col items-start gap-3'>
              {settingsButtons.map(({ label, value, type, icon }, index) => (
                <button
                  className={`flex items-start gap-2 text-stone-400 ${
                    selectSetting === value && 'text-stone-300 bg-neutral-50/10'
                  } text-sm tracking-wider outline outline-1 outline-transparent rounded-md shadow-lg border-none p-2 hover:bg-neutral-50/20 hover:outline-neutral-800 focus-visible:bg-neutral-50/20 focus-visible:outline-neutral-800 transition-all duration-300`}
                  key={index}
                  type={type}
                  onClick={() => setSelectSetting(value)}
                >
                  <span
                    className={`text-lg ${
                      selectSetting === value && 'text-red-400'
                    }`}
                  >
                    {icon}
                  </span>
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{ width: 'calc(1280px - 400px - 48px)' }}
            className='flex flex-col gap-3 pl-6'
          >
            <h1 className='text-lg text-stone-200 tracking-wide'>
              {selectSetting === value && `${label}`}
            </h1>

            <div>{selectSetting === value && componentToRender}</div>
          </div>
        </div>
      ) : (
        <div className='w-[1280px] flex flex-col gap-3 items-center justify-center rounded-md shadow-lg bg-neutral-400/20 backdrop-blur p-6 border-none outline outline-1 outline-neutral-800'>
          <p className='text-stone-200 text-lg tracking-wider text-center'>
            To view the content of this page, please sign in to your account. If
            you don't have an account, feel free to create one—it's quick and
            easy! By logging in, you'll gain access to personalized features and
            a better overall experience.
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

export default AccountSettings;
