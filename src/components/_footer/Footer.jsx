import { Link } from 'react-router-dom';
import Logo from '../_topbar/Logo';

export default function Footer() {
  return (
    <footer className='w-full h-auto flex items-center justify-between gap-9 text-white p-12 border-t border-neutral-500'>
      <div className='w-2/4 max-w-[520px] h-auto self-start flex flex-col gap-6'>
        <Logo width='w-2/4' />

        <p className='text-lg text-white font-normal tracking-wide'>
          © 2024 Moviepire. Made with 💙 for movie lovers.
        </p>
      </div>

      <div className='w-2/4 h-auto flex items-center justify-start gap-6'>
        <div className='w-full h-auto self-start flex flex-col gap-3'>
          <h6 className='text-xl text-blue-400 font-medium tracking-wide'>
            Navigation
          </h6>

          <nav className='w-full flex flex-col gap-1.5'>
            <Link
              to='/'
              className='self-start outline-none border-none cursor-pointer text-base text-gray-400 font-normal tracking-wider hover:text-white focus-visible:text-white transition-all duration-500'
            >
              Home
            </Link>

            <Link
              to='/about-moviepire'
              className='self-start outline-none border-none cursor-pointer text-base text-gray-400 font-normal tracking-wider hover:text-white focus-visible:text-white transition-all duration-500'
            >
              About
            </Link>

            <Link
              to='/'
              className='self-start outline-none border-none cursor-pointer text-base text-gray-400 font-normal tracking-wider hover:text-white focus-visible:text-white transition-all duration-500'
            >
              Diary
            </Link>
          </nav>
        </div>

        <div className='w-full h-auto self-start flex flex-col gap-3'>
          <h6 className='text-xl text-blue-400 font-medium tracking-wide'>
            Account
          </h6>

          <nav className='w-full flex flex-col gap-1.5'>
            <Link
              to='/account'
              className='self-start outline-none border-none cursor-pointer text-base text-gray-400 font-normal tracking-wider hover:text-white focus-visible:text-white transition-all duration-500'
            >
              Account
            </Link>

            <Link
              to='/login'
              className='self-start w-full outline-none border-none cursor-pointer text-base text-gray-400 font-normal tracking-wider hover:text-white focus-visible:text-white transition-all duration-500'
            >
              Log Into Account
            </Link>

            <Link
              to='/register'
              className='self-start w-full outline-none border-none cursor-pointer text-base text-gray-400 font-normal tracking-wider hover:text-white focus-visible:text-white transition-all duration-500'
            >
              Register New Account
            </Link>

            <Link
              to='/confirm-email'
              className='self-start w-full outline-none border-none cursor-pointer text-base text-gray-400 font-normal tracking-wider hover:text-white focus-visible:text-white transition-all duration-500'
            >
              E-Mail Confirmation
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
