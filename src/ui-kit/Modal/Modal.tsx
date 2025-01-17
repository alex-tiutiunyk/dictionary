import React, { SetStateAction } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  setIsModal: React.Dispatch<SetStateAction<boolean>>;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ setIsModal, children }) => {
  const domElement = document.getElementById('modal');
  return domElement
    ? createPortal(
        <div
          className='fixed inset-0 bg-black/40 flex items-center justify-center'
          onClick={() => setIsModal((value) => !value)}
        >
          <div
            className='relative max-w-72 max-h-[80vh] bg-white w-full rounded-2xl p-3.5 gap-3 flex flex-col overflow-y-auto'
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>,
        domElement,
      )
    : null;
};

export default Modal;
