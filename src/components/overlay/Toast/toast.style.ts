import * as ToastPrimitive from "@radix-ui/react-toast";
import { keyframes, styled, theme } from "@/styles/stitches.config";

export const hide = keyframes({
  "0%": { opacity: 1 },
  "100%": { opacity: 0 },
});

const VIEWPORT_PADDING = 10;
export const slideIn = keyframes({
  from: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
  to: { transform: "translateX(0)" },
});

export const swipeOut = keyframes({
  from: { transform: "translateX(var(--radix-toast-swipe-end-x))" },
  to: { transform: `translateX(calc(100% + ${VIEWPORT_PADDING}px))` },
});

export const Title = styled(ToastPrimitive.Title, {
  width: "100%",
  fontSize: theme.fontSizes.lg,
  fontWeight: theme.fontWeights.regular,
  _truncate: true,
});
export const Close = styled(ToastPrimitive.Close, {
  all: "unset",
  cursor: "pointer",

  display: "flex",
  alignItems: "center",
});
export const Toast = styled(ToastPrimitive.Root, {
  "width": "22rem",
  "borderStyle": "solid",
  "borderWidth": "0.15rem",
  "borderRadius": theme.radii.sm,
  "padding": "1rem",

  "display": "flex",
  "alignItems": "center",
  "gap": "0.5rem",

  "backgroundColor": theme.colors.background1,

  "variants": {
    styleType: {
      success: {
        "borderColor": theme.colors.success,
        ".toast-type-icon": {
          _iconColor: { fill: theme.colors.success },
        },
      },
      error: {
        "borderColor": theme.colors.error,
        ".toast-type-icon": {
          _iconColor: { fill: theme.colors.error },
        },
      },
      info: {
        "borderColor": theme.colors.info,
        ".toast-type-icon": {
          _iconColor: { fill: theme.colors.info },
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
