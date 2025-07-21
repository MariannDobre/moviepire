import React from 'react';

function ViewClip({ movieClip, movieName }) {
  return (
    <div className='w-full h-full'>
      <iframe
        className='w-full h-full'
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
    </div>
  );
}

export default ViewClip;
