import { useState, useEffect, useRef } from 'react';

const LazyImage = ({
  src,
  alt = '',
  className = '',
  placeholderClassName = '',
  asBackground = false,
  children,
  threshold = 0.01,
  rootMargin = '50px',
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useEffect(() => {
    if (!isInView || !src) return;

    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
    imgRef.current = img;

    return () => {
      if (imgRef.current) {
        imgRef.current.onload = null;
      }
    };
  }, [isInView, src]);

  if (asBackground) {
    return (
      <div
        ref={ref}
        className={`${
          !isLoaded
            ? placeholderClassName || 'bg-neutral-400 animate-pulse'
            : ''
        } ${className}`}
        style={isLoaded ? { backgroundImage: `url(${src})` } : {}}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <img
      ref={ref}
      src={isLoaded ? src : undefined}
      alt={alt}
      className={`${
        !isLoaded ? placeholderClassName || 'bg-neutral-400 animate-pulse' : ''
      } ${className}`}
      {...props}
    />
  );
};

export default LazyImage;
