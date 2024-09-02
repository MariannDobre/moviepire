import React from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '../hooks/useUser';
import { FaUser } from 'react-icons/fa';

function UpdatePublicData() {
  const {
    register,
    reset,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useUser();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className='flex flex-col'>
      <form
        className='flex flex-col gap-6 bg-neutral-50/10 p-3 rounded-md shadow-lg outline outline-1 outline-neutral-800'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='w-20 h-20'>
          {false ? (
            <span className='flex items-center justify-center rounded-full w-full h-full'>
              <img
                className='rounded-full w-full h-full'
                src='/idolu.PNG'
                alt='User avatar'
              />
            </span>
          ) : (
            <span className='flex items-center justify-center rounded-full w-full h-full bg-black/85'>
              <FaUser className='text-gray-500 text-3xl' />
            </span>
          )}
        </div>

        <div className='flex flex-col gap-1'>
          <label
            className='text-sm text-stone-300 tracking-wider pl-3'
            htmlFor='updatedUsername'
          >
            New Username:
          </label>

          <input
            className='w-96 py-2 px-3 rounded-md shadow-lg tracking-wide caret-red-400 outline outline-1 outline-stone-300/20 border-none text-base text-stone-200 bg-neutral-800 placeholder-neutral-400/50 focus-visible:outline-red-400 transition-all duration-500'
            type='text'
            id='updatedUsername'
            placeholder='new username'
            disabled={false}
          />
        </div>

        <div></div>

        <div className='w-96 flex items-center gap-3'>
          <button
            className='outline outline-1 outline-transparent border-none text-base tracking-wide font-medium bg-red-400 text-stone-200 w-1/2 rounded-md shadow-lg py-2 px-3 hover:bg-red-500 hover:text-stone-100 focus-visible:bg-red-500 focus-visible:text-stone-100 transition-all duration-300'
            type='button'
          >
            Update
          </button>

          <button
            className='outline outline-1 outline-transparent border-none text-base tracking-wide font-medium bg-red-400 text-stone-200 w-1/2 rounded-md shadow-lg py-2 px-3 hover:bg-red-500 hover:text-stone-100 focus-visible:bg-red-500 focus-visible:text-stone-100 transition-all duration-300'
            type='button'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePublicData;
