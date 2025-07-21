import { useNavigate } from 'react-router-dom';

export default function AboutCTA() {
  const navigate = useNavigate();

  return (
    <div className='w-full h-auto flex flex-col items-center justify-center gap-6'>
      <div className='w-full flex flex-col items-center justify-center gap-3'>
        <h6 className='flex items-center justify-center gap-3 text-center text-4xl text-white font-medium tracking-wide'>
          Ready to Start Your Movie Journey?
        </h6>

        <p className='w-full max-w-[760px] text-center text-lg text-gray-400 font-normal tracking-wide'>
          Join Moviepire today and start tracking your cinematic adventures.
          Whether you're a casual viewer or a film enthusiast, we've got you
          covered.
        </p>
      </div>

      <div className='w-auto flex items-center justify-between gap-6'>
        <button
          type='button'
          className='outline-none border border-transparent flex items-center justify-center text-center gap-1.5 py-1.5 px-6 cursor-pointer text-sm text-white bg-blue-400 font-normal tracking-wide rounded-md shadow-sm hover:bg-blue-500 focus-visible:bg-blue-500 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
          onClick={() => navigate('/register')}
        >
          Get Started for Free
        </button>

        <button
          type='button'
          className='outline-none border border-transparent flex items-center justify-center text-center gap-1.5 py-1.5 px-6 cursor-pointer text-sm text-gray-400 bg-neutral-800 font-normal tracking-wide rounded-md shadow-sm hover:text-white focus-visible:text-white hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
          onClick={() => navigate('/login')}
        >
          Already Have an Account?
        </button>
      </div>
    </div>
  );
}
