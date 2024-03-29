import { Dispatch, SetStateAction } from "react";
import { styled } from "@/styles/stitches.config";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input, Select } from "@/components/form";
import { customerFormSchema } from "@/utils/validations/yup";
import { Spinner } from "@/components/feedback";
import { useToast } from "@/hooks/helpers/useToast";
import { useQueryClient } from "@tanstack/react-query";
import type { Customer, CustomerForm } from "@/types";
import { phoneMask } from "@/utils/masks/phoneMask";
import { useQueryPatch } from "@/hooks/react-query/useQueryPatch";

interface EditCustomerFormProps {
  customerData: Customer | undefined;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export const EditCustomerForm = ({
  customerData,
  setIsOpen,
}: EditCustomerFormProps) => {
  const { newToast } = useToast();
  const queryClient = useQueryClient();

  const { patch: patchCustomer, isLoading } = useQueryPatch<CustomerForm>({
    url: `/customers/${customerData?.id}`,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CustomerForm>({
    mode: "onChange",
    reValidateMode: "onChange",
    shouldUseNativeValidation: false,
    shouldFocusError: false,
    resolver: yupResolver(customerFormSchema),
    defaultValues: {
      name: customerData?.name,
      email: customerData?.email,
      phone: customerData?.phone,
    },
  });

  const handlePatchCustomer = ({ name, email, phone }: CustomerForm) => {
    const customerPayload = {
      name,
      email,
      phone,
    };

    patchCustomer(customerPayload, {
      onSuccess() {
        newToast({ styleType: "success", title: "Customer edited!" });
        setIsOpen(false);
        queryClient.invalidateQueries(["customers"]);

        queryClient.invalidateQueries(["customer", `${customerData?.id}`]);
      },
      onError() {
        newToast({ styleType: "error", title: "Unexpected error, try again." });
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(handlePatchCustomer)}>
      <InputsGrid>
        <Input
          label="Name"
          errorMessage={errors.name?.message}
          {...register("name")}
          placeholder={"Insert customer name"}
          css={{ gridColumn: "1 / 3" }}
        />

        <Input
          label="Email"
          errorMessage={errors.email?.message}
          placeholder={"example@email.com"}
          {...register("email")}
        />

        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field: { value, onChange } }) => (
            <Input
              value={value}
              onChange={({ target: { value } }) => onChange(phoneMask(value))}
              label="Phone"
              placeholder="000-000-0000"
              errorMessage={errors.phone?.message}
              maxLength={12}
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
  width: "35rem",
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
