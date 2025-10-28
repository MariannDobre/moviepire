import React, { useState } from 'react';
import { capitalizeWords } from '../../utils/functions';

import MovieClip from './MovieClip';
import MovieTrailer from './MovieTrailer';
import LazyImage from '../../utils/LazyImage';
import Modal from '../_modal/Modal';

import { FaStar, FaRegCirclePlay } from 'react-icons/fa6';
import { useUser } from '../../hooks/auth/useUser';
import { useRating } from '../../hooks/movies/useRating';

export default function MovieBannerDetails({
  movieID,
  movieName,
  movieYear,
  movieDuration,
  movieType,
  moviePoster,
  movieTrailer,
  movieClip,
}) {
  const { user, isAuthenticated } = useUser();
  const { rating } = useRating(user?.id, movieID);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const userRating = rating?.ratings ?? 0;

  return (
    <React.Fragment>
      <div className='w-full max-w-[1200px] h-auto flex flex-col gap-3'>
        {/* Top section */}
        <div className='w-full h-auto flex justify-between'>
          <div className='w-60 h-auto flex flex-col'>
            <h1 className='text-4xl text-white font-medium tracking-wide'>
              {movieName}
            </h1>

            <ul className='w-full h-auto flex'>
              <li
                role='presentation'
                className='text-base text-neutral-400 font-normal tracking-wide leading-relaxed'
              >
                {capitalizeWords(movieType)}&nbsp;
              </li>

              <li
                role='presentation'
                className='text-base text-neutral-400 font-normal tracking-wide leading-relaxed'
              >
                • {movieYear}&nbsp;
              </li>

              <li
                role='presentation'
                className='text-base text-neutral-400 font-normal tracking-wide leading-relaxed'
              >
                • {movieDuration}&nbsp;min
              </li>
            </ul>
          </div>

          {isAuthenticated ? (
            <div className='w-60 h-auto flex items-end justify-end'>
              {userRating ? (
                <p className='flex items-center text-white text-2xl font-medium tracking-wide leading-relaxed'>
                  <span className='text-amber-400 text-3xl'>
                    <FaStar />
                  </span>
                  &nbsp;{userRating === 10 ? userRating : `${userRating}.0`}
                </p>
              ) : (
                <p className='text-white text-base font-normal tracking-wide leading-relaxed text-end'>
                  This title isn't rated yet
                </p>
              )}
            </div>
          ) : null}
        </div>

        {/* Bottom section */}
        <div className='w-full h-[336px] flex items-start justify-center'>
          {/* Movie poster */}
          <div className='w-60 h-[336px] bg-red-300'>
            <LazyImage
              src={moviePoster}
              alt={`Poster of ${movieName}`}
              className='w-full h-full object-cover'
            />
          </div>

          {/* Movie trailer */}
          <div className='w-[calc(1200px-240px-240px)] h-[336px] bg-gradient-to-t from-black to-transparent flex items-end p-6'>
            <button
              type='button'
              aria-label='Opens the trailer modal'
              title='Open the trailer modal'
              onClick={() => {
                setActiveModal('trailer');
                setIsModalOpen(true);
              }}
              className='group border-none outline-none flex items-center w-auto h-auto cursor-pointer text-neutral-400 text-xl font-medium tracking-wide hover:text-white focus-visible:text-white transition-colors duration-300'
            >
              <span className='text-3xl group-hover:text-amber-400 group-focus-visible:text-amber-400 transition-colors duration-300'>
                <FaRegCirclePlay />
              </span>
              &nbsp;Play Trailer
            </button>
          </div>

          {/* Movie clip */}
          <div className='w-60 h-[336px] flex items-center justify-center bg-neutral-800/95 backdrop-blur-md hover:bg-neutral-800/85 transition-colors duration-300'>
            {movieClip ? (
              <button
                type='button'
                aria-label='Opens the clip modal'
                title='Open the clip modal'
                onClick={() => {
                  setActiveModal('clip');
                  setIsModalOpen(true);
                }}
                className='group border-none outline-none flex items-center justify-center w-full h-full cursor-pointer text-neutral-400 text-lg font-medium tracking-wide hover:text-white focus-visible:text-white transition-colors duration-300'
              >
                <span className='text-2xl group-hover:text-amber-400 group-focus-visible:text-amber-400 transition-colors duration-300'>
                  <FaRegCirclePlay />
                </span>
                &nbsp;Play Clip
              </button>
            ) : (
              <p className='p-6 text-sm text-white font-medium tracking-wider leading-relaxed text-center'>
                There is no clip available for this title
              </p>
            )}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
      >
        {movieTrailer && activeModal === 'trailer' && (
          <MovieTrailer
            movieName={movieName}
            movieTrailer={movieTrailer}
          />
        )}
        {movieClip && activeModal === 'clip' && (
          <MovieClip
            movieName={movieName}
            movieClip={movieClip}
          />
        )}
      </Modal>
    </React.Fragment>
  );
}
