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
import StarRating from './starRating';
import SmallLoader from '../loaders/SmallLoader';

function RateMovie({ movieTitle, userId, itemId }) {
  const [rating, setRating] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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
  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
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
        // <Modal>
        //   <Modal.Overlay>
        //     <Modal.Body>
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

                  {/* <Modal.CloseModal
                    onClose={handleCloseModal}
                    onEnter={handleMouseEnter}
                    onLeave={handleMouseLeave}
                    favoritesStatus={favoritesStatus}
                    isHovered={isHovered}
                    setIsHovered={setIsHovered}
                  /> */}

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

                  <StarRating
                    rating={
                      findCurrentItemRating[0]?.ratings && rating === 0
                        ? findCurrentItemRating[0]?.ratings
                        : rating
                    }
                    setRating={setRating}
                  />

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
              {/* </Modal.Body>
          </Modal.Overlay>
        </Modal> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RateMovie;
