import React from 'react';
import { useSignup } from '../hooks/useSignup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import SmallLoader from '../components/loaders/SmallLoader';

function Signup() {
  const navigate = useNavigate();
  const { createUserFn, isPending } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ username, email, password }) {
    createUserFn(
      { username, email, password },
      {
        onSettled: reset(),
      }
    );
  }

  function handleCancel() {
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
      <h1>Create an account</h1>

      <form
        style={{
          backdropFilter: 'blur(0.4rem)',
          border: `${
            errors?.username ||
            errors?.email ||
            errors?.password ||
            errors?.confirmPassword
              ? '0.15rem solid var(--color-error-600)'
              : ''
          }`,
          boxShadow: `${
            errors?.username ||
            errors?.email ||
            errors?.password ||
            errors?.confirmPassword
              ? '0 0 3.2rem 0.8rem rgba(220, 38, 38, 0.5)'
              : '0 0 3.2rem 0.8rem rgba(30, 27, 75, 0.5)'
          }`,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label htmlFor='username'>Username:</label>
          {errors ? (
            <span style={{ color: 'orangered' }}>
              {errors?.username?.message}
            </span>
          ) : null}
          <input
            style={`${
              errors?.username
                ? 'border: 0.1rem solid var(--color-error-600); background-color: rgba(252, 165, 165, 0.35)'
                : ''
            }`}
            type='text'
            id='username'
            disabled={isPending}
            {...register('username', {
              required: 'This field is required.',
              minLength: {
                value: 3,
                message: 'The username should have at least 3 characters.',
              },
              maxLength: {
                value: 13,
                message: 'The username should have at most 13 characters.',
              },
            })}
          />
        </div>

        <div>
          <label htmlFor='email'>Email:</label>
          {errors ? (
            <span style={{ color: 'orangered' }}>{errors?.email?.message}</span>
          ) : null}
          <input
            style={`${
              errors?.email
                ? 'border: 0.1rem solid var(--color-error-600); background-color: rgba(252, 165, 165, 0.35)'
                : ''
            }`}
            type='email'
            id='email'
            disabled={isPending}
            {...register('email', {
              required: 'This field is required.',
              pattern: {
                value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                message: 'Please provide a valid email address.',
              },
            })}
          />
        </div>

        <div>
          <label htmlFor='password'>
            Password&nbsp;
            <span style={{ color: '#d1d5db' }}>(min 6 characters)</span>:
          </label>
          {errors ? (
            <span style={{ color: 'orangered' }}>
              {errors?.password?.message}
            </span>
          ) : null}
          <input
            style={`${
              errors?.password
                ? 'border: 0.1rem solid var(--color-error-600); background-color: rgba(252, 165, 165, 0.35)'
                : ''
            }`}
            type='password'
            id='password'
            disabled={isPending}
            {...register('password', {
              required: 'This field is required.',
              minLength: {
                value: 6,
                message: 'The password should have at least 6 characters.',
              },
              maxLength: {
                value: 18,
                message: 'The password should have at most 18 characters.',
              },
            })}
          />
        </div>

        <div>
          <label htmlFor='confirmPassword'>Confirm Password:</label>
          {errors ? (
            <span style={{ color: 'orangered' }}>
              {errors?.confirmPassword?.message}
            </span>
          ) : null}
          <input
            style={` ${
              errors?.confirmPassword
                ? 'border: 0.1rem solid var(--color-error-600); background-color: rgba(252, 165, 165, 0.35)'
                : ''
            }`}
            type='password'
            id='confirmPassword'
            disabled={isPending}
            {...register('confirmPassword', {
              required: 'This field is required.',
              validate: (value) =>
                value === getValues().password || 'The passwords must match.',
            })}
          />
        </div>

        <div>
          <button
            style={{
              color: `${
                errors?.username ||
                errors?.email ||
                errors?.password ||
                errors?.confirmPassword
                  ? 'var(--color-white)'
                  : ''
              }`,
              backgroundColor: `${
                errors?.username ||
                errors?.email ||
                errors?.password ||
                errors?.confirmPassword
                  ? 'var(--color-error-600)'
                  : ''
              }`,
              border: `${
                errors?.username ||
                errors?.email ||
                errors?.password ||
                errors?.confirmPassword
                  ? 'none'
                  : ''
              }`,
            }}
            disabled={isPending}
          >
            {!isPending ? `Sign Up` : <SmallLoader />}
          </button>

          <button
            style={{
              color: `${
                errors?.username ||
                errors?.email ||
                errors?.password ||
                errors?.confirmPassword
                  ? 'var(--color-white)'
                  : ''
              }`,
              backgroundColor: `${
                errors?.username ||
                errors?.email ||
                errors?.password ||
                errors?.confirmPassword
                  ? 'var(--color-error-600)'
                  : ''
              }`,
              border: `${
                errors?.username ||
                errors?.email ||
                errors?.password ||
                errors?.confirmPassword
                  ? 'none'
                  : ''
              }`,
            }}
            disabled={isPending}
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
