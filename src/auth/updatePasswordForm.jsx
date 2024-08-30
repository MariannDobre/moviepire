import React, { useState } from 'react';
import { useUpdateUserPass } from '../hooks/useUpdatePass';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import SmallLoader from '../components/loaders/SmallLoader';

function UpdatePasswordForm() {
  const { updateUserPassFn, isPending } = useUpdateUserPass();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const passwordMatch = password === confirmPassword;
  const passwordLength = password.length < 6;

  function handleSubmit(e) {
    e.preventDefault();
    if (!password || !confirmPassword) return;

    if (passwordMatch) {
      updateUserPassFn(password);
      setFormSubmitted(true);
      setPassword('');
      setConfirmPassword('');
    } else {
      setFormSubmitted(true);
      setConfirmPassword('');
    }
  }

  function handleCancel(e) {
    e.preventDefault();

    setPassword('');
    setConfirmPassword('');
    setFormSubmitted(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='newPassword'>
            New Password&nbsp;
            <span style={{ color: '#999999' }}>(min 6 characters)</span>:
          </label>

          <span>
            {password.length > 1 && passwordLength
              ? 'The password should have at least 6 characters.'
              : null}
          </span>

          <div>
            <input
              style={`${
                password.length > 1 && passwordLength
                  ? 'border: 0.1rem solid var(--color-error-600); background-color: rgba(252, 165, 165, 0.35)'
                  : ''
              }`}
              type={showPassword ? 'text' : 'password'}
              id='newPassword'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isPending}
              minLength={6}
              maxLength={18}
            />

            <button
              type='button'
              onClick={() => setShowPassword((showPassword) => !showPassword)}
            >
              {showPassword ? (
                <BsEyeSlashFill
                  style={{
                    color: `${
                      password.length > 1 && passwordLength ? '#dc2626' : ''
                    }`,
                  }}
                />
              ) : (
                <BsEyeFill
                  style={{
                    color: `${
                      password.length > 1 && passwordLength ? '#dc2626' : ''
                    }`,
                  }}
                />
              )}
            </button>
          </div>
        </div>

        <div>
          <label htmlFor='confirmNewPassword'>Confirm Password:</label>

          {!passwordMatch && formSubmitted && (
            <span>Passwords should match.</span>
          )}

          <input
            style={`${
              !passwordMatch && formSubmitted
                ? 'border: 0.1rem solid var(--color-error-600); background-color: rgba(252, 165, 165, 0.35)'
                : ''
            }`}
            type={showPassword ? 'text' : 'password'}
            id='confirmNewPassword'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isPending}
            minLength={6}
            maxLength={18}
          />
        </div>

        <div>
          <button disabled={isPending}>
            {!isPending ? `Change` : <SmallLoader />}
          </button>

          <button
            type='reset'
            onClick={handleCancel}
            disabled={isPending}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdatePasswordForm;
