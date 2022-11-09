import type { Dispatch, SetStateAction } from "react";
import { styled } from "@/styles/stitches.config";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "@/components/form";
import { taskFormSchema } from "@/utils/validations/yup";
import { Spinner } from "@/components/feedback";
import { useToast } from "@/hooks/helpers/useToast";
import { useQueryPost } from "@/hooks/api/useQueryPost";
import { useQueryClient } from "@tanstack/react-query";
import type { TaskForm } from "@/types";

interface NewTaskFormProps {
  dealId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export const NewTaskForm = ({ setIsOpen, dealId }: NewTaskFormProps) => {
  const { newToast } = useToast();
  const { post: postTask, isLoading } = useQueryPost<TaskForm>({
    url: `/deals/${dealId}/tasks`,
  });
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TaskForm>({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUseNativeValidation: false,
    shouldFocusError: false,
    resolver: yupResolver(taskFormSchema),
  });

  const handlePostNewDeal = ({ title, due_date }: TaskForm) => {
    const taskPayload = {
      title,
      due_date,
    };

    postTask(taskPayload, {
      onSuccess() {
        newToast({ styleType: "success", title: "Task created!" });
        setIsOpen(false);
        queryClient.invalidateQueries(["tasks"]);
      },
      onError() {
        newToast({ styleType: "error", title: "Unexpected error, try again." });
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(handlePostNewDeal)}>
      <InputsGrid>
        <Input
          label="Title"
          errorMessage={errors.title?.message}
          {...register("title")}
        />

        {/* <Controller
          name="due_date"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Select
              label="Status"
              errorMessage={errors.status?.value?.message}
              options={[
                { label: "Closed", value: "1" },
                { label: "In Progress", value: "2" },
              ]}
              value={value}
              onChange={(selected) => onChange(selected)}
            />
          )}
        /> */}
      </InputsGrid>

      <Actions>
        <Button
          sType={"tertiary"}
          type="button"
          onClick={() => setIsOpen(false)}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          rightIcon={isLoading && <Spinner />}
        >
          Create Task
        </Button>
      </Actions>
    </Form>
  );
};

const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});
const InputsGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",
});

const Actions = styled("div", {
  display: "flex",
  justifyContent: "space-evenly",
});
