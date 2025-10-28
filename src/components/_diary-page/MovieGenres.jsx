import { capitalizeWords } from '../../utils/functions';

export default function MovieGenres({ movieGenre, type }) {
  return (
    <div className='w-full h-auto flex items-center self-start gap-3'>
      <span className='whitespace-nowrap w-auto h-auto flex items-center justify-center text-center bg-amber-400 text-black text-xs font-medium tracking-wider py-1 px-3 rounded-md'>
        {capitalizeWords(type)}
      </span>

      <div className='w-full h-auto flex items-center self-start gap-3'>
        {movieGenre &&
          movieGenre.map((genre, index) => (
            <span
              key={index}
              className='whitespace-nowrap w-auto h-auto flex items-center justify-center text-center bg-neutral-100 text-black text-xs font-medium tracking-wider py-1 px-3 rounded-md'
            >
              {genre}
            </span>
          ))}
      </div>
    </div>
  );
}
