import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../../hooks/auth/useUser';
import SmallLoader from '../loaders/SmallLoader';

const notAuthLinks = [
  {
    label: 'Home',
    value: '/',
  },
  {
    label: 'About',
    value: '/about-moviepire',
  },
  {
    label: 'Log In',
    value: '/login',
  },
  { label: 'Register Account', value: '/register' },
];

const authLinks = [
  {
    label: 'Home',
    value: '/',
  },
  {
    label: 'About',
    value: '/about-moviepire',
  },
  {
    label: 'Diary',
    value: '/diary',
  },
  {
    label: 'Account',
    value: '/account',
  },
  {
    label: 'E-Mail Confirmation',
    value: '/confirm-email',
  },
];

export default function Footer() {
  const { isAuthenticated, isFetching } = useUser();
  const { pathname } = useLocation();

  return (
    <footer className='w-full h-auto flex items-center justify-between text-white border-t border-neutral-500 px-3 py-6 md:px-6 md:py-9 xl:px-9 xl:py-12 2xl:px-12 2xl:py-16'>
      {isFetching ? (
        <div className='w-full h-auto flex items-center justify-center'>
          <SmallLoader
            size='text-lg'
            color='text-blue-400'
          />
        </div>
      ) : (
        <nav className='w-full h-auto flex items-center justify-center gap-3 md:gap-6 lg:gap-9'>
          {isAuthenticated ? (
            <React.Fragment>
              {authLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.value}
                  className={`${
                    pathname === link.value
                      ? 'text-white border-b-2 border-b-blue-400'
                      : 'text-gray-400 border-b-0'
                  } self-start outline-none cursor-pointer text-sm lg:text-base font-normal tracking-wider lg:tracking-wide hover:text-blue-400 focus-visible:text-blue-400 transition-all duration-500`}
                >
                  {link.label}
                </Link>
              ))}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {notAuthLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.value}
                  className='self-start outline-none border-none cursor-pointer text-sm lg:text-base text-gray-400 font-normal tracking-wider lg:tracking-wide hover:text-white focus-visible:text-white transition-all duration-500'
                >
                  {link.label}
                </Link>
              ))}
            </React.Fragment>
          )}
        </nav>
      )}
    </footer>
  );
}
