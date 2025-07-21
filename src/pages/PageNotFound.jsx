import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PageNotFound() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: `radial-gradient(
                         circle,
                       rgba(0, 0, 0, 0.6),
                       rgba(0, 0, 0, 0.8),
                       rgba(0, 0, 0, 0.9),
                       rgba(0, 0, 0, 1)
     ),url(https://www.themoviedb.org/t/p/original/7Pv3ocLAj1BfcdUUsslMYyDMYXK.jpg) no-repeat center / cover`,
      }}
      className='w-screen h-screen flex items-center justify-center'
    >
      <div className='flex flex-col items-center justify-center gap-3 w-[1280px] rounded-md shadow-lg bg-neutral-400/20 backdrop-blur p-6 border-none outline outline-1 outline-neutral-800'>
        <div className='flex flex-col items-center justify-center gap-1'>
          <h1 className='text-stone-200 text-xl tracking-wider text-center'>
            Something went wrong
          </h1>

          <p className='text-stone-400 text-base tracking-wide text-center'>
            The current URL path that you just tried:&nbsp;
            <code className='text-stone-200'>"{location.pathname}"</code>
            &nbsp;doesn't exist
          </p>
        </div>

        <button
          className='outline-none border-none bg-neutral-900 text-base text-slate-500 font-medium tracking-wide py-1.5 px-3 rounded-md shadow-lg hover:bg-neutral-950 hover:text-slate-400 focus-visible:bg-neutral-950 focus-visible:text-slate-400 transition-all duration-300'
          onClick={() => navigate('/')}
        >
          Home Page
        </button>
      </div>
    </div>
  );
}

export default PageNotFound;
