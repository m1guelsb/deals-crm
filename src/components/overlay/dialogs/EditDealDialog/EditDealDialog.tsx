import { Dispatch, ReactElement, SetStateAction, useState } from "react";
import {
  BaseDialog,
  Title,
  DialogContent,
} from "@/components/overlay/dialogs/BaseDialog";
import { styled } from "@/styles/stitches.config";
import { EditDealForm } from "@/components/form-groups";
import { useQueryGet } from "@/hooks/api/useQueryGet";
import type { Deal } from "@/types";
import { Skeleton } from "@/components/feedback";

interface DialogProps {
  dealId: string;
  children?: ReactElement;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export const EditDealDialog = ({
  dealId,
  children,
  isOpen = false,
  setIsOpen,
}: DialogProps) => {
  const { data: dealData, isLoading } = useQueryGet<Deal>({
    url: `/deals/${dealId}`,
    queryKeys: ["deal", dealId],
    queryConfigs: {
      enabled: !!dealId,
    },
  });

  return (
    <BaseDialog trigger={children} open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <Title>Edit Deal</Title>

        {dealData ? (
          <EditDealForm dealData={dealData} setIsOpen={setIsOpen} />
        ) : (
          isLoading && (
            <SkeletonGrid>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton width="6rem" />
              <Skeleton width="6rem" />
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
