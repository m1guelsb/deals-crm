import { Dispatch, ReactElement, SetStateAction } from "react";
import {
  BaseDialog,
  Title,
  DialogContent,
} from "@/components/overlay/dialogs/BaseDialog";
import { styled } from "@/styles/stitches.config";
import { EditTaskForm } from "@/components/form-groups";
import { useQueryGet } from "@/hooks/api/useQueryGet";
import type { Task } from "@/types";
import { Skeleton } from "@/components/feedback";
import { useQueryDelete } from "@/hooks/api/useQueryDelete";
import { IconButton } from "@/components/form";
import { trash } from "@/assets/icons";
import { useToast } from "@/hooks/helpers/useToast";
import { useQueryClient } from "@tanstack/react-query";

interface DialogProps {
  taskId: string;
  dealId?: string;
  children?: ReactElement;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export const EditTaskDialog = ({
  taskId,
  dealId,
  children,
  isOpen = false,
  setIsOpen,
}: DialogProps) => {
  const { newToast } = useToast();
  const queryClient = useQueryClient();

  console.log("taskId", taskId);

  const { data: taskData, isLoading } = useQueryGet<Task>({
    url: `/tasks/${taskId}`,
    queryKeys: ["task", taskId],
    queryConfigs: {
      enabled: !!taskId,
    },
  });
  const { queryDelete, isLoading: deleteTaskLoad } = useQueryDelete({
    url: `/tasks/${taskId}`,
  });
  return (
    <BaseDialog trigger={children} open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <TitleContainer>
          <Title>Edit Task</Title>

          <IconButton
            title="Delete task"
            onClick={() =>
              queryDelete(undefined, {
                onSuccess() {
                  newToast({
                    styleType: "success",
                    title: "Task deleted!",
                  });
                  queryClient.invalidateQueries(["deal-tasks", dealId]);
                  setIsOpen(false);
                },
                onError() {
                  newToast({
                    styleType: "error",
                    title: "Unknown error",
                  });
                },
              })
            }
            sType={"tertiary"}
            iconSrc={trash.src}
          />
        </TitleContainer>

        {taskData ? (
          <EditTaskForm taskData={taskData} setIsOpen={setIsOpen} />
        ) : (
          isLoading && (
            <SkeletonGrid>
              <Skeleton width="16.5rem" />
              <Skeleton width="16.5rem" />
            </SkeletonGrid>
          )
        )}
      </DialogContent>
    </BaseDialog>
  );
};

const TitleContainer = styled("div", {
  display: "flex",
  justifyContent: "space-between",
});
const SkeletonGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "auto auto",
  gridRowGap: "2rem",
  justifyItems: "center",
});
