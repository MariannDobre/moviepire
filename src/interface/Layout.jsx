import React from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from './Navigation';
import SearchMovie from '../components/searching/SearchMovie';
import Profile from '../components/account/Profile';

function Layout() {
  return (
    <div className='relative'>
      <div className='flex items-center justify-between border-b border-neutral-800 py-3 px-6'>
        <div className='flex items-center justify-center gap-6'>
          <Navigation />

          {/* profil button */}
          <Profile />
        </div>

        {/* search input */}
        <SearchMovie />
      </div>

      <main className='p-12'>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
