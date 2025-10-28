import React, { useState, startTransition, useRef, useEffect } from 'react';
import { useUser } from '../../hooks/useUser';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';
import NotLoggedIn from './notLoggedIn';
import LoggedIn from './loggedIn';

function Account() {
  const menuRef = useRef();
  const buttonRef = useRef();
  const viewportRef = useRef();
  const [openMenu, setOpenMenu] = useState(false);
  const [position, setPosition] = useState(null);
  const { user, isAuthenticated } = useUser();
  const truncatedUsername = user?.user_metadata?.username.slice(0, 10);
  const hasUsernameOverflow = user?.user_metadata?.username.length > 10;

  let scrollBarWidth = document.body.clientWidth !== window.innerWidth ? 8 : 0;

  useEffect(() => {
    function updatePosition() {
      const rect = buttonRef.current.getBoundingClientRect();

      setPosition({
        x: window.innerWidth - rect.width - rect.x - scrollBarWidth,
        y: rect.y + rect.height + window.scrollY,
      });
    }

    window.addEventListener('resize', updatePosition);

    updatePosition();

    return () => {
      window.removeEventListener('resize', updatePosition);
    };
  }, [scrollBarWidth]);

  function toggleMenu() {
    startTransition(() => {
      setOpenMenu((openMenu) => !openMenu);
    });
  }

  function closeMenu() {
    setOpenMenu(false);
  }

  useOutsideClick(menuRef, closeMenu);

  return (
    <div ref={viewportRef}>
      <div
        onClick={toggleMenu}
        ref={buttonRef}
      >
        <button>
          {isAuthenticated ? <span>{truncatedUsername}</span> : 'Account'}
          &nbsp;
        </button>

        <div>{openMenu ? <TiArrowSortedUp /> : <TiArrowSortedDown />}</div>
      </div>

      {openMenu && (
        <div
          style={{ top: position.y, right: position.x }}
          ref={menuRef}
          key={isAuthenticated ? 'userIsLoggedIn' : 'userNotLoggedIn'}
          initial='initial'
          animate='animate'
        >
          {isAuthenticated ? <LoggedIn /> : <NotLoggedIn />}
        </div>
      )}
    </div>
  );
}

export default Account;
