import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from 'react';
import { RiCloseFill } from 'react-icons/ri';
import { useClickOutside } from '../../hooks/assets/useClickOutside';

const ModalContext = createContext();

function Modal({ children }) {
  const [openModal, setOpenModal] = useState(null);

  const open = (windowName) => setOpenModal(windowName);
  const close = () => setOpenModal(null);

  return (
    <ModalContext.Provider value={{ openModal, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ opens, renderButton }) {
  const { open } = useContext(ModalContext);

  return cloneElement(renderButton(), {
    onClick: () => open(opens), // Opens the modal by name
  });
}

function Window({ children, name, height }) {
  const { openModal, close } = useContext(ModalContext);

  if (openModal !== name) return null;

  return (
    <div
      id='overlay'
      className='fixed bg-black/50 flex items-center justify-center backdrop-blur w-screen h-screen top-0 right-0 bottom-0 left-0 z-[9999]'
      onClick={close} // close the modal by clicking outside (on the overlay)
    >
      <div
        className={`w-[960px] ${height} flex flex-col items-center justify-center gap-6 rounded-md shadow-lg bg-neutral-900/95 p-6 border-none outline outline-1 outline-neutral-400/50`}
        onClick={(event) => event.stopPropagation()} // prevent the event to bubble up to the parent and close it from inside
      >
        <button
          className='self-start outline-none border-none text-stone-200 text-2xl hover:text-red-400 focus-visible:text-red-400 transition-all duration-300'
          onClick={close}
        >
          <RiCloseFill />
        </button>

        <div className='w-full h-full'>{children}</div>
      </div>
    </div>
  );
}

//
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
