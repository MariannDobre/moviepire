import { useUser } from '../hooks/auth/useUser';

import AlreadyRegistered from '../components/_register-page/AlreadyRegistered';
import RegisterForm from '../components/_register-page/RegisterForm';
import SmallLoader from '../interface/_loaders/SmallLoader';

export default function RegisterPage() {
  const { user, isFetching } = useUser();

  if (isFetching)
    return (
      <div className='w-full h-[calc(100vh-48px-48px-80px)] p-6 flex flex-col items-center justify-center gap-3 bg-neutral-50/10 border border-yellow-700 rounded-lg shadow-sm'>
        <p className='text-yellow-500 text-lg font-normal tracking-wide text-center'>
          Checking if there is any user session...
        </p>

        <SmallLoader
          size='text-2xl'
          color='text-yellow-700'
        />
      </div>
    );

  return (
    <section
      style={{
        background: `
                radial-gradient(
                 circle,
                 rgba(0, 0, 0, 0) 25%,
                 rgba(0, 0, 0, 1) 95%
                ),
                linear-gradient(
                 to bottom,
                 rgba(0, 0, 0, 1),
                 rgba(0, 0, 0, 0.6),
                 rgba(0, 0, 0, 0.4),
                 rgba(0, 0, 0, 0.2),
                 rgba(0, 0, 0, 0.4),
                 rgba(0, 0, 0, 0.6),
                 rgba(0, 0, 0, 1)
                ),
                url(authBg.jpg) no-repeat center / cover
              `,
      }}
      className='w-full h-[calc(100vh-80px-48px-48px)] flex flex-col items-center justify-center'
    >
      {user?.role === 'authenticated' ? (
        <AlreadyRegistered />
      ) : (
        <RegisterForm />
      )}
    </section>
  );
}
