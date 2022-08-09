import type { ReactElement } from "react";
import { Content as PopoverContent } from "@radix-ui/react-popover";
import { styled, theme } from "@/styles/stitches.config";
import {
  BasePopover,
  Arrow,
  popoverSlideDown,
} from "@/components/overlay/popovers/BasePopover";
import { Button } from "@/components/form";
import { Icon } from "@/components/media";
import { costumers, deals } from "@/assets/icons";

interface PopoverProps {
  children: ReactElement;
}
export const AddNewPopover = ({ children }: PopoverProps) => (
  <BasePopover trigger={children}>
    <Content sideOffset={5}>
      <Button
        sType={"secondary"}
        css={{
          width: "100%",
          borderBottomLeftRadius: "0",
          borderBottomRightRadius: "0",
        }}
        rightIcon={<Icon src={deals.src} />}
      >
        Deal
      </Button>

      <Button
        sType={"secondary"}
        css={{
          width: "100%",
          borderTopLeftRadius: "0",
          borderTopRightRadius: "0",
        }}
        rightIcon={<Icon src={costumers.src} />}
      >
        Customer
      </Button>

      <Arrow />
    </Content>
  </BasePopover>
);

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
      '&[data-side="bottom"]': { animationName: popoverSlideDown },
    },
  },
});
