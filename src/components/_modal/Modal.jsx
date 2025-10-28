import React from 'react';
import ReactDOM from 'react-dom';

import { MdClose } from 'react-icons/md';

export default function Modal({ isOpen, onCloseModal, children }) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <React.Fragment>
      <div className='fixed top-0 left-0 bottom-0 right-0 z-[1000] bg-black/50 backdrop-blur-md' />

      <div className='border border-neutral-700 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] w-full max-w-[876px] h-[524px] bg-black/25 flex flex-col gap-6 p-6 rounded-md'>
        <button
          type='button'
          aria-label='Close the current modal'
          title='Close the current modal'
          onClick={onCloseModal}
          className='outline-none border-none cursor-pointer w-8 h-8 self-start flex items-center justify-center bg-amber-400 rounded-md hover:bg-amber-500 focus-visible:bg-amber-500 transition-colors duration-300'
        >
          <span className='text-black text-lg'>
            <MdClose />
          </span>
        </button>

        <div className='w-[calc(876px-48px-2px)] h-[calc(524px-48px-32px-24px-2px)]'>
          {children}
        </div>
      </div>
    </React.Fragment>,
    document.getElementById('modal-root')
  );
}
