import LatestThisYear from '../components/_homepage/LatestThisYear';
import UserStats from '../components/_homepage/UserStats';
import WhatToWatch from '../components/_homepage/WhatToWatch';

function HomePage() {
  return (
    <div className='w-full h-auto flex flex-col gap-16'>
      <UserStats />

      <WhatToWatch />

      <LatestThisYear />
    </div>
  );
}

export default HomePage;
