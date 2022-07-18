import { styled, keyframes } from "@/stitches.config";
import * as ToastPrimitive from "@radix-ui/react-toast";

import {
  closeCircle,
  toastSuccess,
  toastInfo,
  toastError,
} from "@/assets/icons";
import { Icon } from "@/components/media/Icon";

const VIEWPORT_PADDING = 10;

const hide = keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: 0 },
});

const slideIn = keyframes({
  from: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
  to: { transform: "translateX(0)" },
});

const swipeOut = keyframes({
  from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
  to: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
});

const TOAST_ICONS = {
  success: toastSuccess,
  error: toastError,
  info: toastInfo,
};

const Title = styled(ToastPrimitive.Title, {
  width: "100%",
  fontSize: "$lg",
  fontWeight: "$regular",
  textOverflow: "ellipsis",
  overflow: "hidden",
});
const Close = styled(ToastPrimitive.Close, {
  all: "unset",
  cursor: "pointer",

  display: "flex",
  alignItems: "center",
});
const ToastElement = styled(ToastPrimitive.Root, {
  "width": "22rem",
  "borderStyle": "solid",
  "borderWidth": "0.15rem",
  "borderRadius": "$sm",
  "padding": "1rem",

  "display": "flex",
  "alignItems": "center",
  "gap": "0.5rem",

  "backgroundColor": "$background161",

  "variants": {
    styleType: {
      success: {
        "borderColor": "$success",
        ".toast-type-icon": {
          iconColor: "$success",
        },
      },
      error: {
        "borderColor": "$error",
        ".toast-type-icon": {
          iconColor: "$error",
        },
      },
      info: {
        "borderColor": "$info",
        ".toast-type-icon": {
          iconColor: "$info",
        },
      },
    },
  },

  "@media (prefers-reduced-motion: no-preference)": {
    '&[data-state="open"]': {
      animation: `${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
    },
    '&[data-state="closed"]': {
      animation: `${hide} 100ms ease-in forwards`,
    },
    '&[data-swipe="move"]': {
      transform: "translateX(var(--radix-toast-swipe-move-x))",
    },
    '&[data-swipe="cancel"]': {
      transform: "translateX(0)",
      transition: "transform 200ms ease-out",
    },
    '&[data-swipe="end"]': {
      animation: `${swipeOut} 100ms ease-out forwards`,
    },
  },
});

export interface ToastProps extends ToastPrimitive.ToastProps {
  title: string;
  duration?: number;
  styleType: "success" | "error" | "info";
}

export const Toast = ({ title, styleType, duration, ...props }: ToastProps) => {
  return (
    <>
      <ToastElement
        styleType={styleType}
        duration={duration || 6000}
        {...props}
      >
        <Icon
          className="toast-type-icon"
          sSize={"large"}
          src={`${TOAST_ICONS[styleType].src}`}
        />

        <Title>{title}</Title>

        <Close aria-label="Close" title="Close">
          <Icon sSize={"large"} src={closeCircle.src} />
        </Close>
      </ToastElement>
    </>
  );
};
