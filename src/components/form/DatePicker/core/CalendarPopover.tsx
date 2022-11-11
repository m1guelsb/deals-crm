import type { ReactElement } from "react";
import { Content as PopoverContent } from "@radix-ui/react-popover";
import { styled, theme } from "@/styles/stitches.config";
import {
  BasePopover,
  popoverSlideDown,
} from "@/components/overlay/popovers/BasePopover";
import { Calendar } from "./Calendar";

interface PopoverProps {
  children: ReactElement;
}
export const CalendarPopover = ({ children }: PopoverProps) => (
  <BasePopover trigger={children}>
    <Content sideOffset={5}>
      <Calendar />
    </Content>
  </BasePopover>
);

export const Content = styled(PopoverContent, {
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
      '&[data-side="bottom"]': { animationName: popoverSlideDown },
    },
  },
});
