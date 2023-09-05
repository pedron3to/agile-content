import React, { useState, useEffect, useCallback } from "react";
import CloseIcon from "../CloseIcon";

interface ToastProps {
  message: string;
  onClose: () => void;
}

const toastContainer =
  "fixed top-20 right-10 mb-4 mr-4 bg-red-500 text-white px-4 py-2 rounded-lg z-20 flex items-center ";

const Toast = ({ message, onClose }: ToastProps) => {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [onClose]);

  const handleClose = useCallback(() => {
    setShowToast(false);
    onClose();
  }, [onClose, setShowToast]);

  return (
    <>
      {showToast && (
        <div className={toastContainer}>
          <p className="text-sm">{message}</p>
          <button
            className="ml-2 text-sm font-medium focus:outline-none"
            onClick={handleClose}
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </>
  );
};

export default Toast;
