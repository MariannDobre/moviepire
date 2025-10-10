import { useAllRatings } from '../../hooks/movies/useAllRatings';

import SmallLoader from '../loaders/SmallLoader';

import { FaArrowTrendUp } from 'react-icons/fa6';

function getFeedbackString(average) {
  if (average <= 4) return "You're hard to please...";
  if (average <= 6.5) return 'You enjoy the occasional gem!';
  if (average <= 8.5) return 'You have great taste!';
  return 'You`re a true movie lover!';
}

export default function AverageRating({ userId }) {
  const { allRatings, isFetching, error } = useAllRatings(userId);

  if (error)
    return (
      <div className='w-full h-full p-6 flex flex-col items-center justify-center bg-red-950/35 border border-red-500 rounded-md'>
        <p className='text-red-500 text-base font-normal tracking-wider text-center'>
          There was an error while fetching the stats for your average rating...
          <br />
          {error?.message}
        </p>
      </div>
    );

  if (isFetching)
    return (
      <div className='w-full h-full p-6 flex flex-col items-center justify-center gap-3 bg-yellow-950/45 border border-yellow-500 rounded-md'>
        <p className='text-yellow-500 text-base font-normal tracking-wider text-center'>
          Loading the stats for your average rating...
        </p>

        <SmallLoader
          size='text-2xl'
          color='text-yellow-500'
        />
      </div>
    );

  const ratings = allRatings
    ?.map((rating) => rating.ratings)
    .filter(
      (rating) => rating !== null && rating !== undefined && !isNaN(rating)
    );

  const average =
    ratings && ratings.length > 0
      ? (() => {
          const sum = ratings.reduce((acc, curr) => acc + Number(curr), 0);
          const rawAverage = sum / ratings.length;

          // Round to 1 decimal place and ensure it's between 1 and 10
          const roundedAverage = Math.round(rawAverage * 10) / 10;
          const clampedAverage = Math.min(10, Math.max(1, roundedAverage));

          return clampedAverage;
        })()
      : null;

  return (
    <div className='w-full h-full flex flex-col border border-neutral-700 p-6 rounded-md shadow-md'>
      <div className='w-full flex items-center justify-between'>
        <span className='w-12 h-12 flex items-center justify-center text-2xl bg-amber-700/35 text-amber-400 rounded-md drop-shadow-sm'>
          <FaArrowTrendUp />
        </span>
      </div>

      <div className='w-full flex flex-col gap-0.5 mt-auto'>
        <span className='text-4xl text-white font-semibold tracking-wide'>
          {average ?? 'N/A'}
        </span>

        <p className='text-lg text-neutral-400 font-medium tracking-wide'>
          Average Rating
        </p>

        <p className='flex items-center gap-1 text-amber-400 text-xs font-normal tracking-widest'>
          {average ? getFeedbackString(average) : 'No ratings yet.'}
        </p>
      </div>
    </div>
  );
}
