export default function MovieCast({ movieDirector, movieWriters, movieCast }) {
  return (
    <div className='w-3/4 h-full flex flex-col gap-3 items-start justify-start overflow-hidden'>
      <h6 className='w-full text-start text-2xl text-white font-medium tracking-wide'>
        Cast & Crew
      </h6>

      <div className='w-full h-auto flex flex-col gap-3'>
        <div className='w-full h-auto flex flex-col gap-0.5'>
          <h6 className='text-start text-xl text-blue-400 font-medium tracking-wide'>
            Director
          </h6>

          <p className='text-start text-base text-white font-normal tracking-wide'>
            {movieDirector}
          </p>
        </div>

        <div className='w-full h-auto flex flex-col gap-0.5'>
          <h6 className='text-start text-xl text-blue-400 font-medium tracking-wide'>
            Writers
          </h6>

          <p className='text-start text-base text-white font-normal tracking-wide'>
            {movieWriters.length === 1
              ? movieWriters[0]
              : movieWriters.join(' • ')}
          </p>
        </div>

        <div className='w-full h-auto flex flex-col gap-0.5'>
          <h6 className='text-start text-xl text-blue-400 font-medium tracking-wide'>
            Main Cast
          </h6>

          <p className='text-start text-base text-white font-normal tracking-wide'>
            {movieCast.length === 1 ? movieCast[0] : movieCast.join(' • ')}
          </p>
        </div>
      </div>
    </div>
  );
}
