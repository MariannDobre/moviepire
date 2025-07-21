export default function MoviePlot({ plot }) {
  return (
    <div className='w-3/4 h-full flex flex-col items-start justify-start gap-1.5 overflow-hidden'>
      <h6 className='w-full text-start text-2xl text-white font-medium tracking-wide'>
        Plot
      </h6>

      <p className='w-full text-base text-gray-400 font-normal tracking-wide'>
        {plot}
      </p>
    </div>
  );
}
