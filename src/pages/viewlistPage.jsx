import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../hooks/auth/useUser';
import { useViewedMovies } from '../hooks/movies/useViewedMovies';
import { useRatings } from '../hooks/movies/useRatings';
import { useRemoveRating } from '../hooks/movies/mutations/useRemoveRating';
import { useRemoveFromViewlist } from '../hooks/movies/mutations/useRemoveFromViewlist';
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';
import { BsBookmarkCheckFill } from 'react-icons/bs';
import { FaArrowUpLong, FaArrowDownLong, FaTag } from 'react-icons/fa6';
import { FaTags } from 'react-icons/fa';
import SortBy from '../components/sorting/sortBy';
import Filter from '../components/sorting/filter';
import SmallLoader from '../components/loaders/SmallLoader';
import Modal from '../interface/compound components/Modal';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import { FaListUl } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import 'react-lazy-load-image-component/src/effects/opacity.css';

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

//
const filterGenre = [
  {
    label: 'Action',
    value: 'Action',
  },
  {
    label: 'Comedy',
    value: 'Comedy',
  },
  {
    label: 'Crime',
    value: 'Crime',
  },
  {
    label: 'Drama',
    value: 'Drama',
  },
  {
    label: 'Thriller',
    value: 'Thriller',
  },
  {
    label: 'Romance',
    value: 'romance',
  },
];

const filterType = [
  {
    label: 'Movie',
    value: 'movie',
  },
  {
    label: 'TV Show',
    value: 'tv show',
  },
  {
    label: 'Animation',
    value: 'animation',
  },
];

const filterYear = [
  {
    label: '80s',
    value: { startYear: 1980, endYear: 1989 },
  },
  {
    label: '90s',
    value: { startYear: 1990, endYear: 1999 },
  },
  {
    label: '00s',
    value: { startYear: 2000, endYear: 2009 },
  },
  {
    label: '10s',
    value: { startYear: 2010, endYear: 2019 },
  },
  {
    label: '20s',
    value: { startYear: 2020, endYear: 2029 },
  },
];

const testData = [
  { title: 'rocky', year: 2020, genre: ['Action', 'Crime'], type: 'movie' },
  {
    title: 'malumosu',
    year: 2012,
    genre: ['Crime', 'Action', 'thriller'],
    type: 'tv show',
  },
  { title: 'girby', year: 2017, genre: ['romance', 'comedy'], type: 'movie' },
  {
    title: 'kingdom',
    year: 2020,
    genre: ['Crime', 'comedy', 'Action'],
    type: 'movie',
  },
  {
    title: 'fairy',
    year: 2008,
    genre: ['Crime', 'thriller'],
    type: 'animation',
  },
  { title: 'cars', year: 1997, genre: ['comedy', 'Action'], type: 'animation' },
];

// displays the entire viewlist page
function ViewlistPage() {
  const { isAuthenticated, user } = useUser();
  const { viewedMovies, isFetching } = useViewedMovies(user?.id);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  // filter the movies based on the selected filter
  const filteredMovies = viewedMovies?.filter((movie) => {
    const {
      movies: { movieGenre, movieYear, type },
    } = movie;

    const matchesGenres = selectedGenre?.length
      ? selectedGenre.every((genre) => movieGenre.includes(genre))
      : true;

    const matchesTypes = selectedType?.length
      ? selectedType.includes(type)
      : true;

    const matchesYears = selectedYear
      ? movieYear >= selectedYear.startYear && movieYear <= selectedYear.endYear
      : true;

    return matchesGenres && matchesTypes && matchesYears;
  });

  return (
    <div className={`w-full flex flex-col ${isFetching ? 'gap-6' : 'gap-3'}`}>
      <ViewlistHeading username={user?.user_metadata?.username} />

      {isFetching ? (
        <div className='flex items-center justify-center'>
          <SmallLoader fontSize='text-2xl' />
        </div>
      ) : (
        <React.Fragment>
          <ViewlistDetails
            movies={filteredMovies}
            selectedGenre={selectedGenre}
            setSelectedGenre={setSelectedGenre}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />

          <ViewlistMovies filteredMovies={filteredMovies} />
        </React.Fragment>
      )}
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
function ViewlistDetails({
  movies,
  selectedGenre,
  setSelectedGenre,
  selectedType,
  setSelectedType,
  selectedYear,
  setSelectedYear,
}) {
  return (
    <div className='flex items-center justify-between p-3'>
      <ViewlistLength />

      <div className='flex items-center gap-3'>
        <ViewlistFilter
          movies={movies}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />

        <ViewlistSorting />

        <ViewlistLayout />
      </div>
    </div>
  );
}

// displays the total viewed titles of the user
function ViewlistLength() {
  return <p className='text-stone-200 text-base tracking-wide'>150 Titles</p>;
}

// displays the button that allow the user to filter the fetched data
function ViewlistFilter({
  movies,
  selectedGenre,
  setSelectedGenre,
  selectedType,
  setSelectedType,
  selectedYear,
  setSelectedYear,
}) {
  return (
    <Modal>
      <Modal.Open
        opens='viewlist-filter'
        renderButton={() => (
          <button className='text-lg text-stone-400 bg-transparent p-3 rounded-full border-none outline-none hover:text-stone-200 hover:bg-stone-400/10 focus-visible:text-stone-200 focus-visible:bg-stone-400/10'>
            <FaTags />
          </button>
        )}
      />

      <Modal.Window
        name='viewlist-filter'
        height='h-[480px]'
      >
        <FilterTab
          movies={movies}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
      </Modal.Window>
    </Modal>
  );
}

function FilterTab({
  movies,
  selectedGenre,
  setSelectedGenre,
  selectedType,
  setSelectedType,
  selectedYear,
  setSelectedYear,
}) {
  // calculate how many movies have a certain genre tag
  const genreCounts = useMemo(() => {
    return filterGenre.reduce((counts, button) => {
      counts[button.value] = movies.filter((movie) =>
        movie.movies.movieGenre.includes(button.value)
      ).length;
      return counts;
    }, {});
  }, [movies]);

  // calculate how many movies have a certain type tag
  const typeCounts = useMemo(() => {
    return filterType.reduce((counts, button) => {
      counts[button.value] = movies.filter((movie) =>
        movie.movies.type.includes(button.value)
      ).length;
      return counts;
    }, {});
  }, [movies]);

  // handler to select certain genres
  const handleChangeGenre = (genre) => {
    if (selectedGenre?.includes(genre)) {
      // Remove the genre if already selected (toggle off)
      setSelectedGenre(selectedGenre.filter((g) => g !== genre));
    } else {
      // Add the genre if it's not selected (toggle on)
      setSelectedGenre([...selectedGenre, genre]);
    }
  };

  // handler to select certain type
  const handleChangeType = (type) => {
    if (selectedType === type) {
      setSelectedType(null);
    } else {
      setSelectedType(type);
    }
  };

  // handler to select certain year range
  const handleChangeYear = (yearRange) => {
    if (
      selectedYear &&
      selectedYear.startYear === yearRange.startYear &&
      selectedYear.endYear === yearRange.endYear
    ) {
      setSelectedYear(null);
    } else {
      setSelectedYear(yearRange);
    }
  };

  // handler to clear all selected filters
  const clearFilters = () => {
    setSelectedGenre([]);
    setSelectedType(null);
    setSelectedYear(null);
  };

  return (
    <div className='flex flex-col gap-6'>
      <div className='flex flex-col gap-3'>
        <p className='text-red-400 text-sm tracking-wider font-bold uppercase'>
          genres
        </p>

        <div className='flex items-center gap-3'>
          {filterGenre.map((button, index) => (
            <button
              key={index}
              value={button.value}
              type='button'
              onClick={() => handleChangeGenre(button.value)}
              className={`group rounded-md py-1 px-2 text-base font-medium tracking-wide border-none outline outline-1 ${
                selectedGenre?.includes(button.value)
                  ? 'bg-red-400 text-black outline-red-400 hover:text-stone-200 hover:bg-red-500 focus-visible:text-stone-200 focus-visible:bg-red-500'
                  : 'bg-transparent text-stone-200 outline-neutral-400/50 hover:bg-neutral-400/10 focus-visible:bg-neutral-400/10'
              } transition-all duration-300`}
            >
              {button.label}&nbsp;
              <span
                className={`text-sm ${
                  selectedGenre?.includes(button.value)
                    ? 'text-black group-hover:text-stone-200 group-focus-visible:text-stone-200'
                    : 'text-stone-400'
                } transition-all duration-300`}
              >
                ({genreCounts[button.value]})
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className='w-full h-px bg-neutral-400/50'></div>

      <div className='flex flex-col gap-3'>
        <p className='text-red-400 text-sm tracking-wider font-bold uppercase'>
          title type
        </p>

        <div className='flex items-center gap-3'>
          {filterType.map((button, index) => (
            <button
              key={index}
              value={button.value}
              type='button'
              onClick={() => handleChangeType(button.value)}
              className={`group rounded-md py-1 px-2 text-base font-medium tracking-wide border-none outline outline-1 ${
                selectedType?.includes(button.value)
                  ? 'bg-red-400 text-black outline-red-400 hover:text-stone-200 hover:bg-red-500 focus-visible:text-stone-200 focus-visible:bg-red-500'
                  : 'bg-transparent text-stone-200 outline-neutral-400/50 hover:bg-neutral-400/10 focus-visible:bg-neutral-400/10'
              } transition-all duration-300`}
            >
              {button.label}&nbsp;
              <span
                className={`text-sm ${
                  selectedType?.includes(button.value)
                    ? 'text-black group-hover:text-stone-200 group-focus-visible:text-stone-200'
                    : 'text-stone-400'
                } transition-all duration-300`}
              >
                ({typeCounts[button.value]})
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className='w-full h-px bg-neutral-400/50'></div>

      <div className='flex flex-col gap-3'>
        <p className='text-red-400 text-sm tracking-wider font-bold uppercase'>
          release year
        </p>

        <div className='flex items-center gap-3'>
          {filterYear.map((button, index) => (
            <button
              key={index}
              type='button'
              onClick={() => handleChangeYear(button.value)}
              className={`group rounded-md py-1 px-2 text-base font-medium ${
                selectedYear?.startYear === button.value.startYear &&
                selectedYear?.endYear === button.value.endYear
                  ? 'bg-red-400 text-black outline-red-400 hover:text-stone-200 hover:bg-red-500 focus-visible:text-stone-200 focus-visible:bg-red-500'
                  : 'bg-transparent text-stone-200 outline-neutral-400/50 hover:bg-neutral-400/10 focus-visible:bg-neutral-400/10'
              } tracking-wide border-none outline outline-1 transition-all duration-300`}
            >
              {button.label}
            </button>
          ))}
        </div>
      </div>

      <div className='w-full h-px bg-neutral-400/50'></div>

      <div className='self-start'>
        <button
          type='button'
          onClick={() => clearFilters()}
          className='rounded-md py-1 px-2 text-base font-medium tracking-wide border-none outline outline-1 bg-transparent text-stone-200 outline-neutral-400/50 hover:bg-neutral-400/10 focus-visible:bg-neutral-400/10 transition-all duration-300'
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
}

// displays the button that allow the user to sort the fetched data
function ViewlistSorting() {
  return (
    <div className='flex items-center gap-3'>
      <p className='text-stone-400 text-base tracking-wide'>Sort by:</p>

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
  );
}

// let the user to choose the layout of the page
function ViewlistLayout() {
  return (
    <div className='flex items-center'>
      <button
        className='p-3 rounded-full border-none outline-none text-lg text-stone-400 bg-transparent hover:text-stone-200 hover:bg-stone-400/10 focus-visible:text-stone-200 focus-visible:bg-stone-400/10'
        type='button'
        value='flex-column'
      >
        <FaListUl />
      </button>

      <button
        className='p-3 rounded-full border-none outline-none text-lg text-stone-400 bg-transparent hover:text-stone-200 hover:bg-stone-400/10 focus-visible:text-stone-200 focus-visible:bg-stone-400/10'
        type='button'
        value='grid'
      >
        <BsFillGrid3X3GapFill />
      </button>
    </div>
  );
}

// displays the viewed movies of the user and their details
function ViewlistMovies({ filteredMovies }) {
  return (
    <div className='flex flex-col gap-3'>
      {filteredMovies.map(
        (
          {
            movies: {
              movieName,
              moviePoster,
              movieDuration,
              movieYear,
              movieGenre,
            },
          },
          index
        ) => {
          const totalMinutes = parseInt(movieDuration, 10);
          const hours = Math.floor(totalMinutes / 60);
          const minutes = totalMinutes % 60;
          const formattedDuration = `${hours}h ${
            minutes < 10 ? 0 : ''
          }${minutes}m`;

          return (
            <div
              key={index}
              className='bg-red-100 flex flex-col'
            >
              <div className='flex'>
                <LazyLoadImage
                  className='w-full h-full'
                  src={moviePoster}
                  alt={`Poster for ${movieName}`}
                  effect='opacity'
                  delayTime={500}
                />

                <div>
                  <h1>
                    <span className='text-red-400'>{index + 1}</span>
                    {movieName}
                  </h1>

                  <div>
                    <p>{movieYear}</p>

                    <p>{formattedDuration}</p>
                  </div>
                </div>
              </div>

              <div></div>
              <p className='text-pink-300'>{movieYear}</p>
              <span className='text-pink-500'>{movieGenre}</span>
            </div>
          );
        }
      )}
    </div>
  );
}
