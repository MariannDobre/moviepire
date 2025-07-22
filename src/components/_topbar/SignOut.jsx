import { useSignout } from '../../hooks/auth/mutations/useSignout';
import SmallLoader from '../loaders/SmallLoader';
import { BsBoxArrowRight } from 'react-icons/bs';

export default function SignOut() {
  const { signoutUser, isPending } = useSignout();

  return (
    <div className='w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 flex items-center justify-center'>
      <button
        type='button'
        onClick={() => signoutUser()}
        disabled={isPending}
        className='w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 group outline-none border-none cursor-pointer disabled:cursor-not-allowed flex items-center justify-center rounded-md xl:rounded-lg shadow-sm'
      >
        <span className='w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12 text-base lg:text-xl xl:text-2xl flex items-center justify-center text-white bg-neutral-800 rounded-md xl:rounded-lg drop-shadow-sm group-hover:text-blue-500 group-focus-visible:text-blue-500 transition-all duration-500'>
          {isPending ? (
            <SmallLoader size='text-lg md:text-xl' />
          ) : (
            <BsBoxArrowRight />
          )}
        </span>
      </button>
    </div>
  );
}
