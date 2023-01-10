import type { Dispatch, SetStateAction } from "react";
import { styled } from "@/styles/stitches.config";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "@/components/form";
import { customerFormSchema } from "@/utils/validations/yup";
import type { CustomerForm } from "@/types";
import { phoneMask } from "@/utils/masks/phoneMask";
import { useCreateCustomer } from "@/hooks/api/customer";
import { Spinner } from "@/components/feedback";

interface NewCustomerFormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}
export const NewCustomerForm = ({ setIsOpen }: NewCustomerFormProps) => {
  const { createCustomer, isLoading } = useCreateCustomer({
    onCustomerCreated: () => setIsOpen(false),
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
  });

  const handlePostNewCustomer = ({ name, email, phone }: CustomerForm) => {
    const customerPayload = {
      name,
      email,
      phone,
    };

    createCustomer(customerPayload);
  };

  return (
    <Form onSubmit={handleSubmit(handlePostNewCustomer)}>
      <InputsGrid>
        <Input
          label="Name"
          errorMessage={errors.name?.message}
          {...register("name")}
          placeholder={"Customer name"}
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
          Save Customer
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
