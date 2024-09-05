import React from 'react';
import { useUser } from '../hooks/auth/useUser';
import { useNavigate } from 'react-router-dom';

function ConfirmEmail() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();

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
      {isAuthenticated ? (
        <div>
          <h1>Email already verified</h1>

          <p>
            The email for the account name&nbsp;
            <span>"{user?.user_metadata?.username}"</span>&nbsp;is already
            verified
          </p>

          <button onClick={() => navigate('/')}>Home Page</button>
        </div>
      ) : (
        <div>
          <h1>Email verification required</h1>

          <p>
            You can still navigate to the home page and use it for free, but
            without some features unlocked
          </p>

          <button onClick={() => navigate('/')}>Home Page</button>
        </div>
      )}
    </div>
  );
}

export default ConfirmEmail;
