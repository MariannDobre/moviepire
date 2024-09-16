import React from 'react';
import { useUser } from '../hooks/auth/useUser';

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
    <div className='flex flex-col gap-6 bg-neutral-50/10 p-3 rounded-md shadow-lg outline outline-1 outline-neutral-800'>
      <div className='flex flex-col gap-1'>
        <label className='text-sm text-stone-300 tracking-wider pl-3 self-start'>
          Account Username:
        </label>

        <input
          className='w-96 py-2 px-3 cursor-not-allowed rounded-md shadow-lg tracking-wide outline outline-1 disabled:outline-gray-500/25 border-none text-base disabled:bg-neutral-900 disabled:placeholder-gray-500/75'
          type='text'
          id='currentUsername'
          placeholder={user?.user_metadata?.username}
          disabled
        />
      </div>

      <div className='flex flex-col gap-1'>
        <label className='text-sm text-stone-300 tracking-wider pl-3 self-start'>
          Account Email:
        </label>

        <input
          className='w-96 py-2 px-3 cursor-not-allowed rounded-md shadow-lg tracking-wide outline outline-1 disabled:outline-gray-500/25 border-none text-base disabled:bg-neutral-900 disabled:placeholder-gray-500/75'
          type='text'
          id='currentEmail'
          placeholder={user?.email}
          disabled
        />
      </div>

      <div className='flex flex-col gap-1'>
        <label className='text-sm text-stone-300 tracking-wider pl-3 self-start'>
          Last Sign In:
        </label>

        <input
          className='w-96 py-2 px-3 cursor-not-allowed rounded-md shadow-lg tracking-wide outline outline-1 disabled:outline-gray-500/25 border-none text-base disabled:bg-neutral-900 disabled:placeholder-gray-500/75'
          type='text'
          id='currentUsername'
          placeholder={extractDate}
          disabled
        />
      </div>
    </div>
  );
}

export default AccountDetails;
