import type { Dispatch, SetStateAction } from "react";
import { styled } from "@/styles/stitches.config";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, ComboBox, Input, Select } from "@/components/form";
import { newDealFormSchema } from "@/utils/validations/yup";
import { Spinner } from "@/components/feedback";
import { useToast } from "@/hooks/helpers/useToast";
import { useQueryPost } from "@/hooks/api/useQueryPost";
import { useQueryClient } from "@tanstack/react-query";
import type { DealForm } from "@/types";

interface NewDealFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export const NewDealForm = ({ setIsOpen }: NewDealFormProps) => {
  const { newToast } = useToast();
  const { post: postDeal, isLoading } = useQueryPost<DealForm>({
    url: "/deals",
  });
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DealForm>({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUseNativeValidation: false,
    shouldFocusError: false,
    resolver: yupResolver(newDealFormSchema),
  });

  const handlePostNewDeal = (dealFormData: DealForm) =>
    postDeal(dealFormData, {
      onSuccess() {
        newToast({ styleType: "success", title: "Deal created!" });
        setIsOpen(false);
        queryClient.invalidateQueries(["deals"]);
      },
      onError() {
        newToast({ styleType: "error", title: "Unexpected error, try again." });
      },
    });

  return (
    <Form onSubmit={handleSubmit(handlePostNewDeal)}>
      <InputsGrid>
        <Controller
          name="customer"
          control={control}
          render={({ field: { value, onChange } }) => (
            <ComboBox
              value={{ label: value?.name, value: value?.id }}
              onChange={(selected) =>
                onChange({ name: selected?.label, id: selected?.value })
              }
              placeholder={"Search a customer"}
              label="Customer"
              searchUrl="/customers"
              errorMessage={errors.customer?.id?.message}
              css={{ gridColumn: "1 / 3" }}
            />
          )}
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
                { label: "Closed", value: "1" },
                { label: "In Progress", value: "2" },
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
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          rightIcon={isLoading && <Spinner />}
        >
          Save Deal
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
