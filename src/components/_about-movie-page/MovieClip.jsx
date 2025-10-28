export default function MovieClip({ movieName, movieClip }) {
  if (!movieClip || typeof movieClip !== 'string')
    return (
      <div className='w-full max-w-full h-full p-6 flex flex-col items-center justify-center bg-red-950/35 border border-red-500 rounded-md'>
        <p className='text-red-500 text-base font-normal tracking-wider text-center'>
          There is no clip available for this title
        </p>
      </div>
    );

  return (
    <iframe
      className='w-full max-w-full h-full'
      src={`${movieClip}?autoplay=1`}
      sandbox='allow-scripts allow-same-origin allow-presentation'
      allow='autoplay'
      frameBorder='0'
      loading='lazy'
      referrerPolicy='no-referrer'
      title={`Trailer video of ${movieName}`}
      aria-label={`Trailer video of ${movieName}`}
      scrolling='no'
    />
  );
}
