import React, { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

function Modal({ children }) {
  const [isOpening, setIsOpening] = useState('');

  const closeModal = () => setIsOpening('');
  const openModal = () => setIsOpening();
}

function Open({ children, shouldOpen }) {
  const { openModal } = useContext(ModalContext);

  return children;
}

function Window({ children, willOpen }) {
  return <div>Modal</div>;
}

//
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
