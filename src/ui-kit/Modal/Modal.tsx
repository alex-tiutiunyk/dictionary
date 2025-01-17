import React from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  closeModal: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ closeModal, children }) => {
  const domElement = document.getElementById('modal');
  return domElement
    ? createPortal(
        <div
          className='fixed inset-0 bg-black/40 flex items-center justify-center'
          onClick={closeModal}
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
