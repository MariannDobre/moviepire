import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/auth/useUser';
import { BsIncognito } from 'react-icons/bs';
import SmallLoader from '../loaders/SmallLoader';

export default function Profile() {
  const { user, isFetching, isAuthenticated } = useUser();

  return (
    <div className='w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 flex items-center justify-center'>
      <Link
        to='/account'
        className='w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 group outline-none border-none flex items-center justify-center rounded-md xl:rounded-lg shadow-sm'
      >
        <span
          className={`w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-base lg:text-xl xl:text-2xl flex items-center justify-center ${
            isAuthenticated
              ? 'text-white group-hover:text-blue-500 group-focus-visible:text-blue-500'
              : 'text-neutral-500 group-hover:text-white group-focus-visible:text-white'
          } bg-neutral-800 rounded-lg drop-shadow-sm transition-all duration-500`}
        >
          {isFetching ? (
            <SmallLoader size='text-lg md:text-xl' />
          ) : isAuthenticated ? (
            user?.user_metadata?.username?.trim()?.charAt(0)?.toUpperCase()
          ) : (
            <BsIncognito />
          )}
        </span>
      </Link>
    </div>
  );
}
