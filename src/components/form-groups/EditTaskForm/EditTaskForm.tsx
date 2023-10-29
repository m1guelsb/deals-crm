import { Dispatch, SetStateAction } from "react";
import { styled } from "@/styles/stitches.config";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Checkbox } from "@/components/form";
import { taskFormSchema } from "@/utils/validations/yup";
import { Spinner } from "@/components/feedback";
import { useToast } from "@/hooks/helpers/useToast";
import { useQueryClient } from "@tanstack/react-query";
import type { Task, TaskForm } from "@/types";
import { useQueryPatch } from "@/hooks/react-query/useQueryPatch";
import { DatePicker } from "@/components/form";
import { parseDate } from "@internationalized/date";

interface EditTaskFormProps {
  taskData: Task | undefined;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export const EditTaskForm = ({ taskData, setIsOpen }: EditTaskFormProps) => {
  const { newToast } = useToast();
  const queryClient = useQueryClient();

  const { patch: patchTask, isLoading } = useQueryPatch<TaskForm>({
    url: `/tasks/${taskData?.id}`,
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
    defaultValues: {
      title: taskData?.title,
      due_date: taskData?.due_date,
      completed: taskData?.completed,
    },
  });

  const handlePatchTask = ({ title, due_date, completed }: TaskForm) => {
    const taskPayload = {
      title,
      due_date,
      completed,
    };

    patchTask(taskPayload, {
      onSuccess() {
        newToast({ styleType: "success", title: "Task edited!" });
        setIsOpen(false);
        queryClient.invalidateQueries(["deal-tasks", taskData?.dealId]);
        queryClient.invalidateQueries(["tasks"]);
        queryClient.invalidateQueries(["task", taskData?.id]);
      },
      onError() {
        newToast({ styleType: "error", title: "Unexpected error, try again." });
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(handlePatchTask)}>
      <InputsGrid>
        <Input
          label="Title"
          errorMessage={errors.title?.message}
          {...register("title")}
          placeholder={"Task title"}
        />

        <Controller
          name="due_date"
          control={control}
          render={({ field: { value, onChange } }) => (
            <DatePicker
              value={value === taskData?.due_date ? parseDate(value) : value}
              onChange={(value) => onChange(value)}
              errorMessage={errors.due_date?.message}
            />
          )}
        />

        <Controller
          name="completed"
          control={control}
          render={({ field: { value, onChange } }) => (
            <CheckboxWrapper>
              <Checkbox value={value} onChange={onChange} />
            </CheckboxWrapper>
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
          Save
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
  gap: "1rem",
});

const Actions = styled("div", {
  display: "flex",
  justifyContent: "space-evenly",
});

const CheckboxWrapper = styled("span", {
  gridColumn: "1 / 3",
  height: "3rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
