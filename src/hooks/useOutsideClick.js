import { useEffect } from 'react';

export function useOutsideClick(ref, handler) {
  useEffect(
    function () {
      function handleClickOutside(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener('click', handleClickOutside);

      return () => document.removeEventListener('click', handleClickOutside);
    },
    [ref, handler]
  );
}
