import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { useUser } from '../hooks/useUser';

const actionsButtonsStyles =
  'text-sm text-center text-red-400 tracking-wider bg-neutral-800/50 py-1 px-2 outline outline-1 outline-neutral-400/50 border-none cursor-pointer rounded-full shadow-lg hover:text-red-400/75 hover:bg-neutral-800/25 hover:outline-neutral-500 transition-all duration-300';

function AboutMovie() {
  const params = useParams();
  const navigate = useNavigate();
  const { movieId } = params;
  const { movieDetails } = useMovieDetails(movieId);
  const { isAuthenticated } = useUser();

  const movieDuration = movieDetails?.movieDuration;
  const totalMinutes = parseInt(movieDuration, 10);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedDuration = `${hours}h ${minutes < 10 ? 0 : ''}${minutes}m`;

  return (
    <div className='flex flex-col gap-12'>
      <div
        style={{
          background: `linear-gradient(
          to bottom,
          rgba(0, 0, 0, 1),
          rgba(0, 0, 0, 0.75),
          rgba(0, 0, 0, 0.5),
          rgba(0, 0, 0, 0.25),
          rgba(0, 0, 0, 0.5),
          rgba(0, 0, 0, 0.75),
          rgba(0, 0, 0, 1)
          ), url(${movieDetails.movieBg}) no-repeat top / cover`,
        }}
        className='w-full h-[720px] flex justify-between p-12'
      >
        <div>
          <div className='flex gap-4 self-start'>
            <img
              className='w-28 h-44'
              src={movieDetails.moviePoster}
              alt={`Poster for ${movieDetails.movieName}`}
            />

            <div className='flex flex-col gap-2'>
              <h1 className='text-3xl text-stone-200 tracking-wide'>
                {movieDetails.movieName}
              </h1>

              <div className='flex text-stone-400 gap-2'>
                <p>{movieDetails.movieYear}</p>

                <p className='capitalize'>{movieDetails.type}</p>

                <p>{formattedDuration}</p>
              </div>

              <div className='flex gap-2'>
                {movieDetails.movieGenre.map((el, index) => (
                  <span
                    key={index}
                    className='text-sm text-center text-red-400 tracking-wider bg-neutral-800/50 shadow-lg py-1 px-2 rounded-full outline outline-1 outline-neutral-400/50'
                  >
                    {el}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-4 self-end'>
          <button
            className={actionsButtonsStyles}
            onClick={() => navigate(`/trailer-for/${movieDetails.id}`)}
          >
            Play Trailer
          </button>

          <button className={actionsButtonsStyles}>Add to Viewlist</button>

          <button className={actionsButtonsStyles}>Rate Title</button>

          <button className={actionsButtonsStyles}>View Clip</button>
        </div>
      </div>

      <div className='flex flex-col gap-6'>
        <div className='bg-neutral-900/75 flex flex-col gap-3 p-6 outline outline-1 outline-neutral-400/50 rounded-md'>
          <h2 className='text-red-400 text-2xl font-bold tracking-wider'>
            About this title
          </h2>

          <p className='text-stone-200 text-base tracking-wide'>
            {movieDetails.movieDescription}
          </p>
        </div>

        <div className='bg-neutral-900/75 flex flex-col gap-3 p-6 outline outline-1 outline-neutral-400/50 rounded-md self-start'>
          <h2 className='text-red-400 text-2xl font-bold tracking-wider'>
            Cast and crew
          </h2>

          <div className='flex flex-col gap-1'>
            <p className='flex items-center gap-2 text-base text-stone-200 tracking-wide'>
              <span className='text-red-300 tracking-wide font-semibold'>
                Director
              </span>
              {movieDetails.movieDirector}
            </p>
            <p className='flex items-center gap-2 text-base text-stone-200 tracking-wide'>
              <span className='text-red-300 tracking-wide font-semibold'>
                Writers
              </span>
              {movieDetails.movieWriters.join(' • ')}
            </p>
            <p className='flex items-center gap-2 text-base text-stone-200 tracking-wide'>
              <span className='text-red-300 tracking-wide font-semibold'>
                Top stars
              </span>
              {movieDetails.movieStars.join(' • ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutMovie;
