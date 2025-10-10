import { Link } from 'react-router-dom';
import { MdOutlineEmail } from 'react-icons/md';

export default function NotConfirmedFallback() {
  return (
    <div className='w-full max-w-[760px] h-auto flex flex-col items-center justify-center gap-6 p-6 rounded-md bg-black/50 backdrop-blur-md border border-neutral-700'>
      <div className='w-14 h-14 flex items-center justify-center rounded-full'>
        <span className='w-full h-full flex items-center justify-center rounded-full drop-shadow-sm bg-amber-400 text-black text-2xl'>
          <MdOutlineEmail />
        </span>
      </div>

      <div className='w-full h-auto flex flex-col items-center gap-1.5'>
        <h6 className='w-full h-auto text-white text-2xl font-medium tracking-wide text-center'>
          Email verification required
        </h6>

        <p className='w-full h-auto text-neutral-400 text-base font-normal tracking-wide text-center'>
          Visit your email inbox and confirm your email to proceed
          <br />
          We've sent a confirmation link to your email address. Click the link
          to verify your account and continue.
          <br />
          You can still use the app for free, but without some features.
        </p>
      </div>

      <Link
        type='button'
        aria-label='Back to home page'
        to='/'
        className='outline-none border-none w-auto h-auto flex items-center justify-center text-center cursor-pointer py-1.5 px-6 bg-amber-400 text-black text-base font-medium tracking-wide rounded-md hover:bg-amber-500 focus-visible:bg-amber-500 transition-colors duration-300'
      >
        Home Page
      </Link>
    </div>
  );
}
