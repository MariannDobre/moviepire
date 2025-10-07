import { memo } from 'react';
import { Link } from 'react-router-dom';

import LazyImage from '../../../utils/LazyImage';

import { BsBoxArrowRight } from 'react-icons/bs';

const SliderCard = memo(({ item }) => {
  return (
    <div className='group w-full h-[476px] rounded-md border border-neutral-700 relative cursor-pointer'>
      <LazyImage
        src={item.moviePoster}
        alt={`Poster of ${item.movieName}`}
        className='w-full h-full rounded-md object-cover'
      />

      {/* <img
        src={item.moviePoster}
        alt={item.movieName}
        className='w-full h-full rounded-md object-cover'
        loading='lazy'
      /> */}

      <div className='absolute top-[calc(100%+1px)] z-[5] w-full h-full flex flex-col gap-3 p-6 rounded-md bg-black/65 backdrop-blur-lg group-hover:top-0 group-focus-visible:top-0 transition-all duration-500'>
        <h1 className='w-full h-auto text-white text-xl font-medium tracking-wide'>
          {item.movieName}
        </h1>

        <div className='w-full h-auto flex items-center justify-start gap-3'>
          <p className='text-neutral-400 text-base font-normal tracking-wide'>
            {item.movieYear}
          </p>

          <span className='text-neutral-400 text-base'>|</span>

          <p className='text-neutral-400 text-base font-normal tracking-wide'>
            {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
          </p>
        </div>

        <p className='w-full h-auto text-neutral-400 text-base font-normal tracking-wide'>
          {item.movieGenre.join(' • ')}
        </p>

        <Link
          to={`/about-movie/${item.id}`}
          className='outline-none border border-yellow-500 cursor-pointer mt-auto py-1.5 px-3 rounded-md flex items-center justify-center gap-2 bg-yellow-950/45 text-yellow-500 text-base font-medium tracking-wide hover:bg-yellow-950/75 hover:-translate-y-2 focus-visible:bg-yellow-950/75 focus-visible:-translate-y-2 transition-all duration-300'
        >
          Explore&nbsp;
          <span className='text-yellow-500 text-lg'>
            <BsBoxArrowRight />
          </span>
        </Link>
      </div>
    </div>
  );
});

SliderCard.displayName = 'SliderCard';

export default SliderCard;
