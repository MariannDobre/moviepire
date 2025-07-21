import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from 'react';
import { RiCloseFill } from 'react-icons/ri';

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
        className={`w-[960px] ${height} border border-neutral-500 p-6 flex flex-col items-center justify-center gap-6 rounded-lg shadow-sm bg-neutral-900 relative`}
        onClick={(event) => event.stopPropagation()} // prevent the event to bubble up to the parent and close it from inside
      >
        <button
          className='group self-end outline-none border-none cursor-pointer w-8 h-8 flex items-center justify-center'
          onClick={close}
        >
          <span className='w-full h-full flex items-center justify-center text-white text-3xl group-hover:text-blue-500 group-focus-visible:text-blue-500 transition-all duration-500'>
            <RiCloseFill />
          </span>
        </button>

        <div className='w-full h-full'>{children}</div>
      </div>
    </div>
  );
}

//
Modal.Open = Open;
Modal.Window = Window;

export function useModal() {
  return useContext(ModalContext);
}

export default Modal;
