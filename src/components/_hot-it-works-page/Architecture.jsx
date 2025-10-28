export default function Architecture() {
  return (
    <div className='w-full h-auto flex flex-col items-start gap-6'>
      <h1 className='text-white text-2xl font-medium tracking-wide'>
        <span className='text-amber-400'>03.</span>&nbsp;App Architecture
      </h1>

      <p className='w-full max-w-[1024px] text-neutral-200 text-base font-normal tracking-wider'>
        The app follows a modular architecture based on React functional
        components, with data fetched and mutated through Supabase and managed
        via React Query. Each feature (auth, diary, discovery, stats) is
        encapsulated in its own directory for scalability and clarity.
      </p>

      <div className='bg-neutral-800 w-[calc(50%-36px)] h-auto flex flex-col gap-3 p-6 border border-neutral-700 rounded-md'>
        <div className='w-auto h-auto self-start flex items-center gap-3'>
          <div className='w-2.5 h-2.5 rounded-full bg-red-500' />
          <div className='w-2.5 h-2.5 rounded-full bg-yellow-500' />
          <div className='w-2.5 h-2.5 rounded-full bg-green-500' />
        </div>

        <pre className='text-neutral-200 font-normal text-sm leading-relaxed tracking-wide'>
          {`src/
├── components/
│   ├── _loaders/
│   ├── _modal/
│   ├── _search/
│   ├── _sidebar/
│   └── .../
├── hooks/
│   ├── _auth/
│   ├── _movies/
│   └── .../
├── pages/
│   ├── HomePage.jsx
│   ├── ConfirmPage.jsx
│   ├── PageNotFound.jsx
│   └── .../
├── services/
│   └── supabase.js
├── utils/
│   ├── _slider/
│   ├── LazyImage.jsx
│   └── .../
├── App.js
├── index.css
└── index.js`}
        </pre>
      </div>
    </div>
  );
}
