'use client';
// @ts-nocheck
import { XIcon } from 'lucide-react';
import React from 'react';
import ReactDOM from 'react-dom';

interface ModalProps {
  isOpen: string | null | boolean
  children: React.ReactNode

}

const Modal: React.FC<ModalProps> = ({ isOpen, children}) => {
  if (!isOpen) {
    return null
  }

  return ReactDOM.createPortal(
    <div className="fixed top-0 left-0 grid place-content-center w-[100vw] h-[100vh] overflow-scroll">
      <div className="absolute top-0 left-0 w-full min-h-full py-6 flex justify-center pt-[5rem] bg-black bg-opacity-50 ">
        <div className="w-fit z-50 ">
          <div className="p-6">{children}</div>
        </div>
        <div
          className="absolute top-0 left-0 w-full min-h-full bg-neutral-cool-700 opacity-60 z-30"
        ></div>
      </div>
    </div>,
    document.body
  )
}

export default Modal
