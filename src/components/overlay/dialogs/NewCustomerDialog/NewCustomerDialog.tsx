import { ReactElement, useState } from "react";
import {
  BaseDialog,
  Title,
  DialogContent,
} from "@/components/overlay/dialogs/BaseDialog";
import { NewCustomerForm } from "@/components/form-groups";

interface DialogProps {
  children: ReactElement;
}
export const NewCustomerDialog = ({ children }: DialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BaseDialog trigger={children} open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <Title>Add New Customer</Title>

        <NewCustomerForm setIsOpen={setIsOpen} />
      </DialogContent>
    </BaseDialog>
  );
};
