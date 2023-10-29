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
      <DialogContent css={{ width: "34rem" }}>
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
                  queryClient.invalidateQueries(["tasks"]);
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
              <Skeleton width="15rem" />
              <Skeleton width="15rem" />
              <div style={{ gridColumn: "1 / 3" }}>
                <Skeleton width="15rem" />
              </div>

              <Skeleton width="8rem" />
              <Skeleton width="8rem" />
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
  gridColumnGap: "1rem",
  gridRowGap: "2rem",
  justifyItems: "center",
});
