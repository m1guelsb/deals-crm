import { useToast } from "@/hooks/helpers/useToast";
import { useQueryPost } from "@/hooks/react-query";
import { useQueryClient } from "@tanstack/react-query";

interface TaskPayload {
  title: string;
  dueDate: string;
}

interface CreateTaskProps {
  onTaskCreated: () => void;
}
export const useCreateTask = ({ onTaskCreated }: CreateTaskProps) => {
  const { newToast } = useToast();
  const queryClient = useQueryClient();

  const { post, ...rest } = useQueryPost<TaskPayload>({
    url: `/tasks`,
  });

  const createTask = (dealId: string, payload: TaskPayload) => {
    post(
      {
        data: payload,
        params: {
          headers: {
            dealId: dealId,
          },
        },
      },
      {
        onSuccess() {
          newToast({ styleType: "success", title: "Task created!" });
          queryClient.invalidateQueries(["deal-tasks"]);
          onTaskCreated();
        },
        onError() {
          newToast({
            styleType: "error",
            title: "Unexpected error, try again.",
          });
        },
      }
    );
  };

  return { createTask, ...rest };
};
