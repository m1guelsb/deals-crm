import { useContext } from "react";
import { ToastContext } from "@/contexts/ToastContext";

export const useToast = () => {
  const { newToast } = useContext(ToastContext);

  return { newToast };
};
