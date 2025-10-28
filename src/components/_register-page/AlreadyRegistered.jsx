import { Link } from 'react-router-dom';

export default function AlreadyRegistered() {
  return (
    <div className='w-full max-w-[640px] h-auto flex flex-col items-center justify-center gap-3 p-3 lg:p-6 rounded-md lg:rounded-lg shadow-sm bg-black/75 backdrop-blur-md border border-neutral-500'>
      <p className='text-lg text-white font-normal tracking-wide text-center'>
        You're already registered! 🎉
        <br />
        If you're trying to switch accounts or to make a new one, please&nbsp;
        <span className='text-blue-400 font-medium'>log out</span>&nbsp;first.
      </p>

      <p className='text-base text-gray-400 font-normal tracking-wide'>
        Otherwise, feel free to keep exploring the app.
      </p>

      <Link
        to='/'
        className='outline-none border-none cursor-pointer py-1.5 px-6 text-base text-white font-normal tracking-wide bg-blue-400 rounded-md shadow-sm hover:bg-blue-500 focus-visible:bg-blue-500 hover:shadow-lg focus-visible:shadow-lg transition-all duration-500'
      >
        Back to Home Page
      </Link>
    </div>
  );
}
