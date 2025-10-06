import { useSignout } from '../../hooks/auth/mutations/useSignout';

import SmallLoader from '../loaders/SmallLoader';

import { BsBoxArrowLeft } from 'react-icons/bs';

export default function SignOut() {
  const { signoutUser, isPending } = useSignout();

  return (
    <button
      type='button'
      disabled={isPending}
      onClick={() => signoutUser()}
      className='outline-none border-r-2 border-r-amber-400 cursor-pointer w-full h-10 py-1.5 px-3 rounded-md flex items-center justify-start gap-2 mt-auto bg-neutral-500/35 text-white text-lg font-normal tracking-wide hover:bg-neutral-500/40 focus-visible:bg-neutral-500/40 transition-colors duration-300'
    >
      <span className='text-xl text-amber-400'>
        <BsBoxArrowLeft />
      </span>
      &nbsp;Sign Out
    </button>
  );
}
