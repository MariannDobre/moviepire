import { useAllRatings } from '../../hooks/movies/useAllRatings';

import SmallLoader from '../loaders/SmallLoader';

import { FaArrowTrendUp } from 'react-icons/fa6';

const responsiveStyles = {
  cardDimensions: 'h-40 xl:h-56 p-3 xl:p-6 rounded-md lg:rounded-lg',
  themeIcon:
    'w-8 h-8 xl:w-12 xl:h-12 text-lg xl:text-2xl rounded-md lg:rounded-lg',
  value: 'text-2xl xl:text-4xl',
  heading: 'text-sm lg:text-base',
  subheading: 'text-xs lg:text-sm',
};

function getFeedbackString(average) {
  if (average <= 4) return "You're hard to please...";
  if (average <= 6.5) return 'You enjoy the occasional gem!';
  if (average <= 8.5) return 'You have great taste!';
  return 'You`re a true movie lover!';
}

export default function AverageRating({ userId }) {
  const { allRatings, isFetching, error } = useAllRatings(userId);

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

  if (error)
    return (
      <div
        className={`${responsiveStyles.cardDimensions} w-auto flex flex-col items-center justify-center bg-neutral-900/75 border border-red-700 shadow-sm`}
      >
        <p className='text-red-500 text-lg font-normal tracking-wide text-center'>
          There was an error while fetching the data...
          <br />
          {error?.message}
        </p>
      </div>
    );

  if (isFetching)
    return (
      <div
        className={`${responsiveStyles.cardDimensions} w-auto flex flex-col items-center justify-center bg-neutral-900/75 border border-yellow-700 shadow-sm`}
      >
        <p className='text-yellow-500 text-lg font-normal tracking-wide text-center'>
          Loading your average rating...
        </p>

        <SmallLoader
          size='text-2xl'
          color='text-yellow-700'
        />
      </div>
    );

  return (
    <div
      className={`${responsiveStyles.cardDimensions} w-auto flex flex-col bg-neutral-900/75 border border-neutral-500 shadow-sm hover:border-neutral-400 focus-visible:border-neutral-400 hover:shadow-lg focus-visible:shadow-lg hover:-translate-y-2 focus-visible:-translate-y-2 transition-all duration-500`}
    >
      <div className='w-full flex items-center justify-between'>
        <span
          className={`${responsiveStyles.themeIcon} flex items-center justify-center bg-violet-700/35 text-violet-500 shadow-sm drop-shadow-sm`}
        >
          <FaArrowTrendUp />
        </span>
      </div>

      <div className='w-full flex flex-col mt-auto'>
        <span
          className={`${responsiveStyles.value} text-white font-semibold tracking-wide`}
        >
          {average ?? 'N/A'}
        </span>

        <p
          className={`${responsiveStyles.heading} text-gray-400 font-medium tracking-wide`}
        >
          Average Rating
        </p>

        <p
          className={`${responsiveStyles.subheading} text-violet-500 font-normal tracking-wide`}
        >
          {average ? getFeedbackString(average) : 'No ratings yet.'}
        </p>
      </div>
    </div>
  );
}
