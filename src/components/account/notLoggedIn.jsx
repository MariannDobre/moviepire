import React from 'react';
import { Link } from 'react-router-dom';

function NotLoggedIn() {
  return (
    <>
      <Link to='/login'>Log into account</Link>

      <Link to='/signup'>Create an account</Link>
    </>
  );
}

export default NotLoggedIn;
