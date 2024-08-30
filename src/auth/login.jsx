import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import SmallLoader from '../components/loaders/SmallLoader';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginFn, isPending } = useLogin();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    loginFn(
      { email, password },
      {
        onSettled: () => {
          setEmail('');
          setPassword('');
        },
      }
    );
  }

  function handleGoBack() {
    navigate(-1);
  }

  return (
    <div
      style={{
        background: `linear-gradient(
       90deg,
       rgba(0, 0, 0, 1),
       rgba(0, 0, 0, 0.875),
       rgba(0, 0, 0, 0.875),
       rgba(0, 0, 0, 1)
       ),url(loginBg.jpg) no-repeat center / cover`,
      }}
    >
      <h1>Log into your account</h1>

      <form
        onSubmit={handleSubmit}
        style={{
          backdropFilter: 'blur(0.4rem)',
        }}
      >
        <div>
          <label htmlFor='loginEmail'>Email:</label>
          <input
            type='email'
            id='loginEmail'
            value={email}
            disabled={isPending}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor='loginPassword'>Password:</label>
          <input
            type='password'
            id='loginPassword'
            value={password}
            disabled={isPending}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <button disabled={isPending}>
            {!isPending ? 'Login' : <SmallLoader />}
          </button>

          <button onClick={handleGoBack}>Go Back</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
