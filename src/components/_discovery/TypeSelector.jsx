const types = [
  {
    id: 0,
    value: 'all movies',
    label: 'Everything',
  },
  {
    id: 1,
    value: 'tv show',
    label: 'TV Series',
  },
  {
    id: 2,
    value: 'movie',
    label: 'Movies',
  },
  {
    id: 3,
    value: 'animation',
    label: 'Animations',
  },
];

export default function TypeSelector({ type, onType }) {
  return (
    <div className='w-full h-10 flex items-center justify-start gap-9'>
      {types.map((btn) => (
        <button
          key={btn.id}
          type='button'
          aria-label={`Set the data type to ${btn.value}`}
          onClick={() => onType(btn.value)}
          className={`outline-none border-b cursor-pointer w-48 h-10 rounded-t-md ${
            type === btn.value
              ? 'border-b-amber-400 bg-neutral-500/35 text-white'
              : 'border-b-neutral-400 bg-transparent text-neutral-400'
          } text-lg font-medium tracking-wide hover:bg-neutral-500/40 focus-visible:bg-neutral-500/40 transition-colors duration-300`}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}
