import { Content as PopoverContent } from "@radix-ui/react-popover";
import { keyframes, styled, theme } from "@/styles/stitches.config";

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-5px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

export const Content = styled(PopoverContent, {
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
  "&:focus": {
    boxShadow: `hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px, 0 0 0 2px violet`,
  },
});
