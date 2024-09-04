import React from 'react';
import { ImSpinner11 } from 'react-icons/im';

function SmallLoader() {
  return (
    <span className='flex items-center justify-center text-base py-1 animate-loader'>
      <ImSpinner11 />
    </span>
  );
}

export default SmallLoader;
