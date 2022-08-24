import { Dispatch, ReactElement, SetStateAction, useState } from "react";
import {
  BaseDialog,
  dialogContentShow,
  Title,
  DialogContent,
} from "@/components/overlay/dialogs/BaseDialog";
import { styled, theme } from "@/styles/stitches.config";
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
      <Content>
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
      </Content>
    </BaseDialog>
  );
};

const Content = styled(DialogContent, {
  "width": "38rem",
  "minHeight": "20rem",

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

const SkeletonGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gridGap: "2rem",
  justifyItems: "center",
});
