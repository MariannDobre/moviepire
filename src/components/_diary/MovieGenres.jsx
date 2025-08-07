import { capitalizeWords } from '../../utils/functions';

export default function MovieGenres({ movieGenre, type }) {
  return (
    <div className='w-full h-auto flex items-center self-start gap-1.5 lg:gap-3'>
      <span className='whitespace-nowrap w-auto h-auto flex items-center justify-center text-center text-xs lg:text-sm text-white font-medium tracking-wider bg-blue-400 py-0.5 px-2 lg:py-1 lg:px-3 rounded-md lg:rounded-xl xl:rounded-full shadow-sm'>
        {capitalizeWords(type)}
      </span>

      <div className='w-full h-auto flex items-center self-start gap-1.5 lg:gap-3 overflow-hidden'>
        {movieGenre &&
          movieGenre.map((genre, index) => (
            <span
              key={index}
              className='whitespace-nowrap w-auto h-auto flex items-center justify-center text-center text-xs lg:text-sm text-black font-medium tracking-wider bg-white py-0.5 px-2 lg:py-1 lg:px-3 rounded-md lg:rounded-xl xl:rounded-full shadow-sm'
            >
              {genre}
            </span>
          ))}
      </div>
    </div>
  );
}
