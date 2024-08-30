import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { useViewedMovies } from '../hooks/useViewedMovies';
import { useDeleteRating, useRating } from '../hooks/useRating';
import { useRemoveFromFavorite } from '../hooks/useAddToFavorites';
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';
import { BsBookmarkCheckFill } from 'react-icons/bs';
import { FaArrowUpLong, FaArrowDownLong } from 'react-icons/fa6';
import SortBy from '../components/sorting/sortBy';
import Filter from '../components/sorting/filter';
import SmallLoader from '../components/loaders/SmallLoader';

function ViewlistPage() {
  const [viewDescription, setViewDescription] = useState(null);
  const [movieId, setMovieId] = useState(null);
  const [movieTitle, setMovieTitle] = useState(null);
  const [favoriteRecordId, setFavoriteRecordId] = useState(null);
  const { user } = useUser();
  const userId = user?.id;
  const { viewedMovies, isPending: isGettingMovies } = useViewedMovies(userId);
  const { dbRatings, isPending: isGettingRatings } = useRating(userId, null);
  const { removeFromFavorites } = useRemoveFromFavorite(
    userId,
    movieId,
    movieTitle
  );
  const { deleteRating } = useDeleteRating(
    userId,
    movieId,
    movieTitle,
    favoriteRecordId
  );

  function handleViewDescription(id) {
    setViewDescription((viewDescription) =>
      viewDescription === id ? null : id
    );
  }

  function handleRemoveFromFavorites(id, title, recordId, userRating) {
    setMovieId(id);
    setMovieTitle(title);
    setFavoriteRecordId(recordId);
    removeFromFavorites();

    if (userRating === undefined) return;
    deleteRating();
  }

  return (
    <div>
      {userId ? (
        <>
          <p>Your Viewedlist</p>

          <div>
            <p>
              <strong>{viewedMovies?.length}</strong>&nbsp;Titles
            </p>

            <div>
              <p>Sort by:</p>

              <SortBy
                options={[
                  {
                    value: 'list_order',
                    label: 'List Order',
                  },
                  { value: 'alphabetical', label: 'Alphabetical' },
                  { value: 'release_date', label: 'Release Date' },
                  { value: 'runtime', label: 'Runtime' },
                  { value: 'your_ratings', label: 'Ratings' },
                ]}
              />

              <Filter
                filterField='order'
                options={[
                  { value: 'asc', label: <FaArrowUpLong /> },
                  { value: 'desc', label: <FaArrowDownLong /> },
                ]}
              />
            </div>
          </div>

          <>
            {viewedMovies?.length > 0 ? (
              <>
                {viewedMovies.map((movie) => {
                  const {
                    movies: {
                      id,
                      movieName,
                      movieYear,
                      movieDuration,
                      moviePoster,
                      movieDescription,
                      movieGenre,
                      movieDirector,
                      movieStars,
                      type,
                    },
                    record_id,
                  } = movie;
                  const truncatedDescription =
                    movieDescription.length > 350
                      ? `${movieDescription.slice(0, 350)}...`
                      : movieDescription;
                  const runtime = movieDuration;
                  const totalMinutes = parseInt(runtime, 10);
                  const hours = Math.floor(totalMinutes / 60);
                  const minutes = totalMinutes % 60;
                  const formattedRuntime = `${hours}h ${
                    minutes < 10 ? 0 : ''
                  }${minutes}m`;

                  const userRating = dbRatings.find(
                    (rating) => rating?.item_id === id
                  );

                  return (
                    <div key={id}>
                      {isGettingMovies ? (
                        <SmallLoader />
                      ) : (
                        <>
                          <img
                            src={moviePoster}
                            alt='Movie poster'
                          />
                          <button
                            onClick={() =>
                              handleRemoveFromFavorites(
                                id,
                                movieName,
                                record_id,
                                userRating
                              )
                            }
                          >
                            <BsBookmarkCheckFill />
                          </button>

                          <div>
                            <Link to={`/title-id/${id}`}>{movieName}</Link>

                            <div>
                              <p>{movieYear}</p>

                              <p>{formattedRuntime}</p>

                              <p>{type}</p>

                              <p>{movieGenre.join(', ')}</p>
                            </div>

                            <div>
                              {userRating ? (
                                <span>
                                  {isGettingRatings ? (
                                    <SmallLoader />
                                  ) : (
                                    <>
                                      <TiStarFullOutline />
                                      &nbsp;{userRating?.ratings}
                                    </>
                                  )}
                                </span>
                              ) : (
                                <Link to={`/title-id/${id}?rate-movie`}>
                                  <TiStarOutline /> Rate
                                </Link>
                              )}
                            </div>

                            <div>
                              <p>{movieDirector}</p>

                              <span>{movieStars.join(', ')}</span>
                            </div>

                            <p>
                              {movieDescription?.length > 350 &&
                              viewDescription === id
                                ? movieDescription
                                : truncatedDescription}
                              {movieDescription?.length > 350 ? (
                                <button
                                  style={{
                                    color:
                                      viewDescription === id ? '#fab005' : '',
                                  }}
                                  onClick={() => handleViewDescription(id)}
                                >
                                  {viewDescription === id
                                    ? 'collapse'
                                    : 'expand'}
                                </button>
                              ) : null}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </>
            ) : (
              <p>No titles added to the view list</p>
            )}
          </>
        </>
      ) : (
        <p>
          You need to register or to log in to be able to view your favorites
          movies
        </p>
      )}
    </div>
  );
}

export default ViewlistPage;
