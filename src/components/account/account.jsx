import React, { useState, startTransition, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../../hooks/useUser';
import { useOutsideClick } from '../../hooks/useOutsideClick';

import styled, { css } from 'styled-components';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

import NotLoggedIn from './notLoggedIn';
import LoggedIn from './loggedIn';

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: var(--font-weight-medium);
  width: 16rem;
  border-radius: calc(var(--border-rounded-xs) / 2);
  padding: calc(var(--padding-md) / 2) var(--padding-md);
  cursor: pointer;
  transition: background-color 0.35s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  ${({ $hasUsernameOverflow }) =>
    $hasUsernameOverflow &&
    css`
      &:after {
        --width: 2.8rem;
        --height: calc(1.6rem - 0.3rem);
        --shadow-top: calc(2rem + 0.3rem);
        --shadow-right: calc(40rem - 3rem);

        content: '';
        position: absolute;
        top: var(--shadow-top);
        right: var(--shadow-right);
        bottom: 0;
        width: var(--width);
        height: var(--height);
        background: linear-gradient(
          to right,
          rgba(255, 255, 255, 0),
          var(--color-black-light) 85%
        );
      }
    `}

  &:hover {
    &:after {
      width: 3.2rem;
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.025) 100%
      );
    }
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 2rem;
  cursor: pointer;

  svg {
    color: var(--color-white);
    font-size: var(--font-size-base);
  }
`;

const ButtonContent = styled.button`
  --width: calc(12rem + 2rem);

  position: relative;
  border: none;
  outline: none;
  color: var(--color-white);
  background-color: transparent;
  max-width: var(--width);
  font-size: var(--font-size-sm);
  white-space: nowrap;
  letter-spacing: var(--letter-spacing-xs);
  overflow: hidden;
  cursor: pointer;

  &:focus {
    border: none;
    outline: none;
  }
`;

const MenuContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 20rem;
  position: fixed;
  background-color: var(--color-black-light);
  padding: var(--padding-sm) 0;
  filter: drop-shadow(0 0 1.6rem #000);
  border-radius: calc(var(--border-rounded-xs) / 2);
`;

function Account() {
  const menuRef = useRef();
  const buttonRef = useRef();
  const viewportRef = useRef();
  const [openMenu, setOpenMenu] = useState(false);
  const [position, setPosition] = useState(null);
  const { user, isAuthenticated } = useUser();
  const truncatedUsername = user?.user_metadata?.username.slice(0, 10);
  const hasUsernameOverflow = user?.user_metadata?.username.length > 10;

  const menuVariants = {
    initial: {
      top: '5rem',
      height: 0,
    },
    animate: {
      top: '5rem',
      height: 'auto',
      transition: {
        duration: 0.35,
        ease: [0, 0, 0.25, 0],
        staggerChildren: 0.35,
      },
    },
  };

  const linksVariants = {
    initial: {
      opacity: 0,
      y: -30,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
      },
    },
  };

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
      <ButtonContainer
        onClick={toggleMenu}
        ref={buttonRef}
        $hasUsernameOverflow={hasUsernameOverflow}
      >
        <ButtonContent>
          {isAuthenticated ? <span>{truncatedUsername}</span> : 'Account'}
          &nbsp;
        </ButtonContent>

        <IconContainer>
          {openMenu ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
        </IconContainer>
      </ButtonContainer>

      <AnimatePresence>
        {openMenu && (
          <MenuContainer
            style={{ top: position.y, right: position.x }}
            ref={menuRef}
            key={isAuthenticated ? 'userIsLoggedIn' : 'userNotLoggedIn'}
            variants={menuVariants}
            initial='initial'
            animate='animate'
          >
            {isAuthenticated ? (
              <LoggedIn linksVariants={linksVariants} />
            ) : (
              <NotLoggedIn linksVariants={linksVariants} />
            )}
          </MenuContainer>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Account;
