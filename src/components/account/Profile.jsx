import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../hooks/auth/useUser';
import { FaUser } from 'react-icons/fa';

function Profile() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useUser();

  return (
    <React.Fragment>
      {isAuthenticated ? (
        <button
          className='flex items-center text-gray-300 text-sm gap-3 p-2 rounded-md tracking-wide hover:bg-neutral-50/20 focus-visible:bg-neutral-50/20 transition-all duration-300'
          onClick={() => navigate('/account-settings')}
        >
          <span className='w-5 h-5 rounded-full flex items-center justify-center'>
            {user?.user_metadata?.avatar ? (
              <img
                className='rounded-full'
                src={user?.user_metadata?.avatar}
                alt='User avatar'
              />
            ) : (
              <span className='bg-gray-300 text-black p-1 rounded-full text-xs'>
                <FaUser />
              </span>
            )}
          </span>
          {user?.user_metadata?.username}
        </button>
      ) : (
        <button
          className='flex items-center text-gray-300 text-sm gap-3 p-2 rounded-md tracking-wide hover:bg-neutral-50/20 focus-visible:bg-neutral-50/20 transition-all duration-300'
          onClick={() => navigate('/register-account')}
        >
          <span className='bg-gray-300 text-black p-1 rounded-full text-xs'>
            <FaUser />
          </span>
          Sign Up
        </button>
      )}
    </React.Fragment>
  );
}

export default Profile;
