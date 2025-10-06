import React from 'react';
import { useUser } from '../../../hooks/auth/useUser';

import { NavLink } from 'react-router-dom';

import { FaKey, FaUserPlus, FaUser, FaUserCheck } from 'react-icons/fa';

const notAuthLinks = [
  {
    id: 0,
    value: '/log-in',
    label: 'Log In',
    icon: <FaKey />,
  },
  {
    id: 1,
    value: '/register',
    label: 'Register Account',
    icon: <FaUserPlus />,
  },
];

const authLinks = [
  {
    id: 0,
    value: '/account',
    label: 'Account',
    icon: <FaUser />,
  },
  {
    id: 1,
    value: '/confirm-email',
    label: 'Confirm Account',
    icon: <FaUserCheck />,
  },
];

export default function AccountLinks() {
  const { isAuthenticated, isFetching } = useUser();

  const accountLinks = isAuthenticated ? authLinks : notAuthLinks;

  return (
    <div className='w-full h-auto flex flex-col items-start justify-center gap-6'>
      <span className='text-neutral-400 text-xl font-medium tracking-wide'>
        Account
      </span>

      <nav className='w-full h-auto flex flex-col items-start justify-center gap-6'>
        {accountLinks.map((link) => (
          <NavLink
            key={link.id}
            to={link.value}
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
                  {link.icon}
                </span>
                &nbsp;{link.label}
              </React.Fragment>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
