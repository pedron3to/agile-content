"use client";
import React, { ReactNode, useCallback, useState } from "react";
import Toast from "@/components/Toast";

export const ToastContext = React.createContext({
  showToast: (message: string) => {},
});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = useCallback(
    (message: string) => {
      setMessage(message);
      setShowToast(true);
    },
    [setShowToast, setMessage]
  );

  const handleCloseToast = useCallback(() => {
    setShowToast(false);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast: showToastMessage }}>
      {children}
      {showToast && <Toast message={message} onClose={handleCloseToast} />}
    </ToastContext.Provider>
  );
};
