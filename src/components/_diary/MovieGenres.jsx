import { capitalizeWords } from '../../utils/functions';

export default function MovieGenres({ movieGenre, type }) {
  return (
    <div className='w-full h-auto flex items-center self-start gap-1.5 md:gap-3'>
      <span className='whitespace-nowrap w-auto h-auto flex items-center justify-center text-center text-xs md:text-sm text-white font-medium tracking-wider bg-blue-400 py-0.5 px-2 md:py-1 md:px-3 rounded-full shadow-sm'>
        {capitalizeWords(type)}
      </span>

      <div className='w-full h-auto flex items-center self-start gap-1.5 md:gap-3 overflow-hidden'>
        {movieGenre &&
          movieGenre.map((genre, index) => (
            <span
              key={index}
              className='whitespace-nowrap w-auto h-auto flex items-center justify-center text-center text-xs md:text-sm text-black font-medium tracking-wider bg-white py-0.5 px-2 md:py-1 md:px-3 rounded-full shadow-sm'
            >
              {genre}
            </span>
          ))}
      </div>
    </div>
  );
}
