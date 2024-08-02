import React from 'react';
import { useSignout } from '../hooks/useSignout';

import { Button } from '../globalVariables';
import MiniLoader from '../components/loaders/miniLoader';

function Signout() {
  const { signoutFn, isPending } = useSignout();

  return (
    <Button
      onClick={signoutFn}
      disabled={isPending}
    >
      {!isPending ? `Sign Out` : <MiniLoader />}
    </Button>
  );
}

export default Signout;
