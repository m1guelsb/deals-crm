import { ReactElement, useState } from "react";
import {
  BaseDialog,
  dialogContentShow,
  Title,
  Close,
  DialogContent,
} from "@/components/overlay/dialogs/BaseDialog";
import { styled, theme } from "@/styles/stitches.config";
import { Button, Input, Select } from "@/components/form";
import { Controller, useForm } from "react-hook-form";
import { DealForm } from "@/types";
import { usePost } from "@/hooks/api/usePost";
import { yupResolver } from "@hookform/resolvers/yup";
import { newDealFormSchema } from "@/utils/validations/yup";
import { Spinner } from "@/components/feedback";
import { useToast } from "@/hooks/helpers/useToast";

interface DialogProps {
  children: ReactElement;
}
export const NewDealDialog = ({ children }: DialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { newToast } = useToast();
  const { post: postDeal, loading: postLoading } = usePost<DealForm>({
    onSuccess: () => {
      newToast({ styleType: "success", title: "Deal created!" });
      setIsOpen(false);
    },
    onError: () =>
      newToast({ styleType: "error", title: "Unspected error has occured!" }),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DealForm>({
    mode: "onBlur",
    reValidateMode: "onChange",
    shouldUseNativeValidation: false,
    shouldFocusError: true,
    resolver: yupResolver(newDealFormSchema),
  });

  const handlePostNewDeal = (dealFormData: DealForm) => {
    postDeal("/deals", dealFormData);
  };

  return (
    <BaseDialog trigger={children} open={isOpen} onOpenChange={setIsOpen}>
      <Content>
        <Title>Add New Deal</Title>

        <Form onSubmit={handleSubmit(handlePostNewDeal)}>
          <InputsGrid>
            <Input
              label="Customer"
              errorMessage={errors.customerId?.message}
              css={{ gridColumn: "1 / 3" }}
              {...register("customerId")}
            />
            <Input
              label="Title"
              errorMessage={errors.title?.message}
              {...register("title")}
            />

            <Input
              label="Description"
              errorMessage={errors.description?.message}
              {...register("description")}
            />

            <Input
              label="Price"
              errorMessage={errors.price?.message}
              {...register("price")}
            />

            <Controller
              name="status"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Select
                  label="Status"
                  errorMessage={errors.status?.value?.message}
                  options={[
                    { label: "In Progress", value: "inprogress" },
                    { label: "Closed", value: "closed" },
                  ]}
                  value={value}
                  onChange={(selected) => onChange(selected)}
                />
              )}
            />
          </InputsGrid>

          <Actions>
            <Close>
              <Button sType={"tertiary"} type="button">
                Cancel
              </Button>
            </Close>
            <Button type="submit" rightIcon={postLoading && <Spinner />}>
              Save Deal
            </Button>
          </Actions>
        </Form>
      </Content>
    </BaseDialog>
  );
};

const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
});
const InputsGrid = styled("div", {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",
});

const Actions = styled("div", {
  display: "flex",
  justifyContent: "space-between",
});
const Content = styled(DialogContent, {
  "width": "38rem",

  "display": "flex",
  "flexDirection": "column",
  "gap": "1.5rem",

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
