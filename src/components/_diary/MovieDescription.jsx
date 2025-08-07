export default function MovieDescription({ movieDescription }) {
  return (
    <p className='w-full h-auto text-xs md:text-base lg:text-base text-gray-400 font-normal tracking-wider'>
      {movieDescription}
    </p>
  );
}
