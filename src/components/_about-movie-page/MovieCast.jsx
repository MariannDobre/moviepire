export default function MovieCast({ movieWriters, movieStars }) {
  return (
    <div className='w-full h-auto flex flex-col gap-1.5'>
      <div className='w-full h-auto flex items-center gap-3'>
        <h6 className='text-amber-400 text-sm font-medium tracking-wider leading-relaxed'>
          {movieWriters.length === 1 ? 'Director' : 'Directors'}
        </h6>

        <p className='text-white text-sm font-normal tracking-wider leading-relaxed'>
          {movieWriters.length === 1
            ? movieWriters[0]
            : movieWriters.join(' • ')}
        </p>
      </div>

      <div className='w-full h-auto flex items-center gap-3'>
        <h6 className='text-amber-400 text-sm font-medium tracking-wider leading-relaxed'>
          {movieStars.length === 1 ? 'Star' : 'Stars'}
        </h6>

        <p className='text-white text-sm font-normal tracking-wider leading-relaxed'>
          {movieStars.length === 1 ? movieStars[0] : movieStars.join(' • ')}
        </p>
      </div>
    </div>
  );
}
