export default function MoviePlot({ plot }) {
  return (
    <div className='w-full lg:w-3/4 px-3 md:px-6 lg:px-0 h-full flex flex-col items-start justify-start gap-0.5 md:gap-1 lg:gap-1.5 overflow-hidden'>
      <h6 className='w-full text-start text-base lg:text-xl xl:text-2xl text-white font-medium tracking-wide'>
        Plot
      </h6>

      <p className='w-full text-xs sm:text-sm lg:text-base text-gray-400 font-normal tracking-wider lg:tracking-wide'>
        {plot}
      </p>
    </div>
  );
}
