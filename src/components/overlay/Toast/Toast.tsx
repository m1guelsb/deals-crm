import { Icon } from "@/components/media";
import {
  closeCircle,
  toastSuccess,
  toastInfo,
  toastError,
} from "@/assets/icons";
import * as S from "./toast.style";

const TOAST_ICONS = {
  success: toastSuccess,
  error: toastError,
  info: toastInfo,
};

export interface ToastProps {
  title: string;
  duration?: number;
  styleType: "success" | "error" | "info";
  id?: string;
  role?: "alertdialog";
}

export const Toast = ({ title, styleType, duration, ...props }: ToastProps) => {
  return (
    <>
      <S.Toast styleType={styleType} duration={duration || 6000} {...props}>
        <Icon
          className="toast-type-icon"
          sSize={"large"}
          src={`${TOAST_ICONS[styleType].src}`}
        />

        <S.Title>{title}</S.Title>

        <S.Close aria-label="Close" title="Close">
          <Icon sSize={"large"} src={closeCircle.src} />
        </S.Close>
      </S.Toast>
    </>
  );
};
