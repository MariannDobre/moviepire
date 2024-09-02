import React from 'react';
import { useForm } from 'react-hook-form';
import { useUser } from '../hooks/useUser';

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
      <div>
        {true ? (
          <span>
            <img
              className='rounded-full'
              src='/idolu.PNG'
              alt='User avatar'
            />
          </span>
        ) : (
          <span></span>
        )}
      </div>

      <form
        className='flex flex-col gap-6 bg-neutral-50/10 p-3 rounded-md shadow-lg outline outline-1 outline-neutral-800'
        onSubmit={handleSubmit(onSubmit)}
      >
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
      </form>
    </div>
  );
}

export default UpdatePublicData;
