export default function Trailer({ movieTrailer, movieName }) {
  return (
    <iframe
      className='w-full max-w-[1280px] h-[760px] lg:h-full'
      src={`${movieTrailer}?autoplay=1`}
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
