import React, { useRef, useEffect } from 'react';
import { useUser } from '../../hooks/auth/useUser';
import { useDiaryMovies } from '../../hooks/movies/useDiaryMovies';
import SmallLoader from '../../interface/_loaders/SmallLoader';
import DiaryMovie from './DiaryMovie';

export default function DiaryMoviesList({
  selectedGenre,
  selectedType,
  selectedYearRange,
}) {
  const { user } = useUser();
  const {
    diaryMovies,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    error,
  } = useDiaryMovies(user?.id, selectedGenre, selectedType, selectedYearRange);

  const loadMoreRef = useRef();

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const el = loadMoreRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (error)
    return (
      <div className='w-full h-[calc(100vh-72px-48px-62px-148px)] p-6 flex flex-col items-center justify-center bg-red-950/35 border border-red-500 rounded-md'>
        <p className='text-red-500 text-base font-normal tracking-wider text-center'>
          There was an error while fetching your diary...
          <br />
          {error?.message}
        </p>
      </div>
    );

  if (isFetching)
    return (
      <div className='w-full h-[calc(100vh-72px-48px-62px-148px)] p-6 flex flex-col items-center justify-center gap-3 bg-yellow-950/45 border border-yellow-500 rounded-md'>
        <p className='text-yellow-500 text-base font-normal tracking-wider text-center'>
          Loading your diary...
        </p>

        <SmallLoader
          size='text-2xl'
          color='text-yellow-500'
        />
      </div>
    );

  if (!diaryMovies.length)
    return (
      <div className='w-full h-[calc(100vh-72px-48px-62px-148px)] p-6 flex flex-col items-center justify-center bg-yellow-950/45 border border-yellow-500 rounded-md'>
        <p className='text-yellow-500 text-base font-normal tracking-wider text-center'>
          Your diary is empty or there are no entries for your filter.
        </p>
      </div>
    );

  return (
    <div className='w-full h-auto flex flex-col items-center gap-3'>
      <p className='text-sm text-neutral-100 font-medium tracking-wider self-start'>
        <span className='text-base text-amber-400'>{diaryMovies?.length}</span>
        &nbsp;entries found
      </p>

      <div className='w-full h-auto flex flex-col items-center gap-6 p-6 bg-transparent border border-neutral-700 rounded-md'>
        {diaryMovies.map((movie, index) => (
          <React.Fragment key={`${movie.id}-${index}`}>
            <DiaryMovie
              movie={movie}
              index={index}
            />

            {index !== diaryMovies?.length - 1 && (
              <div className='w-full h-px bg-neutral-700' />
            )}
          </React.Fragment>
        ))}

        {hasNextPage && (
          <div
            ref={loadMoreRef}
            className='w-full h-auto flex items-center justify-center p-6'
          >
            {isFetchingNextPage && (
              <SmallLoader
                size='text-2xl'
                color='text-yellow-500'
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
