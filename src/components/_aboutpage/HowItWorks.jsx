export default function HowItWorks() {
  return (
    <div className='w-full h-auto p-3 lg:p-6 xl:p-9 2xl:p-12 flex flex-col gap-3 lg:gap-6 rounded-lg shadow-sm bg-gradient-to-br from-transparent to-gray-50/10 border border-neutral-500'>
      <h6 className='flex items-center justify-center gap-3 text-center text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl text-white font-medium tracking-wide'>
        How it Works?
      </h6>

      <div className='w-full flex flex-col items-center justify-between sm:flex-row gap-3 sm:gap-1.5 md:gap-3 lg:gap-6'>
        <div className='w-full h-auto flex flex-col items-center justify-center gap-1.5 lg:gap-3'>
          <span className='w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 bg-blue-400/10 text-blue-400 flex items-center justify-center text-lg xl:text-xl 2xl:text-2xl font-semibold rounded-full shadow-sm'>
            1
          </span>

          <h6 className='text-base lg:text-lg xl:text-xl 2xl:text-2xl text-white font-medium tracking-wide text-center'>
            Create Your Account
          </h6>

          <p className='text-sm lg:text-base text-gray-400 font-normal tracking-wide lg:tracking-wider text-center'>
            Sign up for free and start building your personal movie diary.
          </p>
        </div>

        <div className='w-full h-auto flex flex-col items-center justify-center gap-1.5 lg:gap-3'>
          <span className='w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 bg-blue-400/10 text-blue-400 flex items-center justify-center text-lg xl:text-xl 2xl:text-2xl font-semibold rounded-full shadow-sm'>
            2
          </span>

          <h6 className='text-base lg:text-lg xl:text-xl 2xl:text-2xl text-white font-medium tracking-wide text-center'>
            Add Movies
          </h6>

          <p className='text-sm lg:text-base text-gray-400 font-normal tracking-wide lg:tracking-wider text-center'>
            Search and add movies you've watched to your diary with ratings and
            notes.
          </p>
        </div>

        <div className='w-full h-auto flex flex-col items-center justify-center gap-1.5 lg:gap-3'>
          <span className='w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 bg-blue-400/10 text-blue-400 flex items-center justify-center text-lg xl:text-xl 2xl:text-2xl font-semibold rounded-full shadow-sm'>
            3
          </span>

          <h6 className='text-base lg:text-lg xl:text-xl 2xl:text-2xl text-white font-medium tracking-wide text-center'>
            Track & Discover
          </h6>

          <p className='text-sm lg:text-base text-gray-400 font-normal tracking-wide lg:tracking-wider text-center'>
            View your stats, discover new content, and build your cinematic
            journey.
          </p>
        </div>
      </div>
    </div>
  );
}
