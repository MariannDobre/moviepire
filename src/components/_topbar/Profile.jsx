import { Link } from 'react-router-dom';
import { useUser } from '../../hooks/auth/useUser';
import { BsIncognito } from 'react-icons/bs';
import SmallLoader from '../loaders/SmallLoader';

export default function Profile() {
  const { user, isFetching, isAuthenticated } = useUser();

  return (
    <div className='w-12 h-12 flex items-center justify-center'>
      <Link
        to='/account'
        className='group outline-none border-none w-12 h-12 flex items-center justify-center rounded-lg shadow-sm'
      >
        <span
          className={`w-12 h-12 flex items-center justify-center text-2xl ${
            isAuthenticated
              ? 'text-white group-hover:text-blue-500 group-focus-visible:text-blue-500'
              : 'text-neutral-500 group-hover:text-white group-focus-visible:text-white'
          } bg-neutral-800 rounded-lg drop-shadow-sm transition-all duration-500`}
        >
          {isFetching ? (
            <SmallLoader />
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
