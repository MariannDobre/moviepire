import { useEffect, useState } from 'react';
import { useUser } from '../../hooks/auth/useUser';
import { Link } from 'react-router-dom';

import Logo from './Logo';
import SearchMovie from '../searching/SearchMovie';
import Profile from './Profile';
import SignOut from './SignOut';

import { BsFillJournalBookmarkFill } from 'react-icons/bs';
import { useDiaryMovies } from '../../hooks/movies/useDiaryMovies';
import SmallLoader from '../loaders/SmallLoader';

export default function Topbar() {
  const { user, isAuthenticated } = useUser();
  const { diaryMovies, isFetching } = useDiaryMovies(user?.id);
  const [isNavFixed, setIsNavFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavFixed(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`border-b ${
        isNavFixed
          ? 'bg-black/50 backdrop-blur-md border-neutral-500'
          : 'bg-black backdrop-blur-0 border-neutral-800'
      } w-full h-20 py-0 px-12 fixed top-0 left-0 z-50 flex items-center justify-between transition-all duration-500`}
    >
      <Logo width='w-1/4' />

      <SearchMovie />

      <div
        className={`w-1/4 h-12 flex items-center justify-end ${
          isAuthenticated ? 'gap-3' : 'gap-0'
        }`}
      >
        {isAuthenticated ? (
          <Link
            to='/diary'
            className='group outline-none border-none cursor-pointer w-12 h-12 flex items-center justify-center rounded-lg shadow-sm relative'
          >
            <span className='w-12 h-12 flex items-center justify-center text-xl text-white bg-neutral-800 rounded-lg drop-shadow-sm group-hover:text-blue-500 group-focus-visible:text-blue-500 transition-all duration-500'>
              <BsFillJournalBookmarkFill />
            </span>

            <div className='w-6 h-6 bg-blue-400 absolute -top-2 -left-2 flex items-center justify-center rounded-full shadow-sm'>
              {isFetching ? (
                <SmallLoader size='text-lg' />
              ) : (
                <span className='w-full h-full text-sm text-white font-medium tracking-wide flex items-center justify-center rounded-full bg-transparent'>
                  {diaryMovies ? diaryMovies?.length : null}
                </span>
              )}
            </div>
          </Link>
        ) : null}

        {isAuthenticated ? <SignOut /> : null}

        <Profile />
      </div>
    </div>
  );
}
