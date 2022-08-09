import * as Popover from "@radix-ui/react-popover";
import { keyframes, styled, theme } from "@/styles/stitches.config";

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-5px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

export const Content = styled(Popover.Content, {
  "height": "fit-content",
  "width": "10rem",

  "display": "flex",
  "flexDirection": "column",
  "alignItems": "stretch",

  "backgroundColor": theme.colors.background3,

  "borderRadius": theme.radii.md,
  "_border": "All",
  "borderColor": theme.colors.primary,

  "@media (prefers-reduced-motion: no-preference)": {
    "animationDuration": "400ms",
    "animationTimingFunction": "cubic-bezier(0.16, 1, 0.3, 1)",
    "willChange": "transform, opacity",
    '&[data-state="open"]': {
      '&[data-side="bottom"]': { animationName: slideDownAndFade },
    },
  },
});

export const Arrow = styled(Popover.Arrow, {
  fill: theme.colors.primary,
});
