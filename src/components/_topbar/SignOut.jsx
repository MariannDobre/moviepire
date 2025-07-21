import { useSignout } from '../../hooks/auth/mutations/useSignout';
import SmallLoader from '../loaders/SmallLoader';
import { BsBoxArrowRight } from 'react-icons/bs';

export default function SignOut() {
  const { signoutUser, isPending } = useSignout();

  return (
    <div className='w-12 h-12 flex items-center justify-center'>
      <button
        type='button'
        onClick={() => signoutUser()}
        disabled={isPending}
        className='group outline-none border-none cursor-pointer disabled:cursor-not-allowed w-12 h-12 flex items-center justify-center rounded-lg shadow-sm'
      >
        <span className='w-12 h-12 flex items-center justify-center text-xl text-white bg-neutral-800 rounded-lg drop-shadow-sm group-hover:text-blue-500 group-focus-visible:text-blue-500 transition-all duration-500'>
          {isPending ? <SmallLoader size='text-xl' /> : <BsBoxArrowRight />}
        </span>
      </button>
    </div>
  );
}
