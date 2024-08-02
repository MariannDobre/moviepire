import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useViewedMovies } from '../../hooks/useViewedMovies';
import { useStatus } from '../../hooks/useAddToFavorites';
import {
  useDeleteRating,
  useInsertRating,
  useRating,
  useUpdateRating,
} from '../../hooks/useRating';

import styled from 'styled-components';
import StarRating from './starRating';
import Modal from '../modal/modal';
import MiniLoader from '../loaders/miniLoader';

import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';
import { BsTrashFill, BsHandThumbsUpFill } from 'react-icons/bs';
import { RiUploadCloudFill } from 'react-icons/ri';

const RateButton = styled.button`
  --height-12: 4.8rem;
  --font-5: 2rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  height: var(--height-12);
  outline: none;
  border: none;
  font-size: var(--font-5);
  font-weight: var(--font-weight-semibold);
  letter-spacing: var(--letter-spacing-xs);
  background-color: transparent;
  color: #fab005;
  cursor: pointer;
  border-radius: calc(var(--border-rounded-xs) / 2);
  padding: calc(var(--padding-md) / 2) var(--padding-md);
  transition: background-color 0.35s ease;

  svg {
    font-size: var(--font-size-2xl);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:focus {
    outline: none;
    border: none;
  }
`;

const StarCounter = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;

  svg {
    /* color: var(--color-main-600); */
    transition: all 0.35s ease;
  }
`;

const Count = styled.span`
  position: fixed;
  top: 25%;
  right: 50%;
  transform: translate(50%, 50%);
  color: var(--color-white);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  z-index: 20;
`;

const ModalTitle = styled.h3`
  text-transform: uppercase;
  font-size: var(--font-size-sm);
  color: #fab005;
  letter-spacing: var(--letter-spacing-sm);
  word-spacing: var(--word-spacing-xs);
`;

const MovieTitle = styled.h2`
  font-size: var(--font-size-md);
  color: var(--color-white);
  letter-spacing: var(--letter-spacing-xs);
`;

const SubmitRate = styled.button`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0.4rem;
  border: none;
  outline: none;
  color: var(--color-black);
  background-color: #fab005;
  font-size: var(--font-size-base);
  padding: var(--padding-sm) 0;
  text-align: center;
  font-weight: var(--font-weight-semibold);
  width: 33rem;
  border-radius: calc(var(--border-rounded-xs) / 2);
  cursor: pointer;
  transition: all 0.35s ease;
  letter-spacing: var(--letter-spacing-xs);

  &:hover {
    background-color: #f59f00;
  }

  &:focus {
    border: none;
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: var(--color-gray-dark);
    color: var(--color-gray-light);
  }
`;

const UpdateRate = styled.button`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 0.4rem;
  border: none;
  outline: none;
  color: var(--color-black);
  background-color: #fab005;
  font-size: var(--font-size-base);
  padding: var(--padding-sm) 0;
  text-align: center;
  font-weight: var(--font-weight-semibold);
  width: 33rem;
  border-radius: calc(var(--border-rounded-xs) / 2);
  cursor: pointer;
  transition: all 0.35s ease;
  letter-spacing: var(--letter-spacing-xs);

  &:hover {
    background-color: #f59f00;
  }

  &:focus {
    border: none;
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: var(--color-gray-dark);
    color: var(--color-gray-light);
  }
`;

const DeleteRate = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  border: none;
  outline: none;
  color: var(--color-white);
  background-color: var(--color-gray-dark);
  font-size: var(--font-size-base);
  padding: var(--padding-sm) 0;
  text-align: center;
  font-weight: var(--font-weight-semibold);
  width: 33rem;
  border-radius: calc(var(--border-rounded-xs) / 2);
  cursor: pointer;
  transition: all 0.35s ease;
  letter-spacing: var(--letter-spacing-xs);

  &:hover {
    background-color: var(--color-main-600);
  }

  &:focus {
    border: none;
    outline: none;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: var(--color-gray-dark);
    color: var(--color-gray-light);
  }
`;

const NotAllowed = styled.p`
  --font-size: 1.6rem;

  color: var(--color-white);
  font-size: var(--font-size);
  letter-spacing: var(--letter-spacing-xs);
  word-spacing: var(--word-spacing-xs);

  span {
    color: #fa5252;
  }
`;

function RateMovie({ movieTitle, userId, itemId }) {
  const [rating, setRating] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const rateMovie = location.search.includes('rate-movie');
  const { dbRatings, isPending: isGetting } = useRating(userId, itemId);
  const { viewedMovies } = useViewedMovies(userId);
  const { favoritesStatus } = useStatus(userId, itemId);

  const findCurrentItemRating = dbRatings.filter(
    (item) => item.item_id === Number(itemId)
  );
  const ratingId = findCurrentItemRating[0]?.id;

  const findFavoriteRecordId = viewedMovies.filter(
    (item) => item?.item_id === Number(itemId)
  );
  const favoriteRecordId = findFavoriteRecordId[0]?.record_id;

  const { insertRating, isPending: isInserting } = useInsertRating(
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
  const { deleteRating, isPending: isDeleting } = useDeleteRating(
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
      <RateButton onClick={handleOpenModal}>
        <TiStarOutline />
        {isGetting ? (
          <MiniLoader />
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
      </RateButton>

      {openModal && (
        <Modal>
          <Modal.Overlay>
            <Modal.Body
              display='flex'
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              gap='1.2rem'
              width='64rem'
              height='auto'
              padding='3.6rem'
              backgroundColor='#1a1a1a'
            >
              {favoritesStatus?.length === 0 ? (
                <React.Fragment>
                  <StarCounter
                    style={{
                      color:
                        favoritesStatus?.length === 0 ? '#fa5252' : '#4f46e5',
                    }}
                  >
                    <TiStarFullOutline size={rating ? 80 + rating * 2 : 80} />

                    <Count>!</Count>
                  </StarCounter>

                  <Modal.CloseModal
                    onClose={handleCloseModal}
                    onEnter={handleMouseEnter}
                    onLeave={handleMouseLeave}
                    favoritesStatus={favoritesStatus}
                    isHovered={isHovered}
                    setIsHovered={setIsHovered}
                  />

                  <NotAllowed>
                    You are not allowed to rate something&nbsp;
                    <span>unseened</span>
                  </NotAllowed>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <StarCounter
                    style={{
                      color:
                        favoritesStatus?.length === 0 ? '#fa5252' : '#4f46e5',
                    }}
                  >
                    <TiStarFullOutline size={rating ? 80 + rating * 2 : 80} />

                    <Count>
                      {findCurrentItemRating[0]?.ratings && rating === 0
                        ? findCurrentItemRating[0]?.ratings
                        : rating > 0
                        ? rating
                        : '?'}
                    </Count>
                  </StarCounter>

                  <Modal.CloseModal
                    onClose={handleCloseModal}
                    onEnter={handleMouseEnter}
                    onLeave={handleMouseLeave}
                    favoritesStatus={favoritesStatus}
                    isHovered={isHovered}
                    setIsHovered={setIsHovered}
                  />

                  <ModalTitle>Rate this</ModalTitle>

                  <MovieTitle>{movieTitle}</MovieTitle>

                  <StarRating
                    rating={
                      findCurrentItemRating[0]?.ratings && rating === 0
                        ? findCurrentItemRating[0]?.ratings
                        : rating
                    }
                    setRating={setRating}
                  />

                  {findCurrentItemRating[0]?.ratings ? (
                    <UpdateRate
                      onClick={handleUpdateRating}
                      disabled={!rating || isUpdating}
                    >
                      {!isUpdating ? (
                        <>
                          Update Rating <RiUploadCloudFill />
                        </>
                      ) : (
                        <MiniLoader />
                      )}
                    </UpdateRate>
                  ) : (
                    <SubmitRate
                      onClick={handleInsertRating}
                      disabled={!rating || isInserting}
                    >
                      {!isInserting ? (
                        <>
                          Rate <BsHandThumbsUpFill />
                        </>
                      ) : (
                        <MiniLoader />
                      )}
                    </SubmitRate>
                  )}

                  {findCurrentItemRating[0]?.ratings > 0 && (
                    <DeleteRate
                      onClick={handleDeleteRating}
                      disabled={isDeleting}
                    >
                      {!isDeleting ? (
                        <>
                          Delete Rating <BsTrashFill />
                        </>
                      ) : (
                        <MiniLoader />
                      )}
                    </DeleteRate>
                  )}
                </React.Fragment>
              )}
            </Modal.Body>
          </Modal.Overlay>
        </Modal>
      )}
    </>
  );
}

export default RateMovie;
