export default function DataFlow() {
  return (
    <div className='w-full h-auto flex flex-col items-start gap-6'>
      <h1 className='text-white text-2xl font-medium tracking-wide'>
        <span className='text-amber-400'>04.</span>&nbsp;Data Flow &mdash; State
        Management &mdash; Patterns
      </h1>

      <ul className='w-full max-w-[1024px] h-auto flex flex-col gap-3 list-disc list-inside leading-relaxed marker:text-amber-400'>
        <li className='w-full h-auto text-neutral-200 text-base font-normal tracking-wider'>
          <span className='text-white font-medium'>
            Service Layer (Function)
          </span>
          &nbsp;— Handles direct interaction with the Supabase client for
          performing queries, inserts, updates, or deletions.
        </li>

        <li className='w-full h-auto text-neutral-200 text-base font-normal tracking-wider'>
          <span className='text-white font-medium'>
            Data Layer (Custom Hook)
          </span>
          &nbsp;— Wraps the service function with&nbsp;
          <span className='text-white font-medium'>@tanstack/react-query</span>
          &nbsp;for caching, refetching, and tracking states like&nbsp;
          <span className='text-white font-medium'>isFetching</span>
          &nbsp;or&nbsp;
          <span className='text-white font-medium'>error</span>.
        </li>

        <li className='w-full h-auto text-neutral-200 text-base font-normal tracking-wider'>
          <span className='text-white font-medium'>UI Layer (Component)</span>
          &nbsp;— Consumes the custom hook, reacting to its returned data and
          states to build the appropriate user interface.
        </li>

        <li className='w-full h-auto text-neutral-200 text-base font-normal tracking-wider'>
          <span className='text-white font-medium'>
            Isolation & Scalability
          </span>
          &nbsp;— Each page, feature, and component lives in its own directory
          to promote modularity and simplify future scaling.
        </li>

        <li className='w-full h-auto text-neutral-200 text-base font-normal tracking-wider'>
          <span className='text-white font-medium'>Reusable Modal System</span>
          &nbsp;— Implemented using&nbsp;
          <span className='text-white font-medium'>
            ReactDOM.createPortal()
          </span>
          &nbsp; to render modals outside of the main DOM hierarchy.
        </li>

        <li className='w-full h-auto text-neutral-200 text-base font-normal tracking-wider'>
          <span className='text-white font-medium'>Conditional Rendering</span>
          &nbsp;— Certain features and actions (rating, diary edits, profile
          updates) depend on user authentication and email verification.
        </li>
      </ul>

      <div className='w-full h-auto grid grid-cols-2 grid-rows-1 gap-x-9 gap-y-0'>
        <div className='bg-neutral-800 w-full h-auto flex flex-col gap-3 p-6 border border-neutral-700 rounded-md'>
          <div className='w-auto h-auto self-start flex items-center gap-3'>
            <div className='w-2.5 h-2.5 rounded-full bg-red-500' />
            <div className='w-2.5 h-2.5 rounded-full bg-yellow-500' />
            <div className='w-2.5 h-2.5 rounded-full bg-green-500' />
          </div>

          <pre className='text-neutral-200 font-normal text-sm leading-relaxed tracking-wide'>
            {`// 1️⃣ Service Function — interacts directly with Supabase
import supabase from '../../../services/supabase';

export async function getMovieByTitle(searchQuery) {
  const { data, error } = await supabase
    .from('movies')
    .select('*')
    .ilike('movieName', \`%\${searchQuery}%\`);

  if (error)
    throw new Error(
      \`Cannot search the movies by their title: \${error?.message}\`
    );

  return data;
}`}
          </pre>
        </div>

        <div className='bg-neutral-800 w-full h-auto flex flex-col gap-3 p-6 border border-neutral-700 rounded-md'>
          <div className='w-auto h-auto self-start flex items-center gap-3'>
            <div className='w-2.5 h-2.5 rounded-full bg-red-500' />
            <div className='w-2.5 h-2.5 rounded-full bg-yellow-500' />
            <div className='w-2.5 h-2.5 rounded-full bg-green-500' />
          </div>

          <pre className='text-neutral-200 font-normal text-sm leading-relaxed tracking-wide'>
            {`// 2️⃣ Custom Hook — wraps the service with React Query
import { useQuery } from '@tanstack/react-query';
import { getMovieByTitle } from './functions/getMovieByTitle';

export function useMovieByTitle(searchQuery) {
  const shouldFetch = Boolean(searchQuery?.length >= 3);

  const {
    data: movies,
    isFetching,
    error,
  } = useQuery({
    queryKey: ['movies', searchQuery],
    queryFn: () => getMovieByTitle(searchQuery),
    enabled: shouldFetch,
  });

  return { movies, isFetching, error };
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
