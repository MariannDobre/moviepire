export default function MovieDescription({ movieDescription }) {
  return (
    <p className='w-full h-auto text-neutral-200 text-sm font-normal tracking-wider text-start'>
      {movieDescription}
    </p>
  );
}
