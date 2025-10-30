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
      {/* HEADER */}
      <header className='w-full h-auto flex flex-col items-start justify-start'>
        <h6 className='text-xl text-white font-medium tracking-wide text-start'>
          Account Information
        </h6>

        <p className='text-base text-neutral-400 font-normal tracking-wide'>
          View your account details
        </p>
      </header>

      {/* ACCOUNT USERNAME FIELD */}
      <label
        htmlFor='accountUsername'
        className='w-full h-auto flex flex-col gap-1.5 items-start justify-start'
      >
        <p className='flex items-center gap-2 text-base text-neutral-200 font-medium tracking-wider self-start text-start'>
          <span className='text-sm text-amber-400'>
            <FaRegUser aria-hidden='true' />
          </span>
          Account Username
        </p>

        <input
          type='text'
          id='accountUsername'
          name='accountUsername'
          placeholder={user?.user_metadata?.username}
          disabled
          readOnly
          className='outline-none border border-neutral-700 w-full h-auto py-1 px-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-neutral-700 placeholder:text-neutral-400 placeholder:text-sm placeholder:font-medium placeholder:tracking-widest bg-black/75 text-white text-sm font-medium tracking-widest caret-amber-400 rounded-md hover:border-amber-400 focus-visible:border-amber-400 transition-all duration-300'
        />
      </label>

      {/* ACCOUNT EMAIL FIELD */}
      <label
        htmlFor='accountEmail'
        className='w-full h-auto flex flex-col gap-1.5 items-start justify-start'
      >
        <p className='flex items-center gap-2 text-base text-neutral-200 font-medium tracking-wider self-start text-start'>
          <span className='text-sm text-amber-400'>
            <MdOutlineEmail aria-hidden='true' />
          </span>
          Account E-Mail
        </p>

        <input
          type='email'
          id='accountEmail'
          name='accountEmail'
          placeholder={user?.email}
          disabled
          readOnly
          className='outline-none border border-neutral-700 w-full h-auto py-1 px-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-neutral-700 placeholder:text-neutral-400 placeholder:text-sm placeholder:font-medium placeholder:tracking-widest bg-black/75 text-white text-sm font-medium tracking-widest caret-amber-400 rounded-md hover:border-amber-400 focus-visible:border-amber-400 transition-all duration-300'
        />
      </label>

      {/* LAST SIGNED IN FIELD */}
      <label
        htmlFor='lstSignedIn'
        className='w-full h-auto flex flex-col gap-1.5 items-start justify-start'
      >
        <p className='flex items-center gap-2 text-base text-neutral-200 font-medium tracking-wider self-start text-start'>
          <span className='text-sm text-amber-400'>
            <FaRegClock aria-hidden='true' />
          </span>
          Last Signed In
        </p>

        <input
          type='text'
          id='lstSignedIn'
          name='lstSignedIn'
          placeholder={extractDate}
          disabled
          readOnly
          className='outline-none border border-neutral-700 w-full h-auto py-1 px-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:border-neutral-700 placeholder:text-neutral-400 placeholder:text-sm placeholder:font-medium placeholder:tracking-widest bg-black/75 text-white text-sm font-medium tracking-widest caret-amber-400 rounded-md hover:border-amber-400 focus-visible:border-amber-400 transition-all duration-300'
        />
      </label>
    </React.Fragment>
  );
}

export default AccountDetails;
