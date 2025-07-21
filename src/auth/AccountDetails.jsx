import React from 'react';
import { useUser } from '../hooks/auth/useUser';

import { FaRegUser, FaRegClock } from 'react-icons/fa6';
import { MdOutlineEmail } from 'react-icons/md';

function AccountDetails() {
  const { user } = useUser();
  const dateString = user?.last_sign_in_at;
  const newData = new Date(dateString);

  const extractDate = newData.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true, // For 12-hour format with AM/PM
  });

  return (
    <React.Fragment>
      <header className='w-full h-auto flex flex-col items-start justify-start'>
        <h6 className='text-xl text-white font-medium tracking-wide text-start'>
          Account Information
        </h6>

        <p className='text-base text-gray-400 font-normal tracking-wide'>
          View your account details
        </p>
      </header>

      <label
        htmlFor='account-username'
        className='w-full h-auto flex flex-col gap-1.5 items-start justify-start'
      >
        <p className='flex items-center gap-2 text-sm text-blue-400 font-medium tracking-wider self-start text-start'>
          <span>
            <FaRegUser />
          </span>
          Account Username
        </p>

        <input
          type='text'
          id='account-username'
          name='account-username'
          placeholder={user?.user_metadata?.username}
          disabled
          className='outline-none border border-neutral-500 w-full h-auto py-1.5 px-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-neutral-500 placeholder:text-neutral-500 bg-neutral-900 text-white text-balance font-normal tracking-wider caret-blue-400 rounded-md shadow-sm hover:border-blue-400 focus-visible:border-blue-400 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500 selection:bg-blue-400 selection:text-white'
        />
      </label>

      <label
        htmlFor='account-email'
        className='w-full h-auto flex flex-col gap-1.5 items-start justify-start'
      >
        <p className='flex items-center gap-2 text-sm text-blue-400 font-medium tracking-wider self-start text-start'>
          <span>
            <MdOutlineEmail />
          </span>
          Account E-Mail
        </p>

        <input
          type='email'
          id='account-email'
          name='account-email'
          placeholder={user?.email}
          disabled
          className='outline-none border border-neutral-500 w-full h-auto py-1.5 px-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-neutral-500 placeholder:text-neutral-500 bg-neutral-900 text-white text-balance font-normal tracking-wider caret-blue-400 rounded-md shadow-sm hover:border-blue-400 focus-visible:border-blue-400 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500 selection:bg-blue-400 selection:text-white'
        />
      </label>

      <label
        htmlFor='account-last-signed-in'
        className='w-full h-auto flex flex-col gap-1.5 items-start justify-start'
      >
        <p className='flex items-center gap-2 text-sm text-blue-400 font-medium tracking-wider self-start text-start'>
          <span>
            <FaRegClock />
          </span>
          Last Signed In
        </p>

        <input
          type='text'
          id='account-last-signed-in'
          name='account-last-signed-in'
          placeholder={extractDate}
          disabled
          className='outline-none border border-neutral-500 w-full h-auto py-1.5 px-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-neutral-500 placeholder:text-neutral-500 bg-neutral-900 text-white text-balance font-normal tracking-wider caret-blue-400 rounded-md shadow-sm hover:border-blue-400 focus-visible:border-blue-400 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500 selection:bg-blue-400 selection:text-white'
        />
      </label>
    </React.Fragment>
  );
}

export default AccountDetails;
