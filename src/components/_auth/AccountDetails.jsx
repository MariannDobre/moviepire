import React from 'react';
import { useUser } from '../../hooks/auth/useUser';

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

        <p className='text-base text-neutral-400 font-normal tracking-wide'>
          View your account details
        </p>
      </header>

      <label
        htmlFor='account-username'
        className='w-full h-auto flex flex-col gap-1.5 items-start justify-start'
      >
        <p className='flex items-center gap-2 text-sm text-neutral-200 font-medium tracking-wider self-start text-start'>
          <span className='text-base text-amber-400'>
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
          className='outline-none border border-neutral-700 w-full h-auto py-1.5 px-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-neutral-700 placeholder:text-neutral-400 placeholder:text-base placeholder:font-medium placeholder:tracking-wider bg-black/75 rounded-md'
        />
      </label>

      <label
        htmlFor='account-email'
        className='w-full h-auto flex flex-col gap-1.5 items-start justify-start'
      >
        <p className='flex items-center gap-2 text-sm text-neutral-200 font-medium tracking-wider self-start text-start'>
          <span className='text-base text-amber-400'>
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
          className='outline-none border border-neutral-700 w-full h-auto py-1.5 px-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-neutral-700 placeholder:text-neutral-400 placeholder:text-base placeholder:font-medium placeholder:tracking-wider bg-black/75 rounded-md'
        />
      </label>

      <label
        htmlFor='account-last-signed-in'
        className='w-full h-auto flex flex-col gap-1.5 items-start justify-start'
      >
        <p className='flex items-center gap-2 text-sm text-neutral-200 font-medium tracking-wider self-start text-start'>
          <span className='text-base text-amber-400'>
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
          className='outline-none border border-neutral-700 w-full h-auto py-1.5 px-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-neutral-700 placeholder:text-neutral-400 placeholder:text-base placeholder:font-medium placeholder:tracking-wider bg-black/75 rounded-md'
        />
      </label>
    </React.Fragment>
  );
}

export default AccountDetails;
