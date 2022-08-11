import { ReactElement, useState } from "react";
import {
  BaseDialog,
  dialogContentShow,
  Title,
  DialogContent,
} from "@/components/overlay/dialogs/BaseDialog";
import { styled, theme } from "@/styles/stitches.config";
import { NewDealForm } from "@/components/form-groups";

interface DialogProps {
  children: ReactElement;
}
export const NewDealDialog = ({ children }: DialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BaseDialog trigger={children} open={isOpen} onOpenChange={setIsOpen}>
      <Content>
        <Title>Add New Deal</Title>

        <NewDealForm setIsOpen={setIsOpen} />
      </Content>
    </BaseDialog>
  );
};

const Content = styled(DialogContent, {
  "width": "38rem",

  "display": "flex",
  "flexDirection": "column",
  "gap": "1rem",

  "backgroundColor": theme.colors.background1,
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
