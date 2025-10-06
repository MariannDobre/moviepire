import React from 'react';
import { NavLink } from 'react-router-dom';

import { FaInfoCircle } from 'react-icons/fa';

export default function ApplicationLinks() {
  return (
    <div className='w-full h-auto flex flex-col items-start justify-center gap-6'>
      <span className='text-neutral-400 text-xl font-medium tracking-wide'>
        App
      </span>

      <NavLink
        to='/how-it-works'
        className={({ isActive }) =>
          `outline-none cursor-pointer w-full h-10 flex items-center justify-start gap-2 text-lg font-normal tracking-wide py-1.5 px-3 rounded-md ${
            isActive
              ? 'border-r-2 border-amber-400 text-white bg-neutral-500/35'
              : 'border-none text-neutral-500'
          } hover:bg-neutral-500/40 focus-visible:bg-neutral-500/40 transition-colors duration-300`
        }
      >
        {({ isActive }) => (
          <React.Fragment>
            <span
              className={`${
                isActive ? 'text-amber-400' : 'text-neutral-500'
              } text-xl`}
            >
              <FaInfoCircle />
            </span>
            &nbsp;How It Works
          </React.Fragment>
        )}
      </NavLink>
    </div>
  );
}
