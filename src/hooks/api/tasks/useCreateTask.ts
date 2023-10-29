import { useToast } from "@/hooks/helpers/useToast";
import { useQueryPost } from "@/hooks/react-query";
import { useQueryClient } from "@tanstack/react-query";

interface TaskPayload {
  title: string;
  due_date: string;
}

interface useCreateTaskProps {
  onTaskCreated: () => void;
}
export const useCreateTask = ({ onTaskCreated }: useCreateTaskProps) => {
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
          queryClient.invalidateQueries(["tasks"]);
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
