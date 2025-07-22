export default function MovieDescription({ movieDescription }) {
  return (
    <p className='w-full h-auto text-xs sm:text-sm md:text-base text-gray-400 font-normal tracking-wider mt-1 sm:mt-1.5 md:mt-3 lg:mt-6'>
      {movieDescription}
    </p>
  );
}
