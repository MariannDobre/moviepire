import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='w-full h-auto flex items-center justify-between gap-3 md:gap-6 lg:gap-9 text-white border-t border-neutral-500 p-3 md:p-6 xl:p-9 2xl:p-12'>
      <div className='w-2/4 max-w-[520px] h-auto self-start flex flex-col gap-6'>
        <p className='w-full text-xs sm:text-sm md:text-base lg:text-lg text-white font-medium md:font-normal tracking-wider md:tracking-wide'>
          © 2024 Moviepire. Made with 💙 for movie lovers.
        </p>
      </div>

      <div className='w-2/4 h-auto flex items-center justify-start gap-1.5 md:gap-3 lg:gap-6'>
        <div className='w-full h-auto self-start flex flex-col gap-1.5 lg:gap-3'>
          <h6 className='text-sm md:text-base lg:text-xl text-blue-400 font-medium tracking-wider md:tracking-wide'>
            Navigation
          </h6>

          <nav className='w-full flex flex-col gap-0.5 md:gap-1 lg:gap-1.5'>
            <Link
              to='/'
              className='self-start outline-none border-none cursor-pointer text-xs sm:text-sm lg:text-base text-gray-400 font-normal tracking-wider hover:text-white focus-visible:text-white transition-all duration-500'
            >
              Home
            </Link>

            <Link
              to='/about-moviepire'
              className='self-start outline-none border-none cursor-pointer text-xs sm:text-sm lg:text-base text-gray-400 font-normal tracking-wider hover:text-white focus-visible:text-white transition-all duration-500'
            >
              About
            </Link>

            <Link
              to='/'
              className='self-start outline-none border-none cursor-pointer text-xs sm:text-sm lg:text-base text-gray-400 font-normal tracking-wider hover:text-white focus-visible:text-white transition-all duration-500'
            >
              Diary
            </Link>
          </nav>
        </div>

        <div className='w-full h-auto self-start flex flex-col gap-1.5 lg:gap-3'>
          <h6 className='text-sm md:text-base lg:text-xl text-blue-400 font-medium tracking-wider md:tracking-wide'>
            Account
          </h6>

          <nav className='w-full flex flex-col gap-0.5 md:gap-1 lg:gap-1.5'>
            <Link
              to='/account'
              className='self-start outline-none border-none cursor-pointer text-xs sm:text-sm lg:text-base text-gray-400 font-normal tracking-wider hover:text-white focus-visible:text-white transition-all duration-500'
            >
              Account
            </Link>

            <Link
              to='/login'
              className='self-start outline-none border-none cursor-pointer text-xs sm:text-sm lg:text-base text-gray-400 font-normal tracking-wider hover:text-white focus-visible:text-white transition-all duration-500'
            >
              Log Into Account
            </Link>

            <Link
              to='/register'
              className='self-start outline-none border-none cursor-pointer text-xs sm:text-sm lg:text-base text-gray-400 font-normal tracking-wider hover:text-white focus-visible:text-white transition-all duration-500'
            >
              Register New Account
            </Link>

            <Link
              to='/confirm-email'
              className='self-start outline-none border-none cursor-pointer text-xs sm:text-sm lg:text-base text-gray-400 font-normal tracking-wider hover:text-white focus-visible:text-white transition-all duration-500'
            >
              E-Mail Confirmation
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
