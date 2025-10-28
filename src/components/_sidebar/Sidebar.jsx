import { useUser } from '../../hooks/auth/useUser';

import SmallLoader from '../../interface/_loaders/SmallLoader';
import Logo from '../_logo/Logo';
import GeneralLinks from './_navigation/GeneralLinks';
import AccountLinks from './_navigation/AccountLinks';
import ApplicationLinks from './_navigation/ApplicationLinks';
import SignOut from './SignOut';

export default function Sidebar() {
  const { isFetching, isAuthenticated } = useUser();

  return (
    <aside className='w-96 h-full flex flex-col items-center gap-6 p-6 border-r border-r-neutral-700'>
      <Logo />

      <GeneralLinks />

      <AccountLinks />

      <ApplicationLinks />

      {isFetching ? (
        <div className='w-full h-10 py-1.5 px-3 mt-auto rounded-md flex items-center justify-center bg-neutral-500/35'>
          <SmallLoader
            size='text-2xl'
            color='text-yellow-500'
          />
        </div>
      ) : isAuthenticated ? (
        <SignOut />
      ) : (
        <div className='w-full h-10 py-1.5 px-3 mt-auto rounded-md flex items-center justify-center bg-neutral-500/35'>
          <p className='text-white text-lg font-normal tracking-wide'>
            Welcome to Moviepire
          </p>
        </div>
      )}
    </aside>
  );
}
