import { useEffect, useState } from 'react';
import { useUser } from '../../hooks/auth/useUser';
import { useDiaryMovies } from '../../hooks/movies/useDiaryMovies';
import { Link } from 'react-router-dom';

import Logo from './Logo';
import SearchMovie from '../searching/SearchMovie';
import Profile from './Profile';
import SignOut from './SignOut';
import SmallLoader from '../loaders/SmallLoader';

import { BsFillJournalBookmarkFill } from 'react-icons/bs';

const responsiveStyles = {
  componentWrapper: 'py-0 px-3 md:px-6 xl:px-9 2xl:px-12',
  diaryLink:
    'w-8 h-8 2xl:w-12 2xl:h-12 text-base xl:text-2xl rounded-md xl:rounded-lg',
  diaryLinkIcon: 'w-8 h-8 2xl:w-12 2xl:h-12 text-base xl:text-xl',
};

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
      className={`${responsiveStyles.componentWrapper} border-b ${
        isNavFixed
          ? 'bg-black/50 backdrop-blur-md border-neutral-500'
          : 'bg-black backdrop-blur-0 border-neutral-800'
      } w-full h-20 fixed top-0 left-0 z-50 flex items-center justify-between transition-all duration-500`}
    >
      <Logo />

      <SearchMovie />

      <div
        className={`w-1/4 h-12 flex items-center justify-end ${
          isAuthenticated ? 'gap-1.5 2xl:gap-3' : 'gap-0'
        }`}
      >
        {/* diaryLink:
    'w-8 h-8 2xl:w-12 2xl:h-12 text-base xl:text-2xl rounded-md xl:rounded-lg',
  diaryLinkIcon: 'w-8 h-8 2xl:w-12 2xl:h-12 text-base xl:text-xl', */}
        {isAuthenticated ? (
          <Link
            to='/diary'
            className='w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 group outline-none border-none cursor-pointer flex items-center justify-center rounded-md xl:rounded-lg shadow-sm relative'
          >
            <span className='w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-base lg:text-xl xl:text-2xl flex items-center justify-center text-white bg-neutral-800 rounded-md xl:rounded-lg drop-shadow-sm group-hover:text-blue-500 group-focus-visible:text-blue-500 transition-all duration-500'>
              <BsFillJournalBookmarkFill />
            </span>

            <div className='w-5 h-5 sm:w-[22px] sm:h-[22px] lg:w-6 lg:h-6 xl:w-7 xl:h-7 bg-blue-400 absolute -top-2 -left-2 flex items-center justify-center rounded-full shadow-sm'>
              {isAuthenticated && isFetching ? (
                <SmallLoader size='text-lg md:text-xl' />
              ) : (
                <span className='w-full h-full text-[10px] sm:text-[11px] md:text-xs lg:text-sm text-white font-medium tracking-wide flex items-center justify-center rounded-full bg-transparent'>
                  {diaryMovies ? diaryMovies?.length : '-'}
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
