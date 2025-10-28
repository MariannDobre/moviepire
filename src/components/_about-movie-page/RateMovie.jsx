import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useUser } from '../../hooks/auth/useUser';
import { useRating } from '../../hooks/movies/useRating';

import RatingContainer from '../_rating/RatingContainer';
import Modal from '../_modal/Modal';

import { FaStar } from 'react-icons/fa6';

export default function RateMovie({ movieID, movieName }) {
  const { user } = useUser();
  const { rating } = useRating(user?.id, movieID);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const ratingID = rating?.id;
  const userRating = rating?.ratings ?? 0;

  useEffect(() => {
    const shouldOpenModal = searchParams.get('rate') === 'true';

    if (shouldOpenModal) {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  const handleCloseModal = () => {
    setIsModalOpen(false);

    if (searchParams.get('rate') === 'true') {
      searchParams.delete('rate');
      setSearchParams(searchParams);
    }
  };

  return (
    <React.Fragment>
      <button
        type='button'
        aria-label='Opens the rate title modal'
        title='Open the rate title modal'
        onClick={() => setIsModalOpen(true)}
        className='group outline-none border border-neutral-700 cursor-pointer rounded-md w-72 h-auto bg-white/15 text-neutral-400 text-sm font-medium tracking-wide py-1.5 px-3 flex items-center justify-center gap-1 text-center hover:text-white focus-visible:text-white transition-colors duration-300'
      >
        <span className='text-base group-hover:text-amber-400 group-focus-visible:text-amber-400 transition-colors duration-300'>
          <FaStar />
        </span>
        &nbsp;Rate the Title
      </button>

      <Modal
        isOpen={isModalOpen}
        onCloseModal={handleCloseModal}
      >
        <RatingContainer
          maxRating={10}
          ratingID={ratingID}
          userRating={userRating}
          movieID={movieID}
          movieName={movieName}
          starColor='text-amber-400'
          starSize='text-2xl'
          textSize='text-2xl'
          className='w-full h-full flex flex-col items-center justify-center gap-3'
        />
      </Modal>
    </React.Fragment>
  );
}
