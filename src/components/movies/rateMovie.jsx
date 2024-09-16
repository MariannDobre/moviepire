import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useViewedMovies } from '../../hooks/movies/useViewedMovies';
import { useMovieStatus } from '../../hooks/movies/useMovieStatus';
import { useRatings } from '../../hooks/movies/useRatings';
import { useRemoveRating } from '../../hooks/movies/mutations/useRemoveRating';
import { useAddRating } from '../../hooks/movies/mutations/useAddRating';
import { useUpdateRating } from '../../hooks/movies/mutations/useUpdateRating';

import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';
import { BsTrashFill, BsHandThumbsUpFill } from 'react-icons/bs';
import { RiUploadCloudFill } from 'react-icons/ri';
import SmallLoader from '../loaders/SmallLoader';
import ChooseRating from './ChooseRating';
import RateButton from './RateButton';
import { useUser } from '../../hooks/auth/useUser';
import { FaStar } from 'react-icons/fa';

function Test({ movieTitle, userId, itemId }) {
  const [rating, setRating] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();
  const rateMovie = location.search.includes('rate-movie');
  const { dbRatings, isPending: isGetting } = useRatings(userId, itemId);
  const { viewedMovies } = useViewedMovies(userId);
  const { favoritesStatus } = useMovieStatus(userId, itemId);

  const findCurrentItemRating = dbRatings.filter(
    (item) => item.item_id === Number(itemId)
  );
  const ratingId = findCurrentItemRating[0]?.id;

  const findFavoriteRecordId = viewedMovies.filter(
    (item) => item?.item_id === Number(itemId)
  );
  const favoriteRecordId = findFavoriteRecordId[0]?.record_id;

  const { insertRating, isPending: isInserting } = useAddRating(
    userId,
    itemId,
    rating,
    movieTitle,
    setRating,
    favoriteRecordId
  );
  const { updateRating, isPending: isUpdating } = useUpdateRating(
    ratingId,
    userId,
    itemId,
    rating,
    movieTitle,
    setRating,
    favoriteRecordId
  );
  const { deleteRating, isPending: isDeleting } = useRemoveRating(
    userId,
    itemId,
    movieTitle,
    favoriteRecordId
  );

  useEffect(() => {
    if (rateMovie) {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }, [rateMovie]);

  //
  function handleOpenModal() {
    setOpenModal(true);
  }

  function handleCloseModal() {
    setOpenModal(false);

    if (!findCurrentItemRating[0]?.ratings) setRating(false);
  }

  //
  function handleInsertRating() {
    insertRating();
    setOpenModal(false);
  }

  function handleUpdateRating() {
    updateRating();
    setOpenModal(false);
  }

  function handleDeleteRating() {
    deleteRating();
    setOpenModal(false);
  }

  return (
    <>
      <button onClick={handleOpenModal}>
        <TiStarOutline />
        {isGetting ? (
          <SmallLoader />
        ) : findCurrentItemRating[0]?.ratings > 0 ? (
          <span>
            <strong style={{ color: '#fff', fontSize: '2.4rem' }}>
              {findCurrentItemRating[0].ratings}&nbsp;
            </strong>
            /10
          </span>
        ) : (
          'Rate'
        )}
      </button>

      {openModal && (
        <div>
          <div>
            <div>
              {favoritesStatus?.length === 0 ? (
                <React.Fragment>
                  <div
                    style={{
                      color:
                        favoritesStatus?.length === 0 ? '#fa5252' : '#4f46e5',
                    }}
                  >
                    <TiStarFullOutline size={rating ? 80 + rating * 2 : 80} />

                    <span>!</span>
                  </div>

                  <p>
                    You are not allowed to rate something&nbsp;
                    <span>unseened</span>
                  </p>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div
                    style={{
                      color:
                        favoritesStatus?.length === 0 ? '#fa5252' : '#4f46e5',
                    }}
                  >
                    <TiStarFullOutline size={rating ? 80 + rating * 2 : 80} />

                    <span>
                      {findCurrentItemRating[0]?.ratings && rating === 0
                        ? findCurrentItemRating[0]?.ratings
                        : rating > 0
                        ? rating
                        : '?'}
                    </span>
                  </div>
                  {/* 
                  <Modal.CloseModal
                    onClose={handleCloseModal}
                    onEnter={handleMouseEnter}
                    onLeave={handleMouseLeave}
                    favoritesStatus={favoritesStatus}
                    isHovered={isHovered}
                    setIsHovered={setIsHovered}
                  /> */}

                  {/* <ModalTitle>Rate this</ModalTitle> */}

                  <h1>{movieTitle}</h1>

                  {/* <StarRating
                    rating={
                      findCurrentItemRating[0]?.ratings && rating === 0
                        ? findCurrentItemRating[0]?.ratings
                        : rating
                    }
                    setRating={setRating}
                  /> */}

                  {findCurrentItemRating[0]?.ratings ? (
                    <button
                      onClick={handleUpdateRating}
                      disabled={!rating || isUpdating}
                    >
                      {!isUpdating ? (
                        <>
                          Update Rating <RiUploadCloudFill />
                        </>
                      ) : (
                        <SmallLoader />
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={handleInsertRating}
                      disabled={!rating || isInserting}
                    >
                      {!isInserting ? (
                        <>
                          Rate <BsHandThumbsUpFill />
                        </>
                      ) : (
                        <SmallLoader />
                      )}
                    </button>
                  )}

                  {findCurrentItemRating[0]?.ratings > 0 && (
                    <button
                      onClick={handleDeleteRating}
                      disabled={isDeleting}
                    >
                      {!isDeleting ? (
                        <>
                          Delete Rating <BsTrashFill />
                        </>
                      ) : (
                        <SmallLoader />
                      )}
                    </button>
                  )}
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function RateMovie({ movieTitle, movieId }) {
  const [rating, setRating] = useState(0);
  const { user } = useUser();
  const { ratings, isFetching } = useRatings(user?.id, movieId);

  const findCurrentRating = ratings.filter(
    (item) => item.item_id === Number(movieId)
  );

  const starSize =
    findCurrentRating[0]?.ratings && rating === 0
      ? 80 + findCurrentRating[0]?.ratings * 2
      : rating > 0
      ? 80 + rating * 2
      : 80;
  const ratingForStar =
    findCurrentRating[0]?.ratings && rating === 0
      ? findCurrentRating[0]?.ratings
      : rating > 0
      ? rating
      : '?';

  return (
    <div className='relative flex flex-col items-center justify-center gap-3'>
      <Star
        rating={rating}
        isFetching={isFetching}
        displayRating={ratingForStar}
        starSize={starSize}
      />

      <h1 className='text-lg text-stone-200 tracking-wide'>
        Rate {movieTitle}
      </h1>

      <ChooseRating
        rating={
          findCurrentRating[0]?.ratings && rating === 0
            ? findCurrentRating[0]?.ratings
            : rating
        }
        setRating={setRating}
      />

      <RateButton
        rating={rating}
        ratingStatus={findCurrentRating}
      />
    </div>
  );
}

function Star({ rating, isFetching, displayRating, starSize }) {
  return (
    <div className='absolute -top-full text-red-400'>
      {/* <FaStar size={rating ? 80 + rating * 2 : 80} /> */}
      <FaStar size={starSize} />

      <span className='text-lg text-stone-200 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
        {isFetching ? <SmallLoader /> : displayRating}
      </span>
    </div>
  );
}

export default RateMovie;
