import React, { useMemo, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/auth/useUser';
import { useViewedMovies } from '../hooks/movies/useViewedMovies';
import { useRatings } from '../hooks/movies/useRatings';
import { useRemoveFromViewlist } from '../hooks/movies/mutations/useRemoveFromViewlist';
import SortBy from '../components/sorting/sortBy';
import Filter from '../components/sorting/filter';
import SmallLoader from '../components/loaders/SmallLoader';
import Modal from '../interface/compound components/Modal';
import {
  BsFillBookmarkCheckFill,
  BsInfoCircle,
  BsFillGrid3X3GapFill,
} from 'react-icons/bs';
import {
  FaStar,
  FaRegStar,
  FaTags,
  FaPlay,
  FaCheck,
  FaListUl,
} from 'react-icons/fa';
import { FaArrowUpLong, FaArrowDownLong } from 'react-icons/fa6';
import { MdKeyboardArrowRight } from 'react-icons/md';

import 'react-lazy-load-image-component/src/effects/opacity.css';

// the filter buttons for genre, type and year
const filterGenre = [
  {
    label: 'Action',
    value: 'Action',
  },
  {
    label: 'Adventure',
    value: 'Adventure',
  },
  {
    label: 'Animation',
    value: 'Animation',
  },
  {
    label: 'Biography',
    value: 'Biography',
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
    label: 'Family',
    value: 'Family',
  },
  {
    label: 'Fantasy',
    value: 'Fantasy',
  },
  {
    label: 'History',
    value: 'History',
  },
  {
    label: 'Horror',
    value: 'Horror',
  },
  {
    label: 'Kids',
    value: 'Kids',
  },
  {
    label: 'Music',
    value: 'Music',
  },
  {
    label: 'Mystery',
    value: 'Mystery',
  },
  {
    label: 'Psychological',
    value: 'Psychological',
  },
  {
    label: 'Romance',
    value: 'Romance',
  },
  {
    label: 'Sci-Fi',
    value: 'Sci-Fi',
  },
  {
    label: 'Sport',
    value: 'Sport',
  },
  {
    label: 'Thriller',
    value: 'Thriller',
  },
  {
    label: 'War',
    value: 'War',
  },
  {
    label: 'Western',
    value: 'Western',
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

function ViewlistPageWrapper() {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();

  return (
    <div className='flex items-center justify-center w-full'>
      {isAuthenticated ? (
        <ViewlistPage />
      ) : (
        <div
          style={{
            height: 'calc(100vh - 96px - 61px)',
            background: `radial-gradient(
                         circle,
                       rgba(0, 0, 0, 0.6),
                       rgba(0, 0, 0, 0.8),
                       rgba(0, 0, 0, 0.9),
                       rgba(0, 0, 0, 1)
                         ),url(authBg.jpg) no-repeat center / cover`,
          }}
          className='flex items-center justify-center w-full'
        >
          <div className='w-[1280px] flex flex-col gap-3 items-center justify-center rounded-md shadow-lg bg-neutral-400/20 backdrop-blur p-6 border-none outline outline-1 outline-neutral-800'>
            <p className='text-stone-200 text-lg tracking-wider text-center'>
              To view the content of this page, please sign in to your account.
              If you don't have an account, feel free to create one—it's quick
              and easy! By logging in, you'll gain access to personalized
              features and a better overall experience.
            </p>

            <div className='flex items-center justify-center gap-6'>
              <button
                className='outline-none border-none bg-neutral-900 text-base text-slate-500 font-medium tracking-wide py-2 px-3 rounded-md shadow-lg hover:bg-neutral-950 hover:text-slate-400 focus-visible:bg-neutral-950 focus-visible:text-slate-400 transition-all duration-300'
                type='button'
                onClick={() => navigate('/')}
              >
                Home Page
              </button>

              <button
                className='outline-none border-none bg-neutral-900 text-base text-slate-500 font-medium tracking-wide py-2 px-3 rounded-md shadow-lg hover:bg-neutral-950 hover:text-slate-400 focus-visible:bg-neutral-950 focus-visible:text-slate-400 transition-all duration-300'
                type='button'
                onClick={() => navigate('/discovery')}
              >
                Discovery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewlistPageWrapper;

// displays the entire viewlist page
function ViewlistPage() {
  const { user } = useUser();
  const { viewedMovies, isFetching } = useViewedMovies(user?.id);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [pageLayout, setPageLayout] = useState('column');

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
            pageLayout={pageLayout}
            setPageLayout={setPageLayout}
          />

          <ViewlistMovies
            filteredMovies={filteredMovies}
            userId={user?.id}
            pageLayout={pageLayout}
          />
        </React.Fragment>
      )}
    </div>
  );
}

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
  pageLayout,
  setPageLayout,
}) {
  return (
    <div className='flex items-center justify-between p-3'>
      <ViewlistLength movies={movies} />

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

        <ViewlistLayout
          pageLayout={pageLayout}
          setPageLayout={setPageLayout}
        />
      </div>
    </div>
  );
}

// displays the total viewed titles of the user
function ViewlistLength({ movies }) {
  return (
    <p className='text-stone-200 text-base tracking-wider'>
      {movies?.length
        ? `${movies?.length} ${movies?.length === 1 ? 'title' : 'titles'} found`
        : 'No titles found'}
    </p>
  );
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
        height='h-[560px]'
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

        <div className='w-full flex items-center gap-3 flex-wrap'>
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
function ViewlistLayout({ pageLayout, setPageLayout }) {
  return (
    <div className='flex items-center'>
      <button
        className={`p-3 rounded-full border-none outline-none text-lg ${
          pageLayout === 'column'
            ? 'text-red-400 bg-transparent hover:bg-red-700/10 focus-visible:bg-red-700/10'
            : 'text-stone-400 bg-transparent hover:text-stone-200 hover:bg-stone-400/10 focus-visible:text-stone-200 focus-visible:bg-stone-400/10'
        }`}
        type='button'
        value='column'
        onClick={() => setPageLayout('column')}
      >
        <FaListUl />
      </button>

      <button
        className={`p-3 rounded-full border-none outline-none text-lg ${
          pageLayout === 'grid'
            ? 'text-red-400 bg-transparent hover:bg-red-700/10 focus-visible:bg-red-700/10'
            : 'text-stone-400 bg-transparent hover:text-stone-200 hover:bg-stone-400/10 focus-visible:text-stone-200 focus-visible:bg-stone-400/10'
        }`}
        type='button'
        value='grid'
        onClick={() => setPageLayout('grid')}
      >
        <BsFillGrid3X3GapFill />
      </button>
    </div>
  );
}

// displays the viewed movies of the user and their details
function ViewlistMovies({ filteredMovies, userId, pageLayout }) {
  const [movieId, setMovieId] = useState(null);
  const [movieTitle, setMovieTitle] = useState(null);
  const { ratings, isFetching } = useRatings(userId, null);
  const { removeFromViewlist, isPending } = useRemoveFromViewlist(
    userId,
    movieId,
    movieTitle
  );

  const handleRemoveFromViewlist = (movieId, movieTitle) => {
    setMovieId(movieId);
    setMovieTitle(movieTitle);
    removeFromViewlist();
  };

  return (
    <div
      className={`${
        pageLayout === 'column'
          ? 'flex flex-col gap-6 p-3 bg-neutral-900/75'
          : 'grid grid-cols-8 gap-3 bg-transparent'
      } rounded-md`}
    >
      {filteredMovies.map(
        (
          {
            movies: {
              id,
              movieName,
              moviePoster,
              movieDuration,
              movieDescription,
              movieYear,
              movieGenre,
              movieDirector,
              movieStars,
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

          const userRating = ratings.find((rating) => rating?.item_id === id);

          return (
            <div
              key={index}
              className={`pb-3 ${
                pageLayout === 'column'
                  ? 'flex flex-col gap-3 border-b border-stone-300 last:border-b-0 last:pb-0'
                  : 'w-[215px] h-[540px] border-none bg-neutral-900/75 p-3 rounded-md'
              }`}
            >
              <div
                className={`${
                  pageLayout === 'column'
                    ? 'flex items-center justify-between'
                    : 'h-full w-full flex flex-col justify-between'
                }`}
              >
                <div
                  className={`${
                    pageLayout === 'column'
                      ? 'flex gap-3'
                      : 'flex flex-col gap-3 w-full'
                  }`}
                >
                  <div
                    className={`relative ${
                      pageLayout === 'column' ? 'w-24 h-36' : 'w-[191px] h-72'
                    }`}
                  >
                    <LazyLoadImage
                      className={`${
                        pageLayout === 'column'
                          ? 'w-24 h-36 rounded-tl-lg'
                          : 'w-[191px] h-72 rounded-tl-lg'
                      }`}
                      src={moviePoster}
                      alt={`Poster for ${movieName}`}
                      effect='opacity'
                      delayTime={500}
                    />

                    <div className='absolute top-0 -left-1'>
                      {isPending && movieId === id ? (
                        <span className='ml-1 w-[22.5px] h-[30px] bg-yellow-600 rounded-t-lg flex items-center justify-center'>
                          <SmallLoader fontSize='text-sm' />
                        </span>
                      ) : (
                        <button
                          type='button'
                          onClick={() =>
                            handleRemoveFromViewlist(id, movieName)
                          }
                          className='text-3xl outline-none border-none text-yellow-500 drop-shadow-lg hover:text-yellow-600 focus-visible:text-yellow-600 transition-all duration-300'
                        >
                          <BsFillBookmarkCheckFill />
                        </button>
                      )}
                    </div>
                  </div>

                  <div
                    className={`flex flex-col ${
                      pageLayout === 'column' ? 'gap-1' : 'gap-3'
                    }`}
                  >
                    <Link
                      to={`/about/${id}`}
                      className='text-stone-200 text-lg tracking-wide outline-none border-none hover:text-red-400 focus-visible:text-red-400 transition-all duration-300'
                    >
                      <span className='text-red-400 font-bold'>
                        {index + 1}.
                      </span>
                      &nbsp;
                      {movieName}
                    </Link>

                    {pageLayout === 'column' && (
                      <p className='text-sm text-stone-400 tracking-wide'>
                        {movieGenre.join(' • ')}
                      </p>
                    )}

                    <div className='flex items-center gap-3'>
                      <p className='text-sm text-stone-400 tracking-wide'>
                        {movieYear}
                      </p>

                      <p className='text-sm text-stone-400 tracking-wide'>
                        {formattedDuration}
                      </p>
                    </div>

                    <div className='flex items-center'>
                      {userRating ? (
                        <React.Fragment>
                          {isFetching ? (
                            <span className='w-12 flex items-center justify-center'>
                              <SmallLoader fontSize='text-sm' />
                            </span>
                          ) : (
                            <span className='w-12 flex items-center gap-1 text-sm text-stone-200'>
                              <span className='text-red-400 text-base mb-1'>
                                <FaStar />
                              </span>
                              {userRating?.ratings}
                            </span>
                          )}
                        </React.Fragment>
                      ) : (
                        <Link
                          className='w-12 h-4 flex items-center gap-1 p-0 text-sm tracking-wider text-stone-200 outline-none border-none hover:text-red-400 focus-visible:text-red-400 transition-all duration-300'
                          to={`/about/${id}?rate-movie`}
                        >
                          <span className='text-red-400 text-base mb-1'>
                            <FaRegStar />
                          </span>
                          Rate
                        </Link>
                      )}
                    </div>
                  </div>
                </div>

                <Modal>
                  <Modal.Open
                    opens='movie-informations'
                    renderButton={() => (
                      <button
                        type='button'
                        className={`outline-none border-none ${
                          pageLayout === 'column'
                            ? 'bg-transparent rounded-full text-red-400 text-xl p-3 self-center hover:bg-red-700/10 focus-visible:bg-red-700/10'
                            : 'bg-stone-400/10 text-red-400 py-1.5 rounded-md text-sm font-medium tracking-wider hover:bg-red-700/10 focus-visible:bg-red-700/10'
                        } transition-all duration-300`}
                      >
                        {pageLayout === 'column' ? <BsInfoCircle /> : 'Details'}
                      </button>
                    )}
                  />

                  <Modal.Window
                    name='movie-informations'
                    height='h-[480px]'
                  >
                    <MovieInformations
                      movieId={id}
                      movieName={movieName}
                      moviePoster={moviePoster}
                      movieYear={movieYear}
                      movieDuration={formattedDuration}
                      movieGenre={movieGenre}
                      movieDescription={movieDescription}
                      movieDirector={movieDirector}
                      movieStars={movieStars}
                      userRating={userRating}
                      isFetching={isFetching}
                      isPending={isPending}
                      removeFromViewlist={removeFromViewlist}
                      stateId={movieId}
                      stateSetId={setMovieId}
                      stateTitle={movieTitle}
                      stateSetTitle={setMovieTitle}
                    />
                  </Modal.Window>
                </Modal>
              </div>

              {pageLayout === 'column' && (
                <div className='flex flex-col gap-1'>
                  <p className='text-sm text-stone-300 tracking-wider'>
                    {movieDescription}
                  </p>

                  <div className='flex items-center gap-3'>
                    <p className='flex items-center gap-3 text-sm text-red-400 tracking-wider'>
                      <span className='text-stone-200 font-bold'>Director</span>
                      {movieDirector}
                    </p>

                    <p className='flex items-center gap-3 text-sm text-red-400 tracking-wider'>
                      <span className='text-stone-200 font-bold'>Stars</span>
                      {movieStars.join(' • ')}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        }
      )}
    </div>
  );
}

function MovieInformations({
  movieId,
  movieName,
  moviePoster,
  movieYear,
  movieDuration,
  movieGenre,
  movieDescription,
  movieDirector,
  movieStars,
  userRating,
  isFetching,
  isPending,
  removeFromViewlist,
  stateId,
  stateSetId,
  stateTitle,
  stateSetTitle,
}) {
  const navigate = useNavigate();

  const handleRemoveFromViewlist = (movieId, movieTitle) => {
    stateSetId(movieId);
    stateSetTitle(movieTitle);
    removeFromViewlist();
  };

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex gap-3'>
        <LazyLoadImage
          className='w-24 h-36 rounded-tl-lg'
          src={moviePoster}
          alt={`Poster for ${movieName}`}
          effect='opacity'
          delayTime={500}
        />

        <div className='flex flex-col gap-1'>
          <Link
            className='group flex items-center text-stone-200 text-xl font-bold tracking-wide'
            to={`/about/${movieId}`}
          >
            {movieName}
            <span className='text-3xl group-hover:text-red-400'>
              <MdKeyboardArrowRight />
            </span>
          </Link>

          <div className='flex flex-col gap-1'>
            <p className='text-sm text-stone-400 tracking-wide'>
              {movieYear} • {movieDuration}
            </p>

            <p className='text-sm text-stone-400 tracking-wide'>
              {movieGenre.join(' • ')}
            </p>

            <div className='flex items-center my-0.5'>
              {userRating ? (
                <React.Fragment>
                  {isFetching ? (
                    <span className='w-12 flex items-center justify-center'>
                      <SmallLoader fontSize='text-sm' />
                    </span>
                  ) : (
                    <span className='w-12 flex items-center gap-1 text-sm text-stone-200'>
                      <span className='text-red-400 text-base mb-1'>
                        <FaStar />
                      </span>
                      {userRating?.ratings}
                    </span>
                  )}
                </React.Fragment>
              ) : (
                <Link
                  className='w-12 h-4 flex items-center gap-1 p-0 text-sm tracking-wider text-stone-200 outline-none border-none hover:text-red-400 focus-visible:text-red-400 transition-all duration-300'
                  to={`/about/${movieId}?rate-movie`}
                >
                  <span className='text-red-400 text-base mb-1'>
                    <FaRegStar />
                  </span>
                  Rate
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <p className='text-stone-200 text-sm tracking-wider'>
        {movieDescription}
      </p>

      <div className='flex flex-col gap-3'>
        <p className='flex items-center gap-3 text-sm text-red-400 tracking-wider'>
          <span className='text-stone-400 font-bold'>Director</span>
          {movieDirector}
        </p>

        <p className='flex items-center gap-3 text-sm text-red-400 tracking-wider'>
          <span className='text-stone-400 font-bold'>Stars</span>
          {movieStars.join(' • ')}
        </p>
      </div>

      <div className='w-full flex items-center justify-center gap-6'>
        <button
          type='button'
          onClick={() => navigate(`/trailer-for/${movieId}`)}
          className='w-full bg-stone-400/10 text-red-400 flex items-center justify-center gap-3 py-1.5 rounded-md text-base tracking-wide font-medium outline-none border-none hover:bg-red-700/10 focus-visible:bg-red-700/10 transition-all duration-300'
        >
          <span className='text-sm'>
            <FaPlay />
          </span>
          Trailer
        </button>

        <button
          type='button'
          disabled={isPending}
          onClick={() => handleRemoveFromViewlist(movieId, movieName)}
          className='w-full bg-stone-400/10 text-red-400 flex items-center justify-center gap-3 py-1.5 rounded-md text-base tracking-wide font-medium outline-none border-none hover:bg-red-700/10 focus-visible:bg-red-700/10 disabled:cursor-not-allowed disabled:bg-neutral-950 transition-all duration-300'
        >
          {isPending ? (
            <SmallLoader />
          ) : (
            <React.Fragment>
              <span className='text-sm'>
                <FaCheck />
              </span>
              Viewed
            </React.Fragment>
          )}
        </button>
      </div>
    </div>
  );
}
