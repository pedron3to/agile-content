import { useContext } from "react";
import { ToastContext } from "@/Context/ToastContext";

const useToast = () => {
  const { showToast } = useContext(ToastContext);
  return { showToast };
};

export default useToast;
