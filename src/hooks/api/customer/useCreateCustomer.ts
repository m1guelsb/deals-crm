import { useToast } from "@/hooks/helpers/useToast";
import { useQueryPost } from "@/hooks/react-query";
import { useQueryClient } from "@tanstack/react-query";

interface CustomerPayload {
  name: string;
  email: string;
  phone: string;
}

interface useCreateCustomerProps {
  onCustomerCreated: () => void;
}
export const useCreateCustomer = ({
  onCustomerCreated,
}: useCreateCustomerProps) => {
  const { newToast } = useToast();
  const queryClient = useQueryClient();

  const { post, ...rest } = useQueryPost<CustomerPayload>({
    url: `/customers`,
  });

  const createCustomer = (payload: CustomerPayload) => {
    post(
      {
        data: payload,
      },
      {
        onSuccess() {
          newToast({ styleType: "success", title: "Customer created!" });
          queryClient.invalidateQueries(["customers"]);
          onCustomerCreated();
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

  return { createCustomer, ...rest };
};
