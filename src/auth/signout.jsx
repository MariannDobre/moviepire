import React from 'react';
import { useSignout } from '../hooks/useSignout';
import SmallLoader from '../components/loaders/SmallLoader';

function Signout() {
  const { signoutFn, isPending } = useSignout();

  return (
    <button
      onClick={signoutFn}
      disabled={isPending}
    >
      {!isPending ? `Sign Out` : <SmallLoader />}
    </button>
  );
}

export default Signout;
