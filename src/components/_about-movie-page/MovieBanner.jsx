import LazyImage from '../../utils/LazyImage';

export default function MovieBanner({ children, movieBanner }) {
  return (
    <LazyImage
      asBackground
      src={movieBanner}
      gradient='radial-gradient(circle, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 1))'
      backgroundSize='cover'
      backgroundPosition='center'
      backgroundRepeat='no-repeat'
      className='w-full h-[calc(100vh-72px)] flex items-end justify-center'
    >
      {children}
    </LazyImage>
  );
}
