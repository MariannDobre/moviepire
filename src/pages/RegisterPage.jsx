import { useUser } from '../hooks/auth/useUser';

import RegisterForm from '../components/_register-page/RegisterForm';
import AlreadyRegistered from '../components/_register-page/AlreadyRegistered';
import SmallLoader from '../interface/_loaders/SmallLoader';
import LazyImage from '../utils/LazyImage';

export default function RegisterPage() {
  const { isAuthenticated, isFetching } = useUser();

  if (isFetching)
    return (
      <div className='w-full h-[calc(100vh-72px)] p-6 flex flex-col items-center justify-center gap-3 bg-yellow-950/45 border border-yellow-500 rounded-md'>
        <p className='text-yellow-500 text-base font-normal tracking-wider text-center'>
          Checking if there's any user session...
        </p>

        <SmallLoader
          size='text-2xl'
          color='text-yellow-500'
        />
      </div>
    );

  return (
    <LazyImage
      asBackground
      src='./authBg.jpg'
      gradient='radial-gradient(circle, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 1))'
      backgroundSize='cover'
      backgroundPosition='center'
      backgroundRepeat='no-repeat'
      className='w-full h-[calc(100vh-72px)] flex flex-col items-center justify-center'
    >
      {isAuthenticated ? <AlreadyRegistered /> : <RegisterForm />}
    </LazyImage>
  );
}
