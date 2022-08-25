import { ReactElement, useState } from "react";
import {
  BaseDialog,
  Title,
  DialogContent,
} from "@/components/overlay/dialogs/BaseDialog";
import { NewDealForm } from "@/components/form-groups";

interface DialogProps {
  children: ReactElement;
}
export const NewDealDialog = ({ children }: DialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BaseDialog trigger={children} open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <Title>Add New Deal</Title>

        <NewDealForm setIsOpen={setIsOpen} />
      </DialogContent>
    </BaseDialog>
  );
};
