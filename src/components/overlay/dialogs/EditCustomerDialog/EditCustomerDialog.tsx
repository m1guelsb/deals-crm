import { Dispatch, ReactElement, SetStateAction } from "react";
import {
  BaseDialog,
  Title,
  DialogContent,
} from "@/components/overlay/dialogs/BaseDialog";
import { styled } from "@/styles/stitches.config";
import { EditCustomerForm } from "@/components/form-groups";
import { useQueryGet } from "@/hooks/api/useQueryGet";
import type { Customer } from "@/types";
import { Skeleton } from "@/components/feedback";

interface DialogProps {
  customerId: string;
  children?: ReactElement;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export const EditCustomerDialog = ({
  customerId,
  children,
  isOpen = false,
  setIsOpen,
}: DialogProps) => {
  const { data: customerData, isLoading } = useQueryGet<Customer>({
    url: `/customers/${customerId}`,
    queryKeys: ["customer", customerId],
    queryConfigs: {
      enabled: !!customerId,
    },
  });

  return (
    <BaseDialog trigger={children} open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <Title>Edit Customer</Title>

        {customerData ? (
          <EditCustomerForm customerData={customerData} setIsOpen={setIsOpen} />
        ) : (
          isLoading && (
            <SkeletonGrid>
              <Skeleton width="16rem" />
              <Skeleton width="100%" />
              <Skeleton width="100%" />
              <Skeleton width="100%" />

              <Skeleton width="7rem" />
              <Skeleton width="7rem" />
            </SkeletonGrid>
          )
        )}
      </DialogContent>
    </BaseDialog>
  );
};

const SkeletonGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridGap: "2rem",
  justifyItems: "center",
});
