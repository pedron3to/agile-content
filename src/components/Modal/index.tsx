import React, { ReactNode, useCallback, useState } from "react";
import CloseIcon from "../CloseIcon";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const closeModal = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50 "></div>
          <div className="bg-white relative md:m-24 m-8">
            <button
              className="absolute top-8 right-8 text-white hover:text-gray-700"
              onClick={closeModal}
            >
              <CloseIcon />
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
