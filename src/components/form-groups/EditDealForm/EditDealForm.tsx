import { Dispatch, SetStateAction } from "react";
import { styled } from "@/styles/stitches.config";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Select } from "@/components/form";
import { newDealFormSchema } from "@/utils/validations/yup";
import { Spinner } from "@/components/feedback";
import { useToast } from "@/hooks/helpers/useToast";
import { useQueryClient } from "@tanstack/react-query";
import type { Deal, DealForm } from "@/types";
import { currencyMask } from "@/utils/masks/currencyMask";
import { useQueryPatch } from "@/hooks/api/useQueryPatch";

interface EditDealFormProps {
  dealData: Deal | undefined;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export const EditDealForm = ({ dealData, setIsOpen }: EditDealFormProps) => {
  const { newToast } = useToast();
  const queryClient = useQueryClient();

  const { patch: patchDeal, isLoading } = useQueryPatch<
    Omit<DealForm, "customer">
  >({
    url: `/deals/${dealData?.id}`,
  });

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
    defaultValues: {
      title: dealData?.title,
      description: dealData?.description,
      price: dealData?.price,
      status: { label: dealData?.status.label, value: dealData?.status.value },
    },
  });

  const handlePutDeal = ({ title, description, price, status }: DealForm) => {
    const dealPayload = {
      title,
      description,
      price,
      status,
    };

    patchDeal(dealPayload, {
      onSuccess() {
        newToast({ styleType: "success", title: "Deal edited!" });
        setIsOpen(false);
        queryClient.invalidateQueries(["deals"]);

        queryClient.invalidateQueries(["deal-slug", `${dealData?.id}`]);
      },
      onError() {
        newToast({ styleType: "error", title: "Unexpected error, try again." });
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(handlePutDeal)}>
      <InputsGrid>
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

        <Controller
          name="price"
          control={control}
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <Input
              value={value}
              onChange={({ target: { value } }) =>
                onChange(currencyMask(value))
              }
              label="Price"
              placeholder="$"
              errorMessage={errors.price?.message}
              maxLength={11}
            />
          )}
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
  gridTemplateColumns: "1fr 1fr",
  gap: "1rem",
});

const Actions = styled("div", {
  display: "flex",
  justifyContent: "space-evenly",
});
