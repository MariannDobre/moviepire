import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../hooks/auth/useUser';
import { useViewedMovies } from '../hooks/movies/useViewedMovies';
import { useRatings } from '../hooks/movies/useRatings';
import { useRemoveRating } from '../hooks/movies/mutations/useRemoveRating';
import { useRemoveFromViewlist } from '../hooks/movies/mutations/useRemoveFromViewlist';
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';
import { BsBookmarkCheckFill } from 'react-icons/bs';
import { FaArrowUpLong, FaArrowDownLong } from 'react-icons/fa6';
import SortBy from '../components/sorting/sortBy';
import Filter from '../components/sorting/filter';
import SmallLoader from '../components/loaders/SmallLoader';

function Test() {
  const [viewDescription, setViewDescription] = useState(null);
  const [movieId, setMovieId] = useState(null);
  const [movieTitle, setMovieTitle] = useState(null);
  const [favoriteRecordId, setFavoriteRecordId] = useState(null);
  const { user } = useUser();
  const userId = user?.id;
  const { viewedMovies, isFetching: isGettingMovies } = useViewedMovies(userId);
  const { dbRatings, isPending: isGettingRatings } = useRatings(userId, null);
  const { removeFromFavorites } = useRemoveFromViewlist(
    userId,
    movieId,
    movieTitle
  );
  const { deleteRating } = useRemoveRating(
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

// displays the entire viewlist page
function ViewlistPage() {
  const { user } = useUser();

  return (
    <div className='w-full'>
      <ViewlistHeading username={user?.user_metadata?.username} />
    </div>
  );
}

export default ViewlistPage;

// displays the heading of the page
function ViewlistHeading({ username }) {
  return (
    <div className='flex flex-col gap-1 p-3 rounded-md bg-neutral-900/75'>
      <h1 className='text-stone-200 text-3xl tracking-wide font-bold'>
        Your Viewlist
      </h1>

      <span className='text-stone-400 text-base tracking-wide'>
        by <strong className='text-red-400 tracking-wide'>{username}</strong>
      </span>

      <p className='text-stone-400 text-base tracking-wide'>
        Your Viewlist is the place to track the titles that you've watched. You
        can sort your Viewlist by your rating, year, title and runtime.
      </p>
    </div>
  );
}

// displays the details such as total viewed titles of the user, the sorting feature, the order of the sorting, the layout (as column or as grid)
function ViewlistDetails() {
  return <div></div>;
}

// displays the total viewed titles of the user
function ViewlistLength() {
  return <div></div>;
}

// displays the sorting feature
function ViewlistSorting() {
  return <div></div>;
}

// let the user to choose the layout of the page
function ViewlistLayout() {
  return <div></div>;
}

// displays the viewed movies of the user and their details
function ViewlistMovies() {
  return <div></div>;
}
