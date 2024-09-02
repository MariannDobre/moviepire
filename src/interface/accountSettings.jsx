import React, { useState } from 'react';
import { FiUser, FiLock } from 'react-icons/fi';
import UpdateUserForm from '../auth/updateUserForm';
import UpdatePasswordForm from '../auth/updatePasswordForm';

function AccountSettings() {
  const [selectedSetting, setSelectedSetting] = useState('user-form');

  function handleUserForm() {
    setSelectedSetting('user-form');
  }

  function handlePasswordForm() {
    setSelectedSetting('password-form');
  }

  return (
    <div>
      <div>
        <div>
          <button
            style={{ color: selectedSetting === 'user-form' ? 'white' : '' }}
            onClick={handleUserForm}
          >
            <FiUser
              style={{
                color:
                  selectedSetting === 'user-form'
                    ? 'var(--color-main-500)'
                    : '',
              }}
            />
            Account
          </button>

          <button
            style={{
              color: selectedSetting === 'password-form' ? 'white' : '',
            }}
            onClick={handlePasswordForm}
          >
            <FiLock
              style={{
                color:
                  selectedSetting === 'password-form'
                    ? 'var(--color-main-500)'
                    : '',
              }}
            />
            Password
          </button>
        </div>

        <div>
          {selectedSetting === 'user-form' ? (
            <UpdateUserForm />
          ) : (
            <UpdatePasswordForm />
          )}
        </div>
      </div>
    </div>
  );
}

export default AccountSettings;
