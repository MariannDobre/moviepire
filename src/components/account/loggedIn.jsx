import React from 'react';
import { Link } from 'react-router-dom';
import { useSignout } from '../../hooks/useSignout';

function LoggedIn() {
  const { signoutFn, isPending } = useSignout();

  return (
    <>
      <Link to='/activity'>Your activity</Link>

      <Link to='/viewlist'>Your viewlist</Link>

      <Link to='/settings'>Account settings</Link>

      <Link onClick={() => signoutFn()}>
        {isPending ? 'Loading...' : 'Sign out'}
      </Link>
    </>
  );
}

export default LoggedIn;
