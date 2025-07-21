export default function HowItWorks() {
  return (
    <div className='w-full h-auto p-12 flex flex-col gap-6 rounded-lg shadow-sm bg-gradient-to-br from-transparent to-gray-50/10 border border-neutral-500'>
      <h6 className='flex items-center justify-center gap-3 text-center text-4xl text-white font-medium tracking-wide'>
        How it Works?
      </h6>

      <div className='w-full flex items-center justify-between gap-6'>
        <div className='w-full h-auto flex flex-col items-center justify-center gap-3'>
          <span className='w-16 h-16 bg-blue-400/10 text-blue-400 flex items-center justify-center text-2xl font-semibold rounded-full shadow-sm'>
            1
          </span>

          <h6 className='text-2xl text-white font-medium tracking-wide text-center'>
            Create Your Account
          </h6>

          <p className='text-base text-gray-400 font-normal tracking-wide text-center'>
            Sign up for free and start building your personal movie diary.
          </p>
        </div>

        <div className='w-full h-auto flex flex-col items-center justify-center gap-3'>
          <span className='w-16 h-16 bg-blue-400/10 text-blue-400 flex items-center justify-center text-2xl font-semibold rounded-full shadow-sm'>
            2
          </span>

          <h6 className='text-2xl text-white font-medium tracking-wide text-center'>
            Add Movies
          </h6>

          <p className='text-base text-gray-400 font-normal tracking-wide text-center'>
            Search and add movies you've watched to your diary with ratings and
            notes.
          </p>
        </div>

        <div className='w-full h-auto flex flex-col items-center justify-center gap-3'>
          <span className='w-16 h-16 bg-blue-400/10 text-blue-400 flex items-center justify-center text-2xl font-semibold rounded-full shadow-sm'>
            3
          </span>

          <h6 className='text-2xl text-white font-medium tracking-wide text-center'>
            Track & Discover
          </h6>

          <p className='text-base text-gray-400 font-normal tracking-wide text-center'>
            View your stats, discover new content, and build your cinematic
            journey.
          </p>
        </div>
      </div>
    </div>
  );
}
