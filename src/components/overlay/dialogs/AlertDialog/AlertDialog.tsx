import { ReactElement } from "react";
import {
  BaseDialog,
  dialogContentShow,
  Title,
  Close,
  DialogContent,
} from "@/components/overlay/dialogs/BaseDialog";
import { styled, theme } from "@/styles/stitches.config";
import { Button } from "@/components/form";

interface DialogProps {
  title: string;
  children: ReactElement;
  onConfirm: () => void;
}
export const AlertDialog = ({ title, onConfirm, children }: DialogProps) => {
  return (
    <BaseDialog trigger={children}>
      <Content>
        <Title>{title}</Title>

        <Actions>
          <Close>
            <Button sType={"tertiary"}>Cancel</Button>
          </Close>
          <Close>
            <Button onClick={onConfirm}>Yes</Button>
          </Close>
        </Actions>
      </Content>
    </BaseDialog>
  );
};

const Actions = styled("div", {
  display: "flex",
  justifyContent: "space-between",
});
const Content = styled(DialogContent, {
  "width": "20rem",

  "display": "flex",
  "flexDirection": "column",
  "gap": "1rem",

  "backgroundColor": theme.colors.background2,
  "_border": "All",
  "borderColor": theme.colors.primary,

  "padding": "1rem",

  "borderRadius": theme.radii.md,

  "position": "fixed",
  "top": "50%",
  "left": "50%",
  "transform": "translate(-50%, -50%)",

  "@media (prefers-reduced-motion: no-preference)": {
    animation: `${dialogContentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  },
  "&:focus": { outline: "none" },
});
