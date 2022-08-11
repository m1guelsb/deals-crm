import type { Dispatch, SetStateAction } from "react";
import { styled } from "@/styles/stitches.config";
import { Button, Input, Select } from "@/components/form";
import { Controller, useForm } from "react-hook-form";
import { DealForm } from "@/types";
import { usePost } from "@/hooks/api/usePost";
import { yupResolver } from "@hookform/resolvers/yup";
import { newDealFormSchema } from "@/utils/validations/yup";
import { Spinner } from "@/components/feedback";
import { useToast } from "@/hooks/helpers/useToast";
import type { DealForm } from "@/types";

interface NewDealFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export const NewDealForm = ({ setIsOpen }: NewDealFormProps) => {
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
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUseNativeValidation: false,
    shouldFocusError: true,
    shouldFocusError: false,
    resolver: yupResolver(newDealFormSchema),
  });

  const handlePostNewDeal = (dealFormData: DealForm) => {
    postDeal("/deals", dealFormData);
  };

  return (
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
        <Button
          sType={"tertiary"}
          type="button"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </Button>
        <Button type="submit" rightIcon={postLoading && <Spinner />}>
          Save Deal
        </Button>
      </Actions>
    </Form>
  );
};

const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
  gap: "1rem",
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
