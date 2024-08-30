import { useEffect, useRef } from 'react';

export function useClickOutside(callback) {
  const containerRef = useRef(null);

  useEffect(() => {
    let handler = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        callback();
      }
    };

    document.addEventListener('click', handler);

    return () => {
      document.removeEventListener('click', handler);
    };
  }, [callback]);

  return { containerRef };
}
