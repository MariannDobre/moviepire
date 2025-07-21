import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUser } from '../../hooks/auth/useUser';
import { useRating } from '../../hooks/movies/useRating';

import Modal, { useModal } from '../../interface/compound components/Modal';
import RatingContainer from '../_rating/RatingContainer';

export default function MovieRating({ movieId, movieTitle }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, isAuthenticated } = useUser();
  const { rating } = useRating(user?.id, movieId);
  const { open } = useModal();

  // const currentRatingData = ratings?.find(
  //   (item) => item.item_id === Number(movieId)
  // );
  const movieRating = rating?.ratings || 0;

  useEffect(() => {
    if (searchParams.get('rate') === 'true') {
      open('rate-movie-modal');
      searchParams.delete('rate');
      setSearchParams(searchParams, { replace: true });
    }
  }, [searchParams, setSearchParams, open]);

  return (
    <React.Fragment>
      <div className='w-1/4 h-full p-6 border border-neutral-500 rounded-lg shadow-sm flex flex-col gap-3 items-start justify-start'>
        <h6 className='text-start text-lg text-white font-medium tracking-wide'>
          Your Rating
        </h6>

        <div className='w-full h-auto flex flex-col items-start'>
          {isAuthenticated ? (
            <div className='w-full h-auto flex flex-col gap-3 items-center justify-center'>
              {movieRating ? (
                <React.Fragment>
                  <p className='text-start text-base text-gray-400 font-normal tracking-wide'>
                    You rated this title with&nbsp;
                    <span className='text-yellow-500'>{movieRating}</span>/10
                  </p>

                  <Modal.Open
                    opens='rate-movie-modal'
                    renderButton={() => (
                      <button
                        type='button'
                        className='outline-none border border-transparent flex items-center justify-center text-center gap-1.5 py-1 px-3 cursor-pointer text-sm text-white bg-blue-400 font-medium tracking-wider rounded-md shadow-sm hover:bg-blue-500 focus-visible:bg-blue-500 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
                      >
                        Change Rating
                      </button>
                    )}
                  />
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <p className='text-start text-base text-gray-400 font-normal tracking-wide'>
                    This title isn't rated yet
                  </p>

                  <Modal.Open
                    opens='rate-movie-modal'
                    renderButton={() => (
                      <button
                        type='button'
                        className='outline-none border border-transparent flex items-center justify-center text-center gap-1.5 py-1 px-3 cursor-pointer text-sm text-white bg-blue-400 font-medium tracking-wider rounded-md shadow-sm hover:bg-blue-500 focus-visible:bg-blue-500 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
                      >
                        Rate Title
                      </button>
                    )}
                  />
                </React.Fragment>
              )}
            </div>
          ) : (
            <p className='text-start text-base text-gray-400 font-normal tracking-wide'>
              If you want to rate this title you will need to log into your
              account
            </p>
          )}
        </div>
      </div>

      <Modal.Window
        name='rate-movie-modal'
        height='h-[420px]'
      >
        <RatingContainer
          maxRating={10}
          defaultRating={movieRating}
          starColor='text-blue-400'
          starSize='text-2xl'
          textSize='text-2xl'
          className='w-full h-full flex flex-col items-center justify-center gap-3'
          movieTitle={movieTitle}
        />
      </Modal.Window>
    </React.Fragment>
  );
}
