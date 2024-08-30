import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function PageNotFound() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div
      style={{
        background: `linear-gradient(
     90deg,
     rgba(0, 0, 0, 1),
     rgba(0, 0, 0, 0.875),
     rgba(0, 0, 0, 0.875),
     rgba(0, 0, 0, 1)
     ),url(https://www.themoviedb.org/t/p/original/7Pv3ocLAj1BfcdUUsslMYyDMYXK.jpg) no-repeat center / cover`,
      }}
    >
      <div>
        <h1>Something went wrong</h1>

        <p>
          The current URL path that you just tried:&nbsp;
          <code>"{location.pathname}"</code>&nbsp;doesn't exist
        </p>

        <button onClick={() => navigate('/')}>Home Page</button>
      </div>
    </div>
  );
}

export default PageNotFound;
