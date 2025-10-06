import WhatToWatch from '../components/_home/WhatToWatch';
import LatestThisYear from '../components/_home/LatestThisYear';

function HomePage() {
  return (
    <div className='w-full flex flex-col gap-16'>
      <WhatToWatch />

      <div className='w-full h-px bg-neutral-700' />

      <LatestThisYear />
    </div>
  );
}

export default HomePage;
