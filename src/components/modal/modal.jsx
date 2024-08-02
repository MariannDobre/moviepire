import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import styled from 'styled-components';
import { MdClose } from 'react-icons/md';

// COMPOUND COMPONENT
// 1. Create a context
// const ModalContext = createContext()

const StyledModal = styled.div``;

const StyledOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: 3;
`;

const StyledBody = styled(motion.aside)`
  position: relative;
  border-radius: calc(var(--border-rounded-xs) / 2);
`;

const CloseModalButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-left: auto;
  width: 4rem;
  height: 4rem;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: var(--font-size-md);
  padding: calc(var(--padding-xs) / 2) var(--padding-sm);
  border-radius: var(--border-rounded-full);

  svg {
    font-size: var(--font-size-lg);
    color: var(--color-white);
  }

  &:focus {
    border: none;
    outline: none;
  }
`;

// 2. Create the parent component
function Modal({ children }) {
  return <StyledModal>{children}</StyledModal>;
}

// 3. Create child components
function Overlay({ children, onClick }) {
  return (
    <StyledOverlay
      style={{ backdropFilter: 'blur(0.4rem)' }}
      onClick={onClick}
    >
      {children}
    </StyledOverlay>
  );
}

function Body({
  children,
  display,
  flexDirection,
  alignItems,
  justifyContent,
  gap,
  width,
  height,
  backgroundColor,
  padding,
}) {
  const modalBodyVariants = {
    initial: {
      scale: 0.25,
    },
    animate: {
      scale: 1,
      transition: {
        duration: 0.35,
      },
    },
  };

  return (
    <AnimatePresence>
      <StyledBody
        variants={modalBodyVariants}
        initial='initial'
        animate='animate'
        style={{
          display,
          flexDirection,
          alignItems,
          justifyContent,
          gap,
          width,
          height,
          backgroundColor,
          padding,
        }}
      >
        {children}
      </StyledBody>
    </AnimatePresence>
  );
}

function CloseModal({
  onClose,
  onEnter,
  onLeave,
  favoritesStatus,
  isHovered,
  setIsHovered,
}) {
  return (
    <CloseModalButton
      style={{
        backgroundColor:
          favoritesStatus?.length === 0
            ? isHovered
              ? '#8d1d1d'
              : '#fa5252'
            : isHovered
            ? '#3730a3'
            : '#4f46e5',
        transition: 'background-color 0.35s ease',
      }}
      onClick={() => {
        onClose();
        setIsHovered(false);
      }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <MdClose />
    </CloseModalButton>
  );
}

// 4. Add child components as properties for the parent component
Modal.Overlay = Overlay;
Modal.Body = Body;
Modal.CloseModal = CloseModal;

export default Modal;
