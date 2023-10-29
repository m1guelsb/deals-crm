import { Dispatch, SetStateAction } from "react";
import { styled } from "@/styles/stitches.config";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "@/components/form";
import { taskFormSchema } from "@/utils/validations/yup";
import { Spinner } from "@/components/feedback";
import type { TaskForm } from "@/types";
import { DatePicker } from "@/components/form";
import { useCreateTask } from "@/hooks/api/tasks";

interface NewTaskFormProps {
  dealId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export const NewTaskForm = ({ setIsOpen, dealId }: NewTaskFormProps) => {
  const { createTask, isLoading } = useCreateTask({
    onTaskCreated: () => setIsOpen(false),
  });

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

  const handlePostNewTask = ({ title, due_date }: TaskForm) => {
    const taskPayload = {
      title,
      due_date,
    };

    createTask(dealId, taskPayload);
  };

  return (
    <Form onSubmit={handleSubmit(handlePostNewTask)}>
      <InputsGrid>
        <Input
          label="Title"
          errorMessage={errors.title?.message}
          placeholder="Task title"
          {...register("title")}
        />

        <Controller
          name="due_date"
          control={control}
          render={({ field: { value, onChange } }) => (
            <DatePicker
              value={value}
              onChange={(value) => onChange(value)}
              errorMessage={errors.due_date?.message}
            />
          )}
        />
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
