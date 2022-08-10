import { keyframes, styled, theme } from "@/styles/stitches.config";
import * as D from "@radix-ui/react-dialog";
import { ReactElement, ReactNode } from "react";

interface BaseDialogProps {
  trigger: ReactNode;
  children: ReactElement;
}
export const BaseDialog = ({ trigger, children }: BaseDialogProps) => (
  <D.Root>
    <D.Trigger asChild>{trigger}</D.Trigger>

    <D.Portal>
      <Overlay />

      {children}
    </D.Portal>
  </D.Root>
);

export const DialogContent = D.Content;

export const dialogContentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

export const Close = styled(D.Close, {
  all: "unset",
});
export const Title = styled(D.Title, {
  fontSize: theme.fontSizes.xl,
});

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});
const Overlay = styled(D.Overlay, {
  "backgroundColor": "rgba(0,0,0,0.5)",
  "position": "fixed",
  "inset": 0,
  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
});
