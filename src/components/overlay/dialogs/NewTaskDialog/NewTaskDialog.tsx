import { ReactElement, useState } from "react";
import {
  BaseDialog,
  Title,
  DialogContent,
} from "@/components/overlay/dialogs/BaseDialog";
import { NewTaskForm } from "@/components/form-groups";

interface DialogProps {
  dealId: string;
  children: ReactElement;
}
export const NewTaskDialog = ({ dealId, children }: DialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BaseDialog trigger={children} open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <Title>Add New Task</Title>

        <NewTaskForm dealId={dealId} setIsOpen={setIsOpen} />
      </DialogContent>
    </BaseDialog>
  );
};
