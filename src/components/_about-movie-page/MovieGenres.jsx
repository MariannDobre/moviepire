// import { useUser } from '../../hooks/auth/useUser';
// import { useRating } from '../../hooks/movies/useRating';

export default function MovieGenres({ movieGenres }) {
  // const { user, isAuthenticated } = useUser();
  // const { rating } = useRating(user?.id, movieId);

  // const currentRatingData = ratings?.find(
  //   (item) => item.item_id === Number(movieId)
  // );
  // const yourRating = rating?.ratings || 0;

  // return (
  //   <div className='w-full lg:w-1/4 h-full p-3 lg:p-6 border border-neutral-500 rounded-md lg:rounded-lg shadow-sm flex flex-col gap-3 items-start justify-start'>
  //     <h6 className='text-start text-base lg:text-lg text-white font-medium tracking-wide'>
  //       Movie Details
  //     </h6>

  //     <div className='w-full h-auto flex flex-col gap-2'>
  //       <div className='w-full flex items-center justify-between'>
  //         <p className='text-sm lg:text-base text-gray-400 font-normal tracking-wide'>
  //           Budget:
  //         </p>

  //         <span className='text-sm lg:text-base text-white font-normal tracking-wide'>
  //           {movieBudget ? movieBudget : 'No record found'}
  //         </span>
  //       </div>

  //       <div className='w-full flex items-center justify-between'>
  //         <p className='text-sm lg:text-base text-gray-400 font-normal tracking-wide'>
  //           Runtime:
  //         </p>

  //         <span className='text-sm lg:text-base text-white font-normal tracking-wide'>
  //           {movieRuntime}&nbsp;minutes
  //         </span>
  //       </div>

  //       <div className='w-full flex items-center justify-between'>
  //         <p className='text-sm lg:text-base text-gray-400 font-normal tracking-wide'>
  //           Release Year:
  //         </p>

  //         <span className='text-sm lg:text-base text-white font-normal tracking-wide'>
  //           {movieYear}
  //         </span>
  //       </div>

  //       <div className='w-full flex items-center justify-between'>
  //         <p className='text-sm lg:text-base text-gray-400 font-normal tracking-wide'>
  //           IMDb Rating:
  //         </p>

  //         <span className='text-sm lg:text-base text-white font-normal tracking-wide'>
  //           {imdbRating ? `${imdbRating}/10` : 'No record found'}
  //         </span>
  //       </div>

  //       <div className='w-full flex items-center justify-between'>
  //         <p className='text-sm lg:text-base text-gray-400 font-normal tracking-wide'>
  //           Your Rating:
  //         </p>

  //         <p className='text-sm lg:text-base text-white font-normal tracking-wide'>
  //           {yourRating ? (
  //             <React.Fragment>
  //               <span className='text-yellow-500'>{yourRating}</span>/10
  //             </React.Fragment>
  //           ) : (
  //             "You didn't rate this title yet"
  //           )}
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  // );

  return (
    <ul className='w-full h-auto flex items-center gap-3'>
      {movieGenres.map((genre, index) => (
        <li
          key={index}
          className='border border-neutral-700 bg-white/15 py-1 px-3 rounded-md text-xs text-neutral-200 font-medium tracking-widest leading-relaxed'
        >
          {genre}
        </li>
      ))}
    </ul>
  );
}
