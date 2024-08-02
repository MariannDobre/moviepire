import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Logo from '../../interface/logo';

import styled from 'styled-components';
import { HiMenuAlt1 } from 'react-icons/hi';
import { MdClose, MdLocalMovies, MdPlayCircle } from 'react-icons/md';
import { SlScreenDesktop } from 'react-icons/sl';

// console.log(breakpoints);

const OpenMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  color: var(--color-white);
  background-color: transparent;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border-radius: calc(var(--border-rounded-xs) / 2);
  padding: calc(var(--padding-md) / 2) var(--padding-md);
  letter-spacing: var(--letter-spacing-xs);
  transition: all 0.35s ease;

  svg {
    font-size: var(--font-size-lg);
  }

  &:focus {
    outline: none;
    border: none;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const CloseMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 4rem;
  height: 4rem;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: var(--font-size-md);
  padding: calc(var(--padding-xs) / 2) var(--padding-sm);
  background-color: var(--color-main-600);
  transition: background-color 0.35s ease;
  border-radius: var(--border-rounded-full);

  svg {
    font-size: var(--font-size-lg);
    color: var(--color-white);
  }

  &:focus {
    border: none;
    outline: none;
  }

  &:hover {
    background-color: var(--color-main-800);
  }

  @media (min-width: 0px) and (max-width: 480px) {
    width: 3.2rem;
    height: 3.2rem;
    font-size: var(--font-size-sm);
  }

  @media (min-width: 480px) and (max-width: 640px) {
    width: 3.6rem;
    height: 3.6rem;
    font-size: var(--font-size-sm);
  }
`;

const StyledMenu = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  gap: 6.4rem;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-black-light);
  z-index: 1000;
  overflow: none;
`;

const HeaderMenu = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-width: 80rem;

  @media (min-width: 0px) and (max-width: 480px) {
    min-width: 24rem;
  }

  @media (min-width: 480px) and (max-width: 640px) {
    min-width: 32rem;
  }

  @media (min-width: 640px) and (max-width: 1024px) {
    min-width: 44rem;
  }
`;

const NavMenu = styled.nav`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  min-width: 80rem;

  @media (min-width: 0px) and (max-width: 480px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 2.4rem;
    min-width: 24rem;
  }

  @media (min-width: 480px) and (max-width: 640px) {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
    min-width: 32rem;
  }

  @media (min-width: 640px) and (max-width: 1024px) {
    display: grid;
    justify-items: start;
    grid-template-columns: repeat(2, 21rem);
    grid-template-rows: repeat(2, 18rem);
    grid-column-gap: 2rem;
    min-width: 44rem;
  }
`;

const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const MenuTitle = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.8rem;
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-white);
  letter-spacing: var(--letter-spacing-sm);

  svg {
    color: var(--color-main-600);
  }
`;

const MenuItem = styled.li`
  list-style: none;
`;

const MenuLink = styled(Link)`
  font-size: var(--font-size-sm);
  text-decoration: none;
  color: var(--color-gray);
  letter-spacing: var(--letter-spacing-xs);

  &:hover,
  &:active {
    border-bottom: 0.2rem solid var(--color-main-600);
    color: var(--color-white);
  }
`;

function Menu() {
  const [openMenu, setOpenMenu] = useState(false);
  const menuVariants = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.35,
        ease: [0.5, 0, 0.25, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        duration: 0.35,
        ease: [0.25, 0, 0.5, 0],
      },
    },
  };

  function toggleMenu() {
    setOpenMenu((openMenu) => !openMenu);
  }

  return (
    <>
      <OpenMenuButton onClick={toggleMenu}>
        <HiMenuAlt1 />
        <span>Menu</span>
      </OpenMenuButton>

      <AnimatePresence>
        {openMenu && (
          <StyledMenu
            variants={menuVariants}
            initial='initial'
            animate='animate'
            exit='exit'
          >
            <HeaderMenu>
              <Logo />
              <CloseMenuButton onClick={toggleMenu}>
                <MdClose />
              </CloseMenuButton>
            </HeaderMenu>

            <NavMenu>
              <MenuList>
                <MenuTitle>
                  <MdLocalMovies />
                  Movies
                </MenuTitle>

                <MenuItem>
                  <MenuLink>Top 50 Movies</MenuLink>
                </MenuItem>

                <MenuItem>
                  <MenuLink>Most Popular Movies</MenuLink>
                </MenuItem>

                <MenuItem>
                  <MenuLink>Browse Movies by Genre</MenuLink>
                </MenuItem>
              </MenuList>

              <MenuList>
                <MenuTitle>
                  <SlScreenDesktop />
                  TV Shows
                </MenuTitle>

                <MenuItem>
                  <MenuLink>Top 50 TV Shows</MenuLink>
                </MenuItem>

                <MenuItem>
                  <MenuLink>Most Popular TV Shows</MenuLink>
                </MenuItem>

                <MenuItem>
                  <MenuLink>Browse TV Show by Genre</MenuLink>
                </MenuItem>
              </MenuList>

              <MenuList>
                <MenuTitle>
                  <MdPlayCircle />
                  Watch
                </MenuTitle>

                <MenuItem>
                  <MenuLink>From Your Watchlist</MenuLink>
                </MenuItem>

                <MenuItem>
                  <MenuLink>Most Popular</MenuLink>
                </MenuItem>

                <MenuItem>
                  <MenuLink>Latest Trailers</MenuLink>
                </MenuItem>
              </MenuList>
            </NavMenu>
          </StyledMenu>
        )}
      </AnimatePresence>
    </>
  );
}

export default Menu;
