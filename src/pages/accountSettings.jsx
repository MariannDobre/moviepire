import React, { useState } from 'react';
import UpdatePublicData from '../auth/UpdatePublicData';
import UpdatePrivateData from '../auth/UpdatePrivateData';
import AccoutEmail from '../auth/AccoutEmail';
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
    label: 'Account email',
    value: 'account-email',
    type: 'button',
    icon: <MdEmail />,
    componentToRender: <AccoutEmail />,
  },
];

function AccountSettings() {
  const [selectSetting, setSelectSetting] = useState('public-informations');
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
    </div>
  );
}

export default AccountSettings;
