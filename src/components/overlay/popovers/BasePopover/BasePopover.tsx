import type { ReactElement, ReactNode } from "react";
import * as P from "@radix-ui/react-popover";
import { keyframes, styled, theme } from "@/styles/stitches.config";

interface PopoverProps {
  trigger: ReactNode;
  children: ReactElement;
  open?: boolean;
  onOpenChange?: (arg1: boolean) => void;
}
export const BasePopover = ({
  trigger,
  children,
  open,
  onOpenChange,
}: PopoverProps) => (
  <P.Root open={open} onOpenChange={onOpenChange}>
    <P.Trigger asChild>{trigger}</P.Trigger>

    <P.Portal>{children}</P.Portal>
  </P.Root>
);

export const Arrow = styled(P.Arrow, {
  fill: theme.colors.primary,
});

export const popoverSlideDown = keyframes({
  "0%": { opacity: 0, transform: "translateY(-5px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});
