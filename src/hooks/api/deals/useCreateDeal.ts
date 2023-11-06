import { useToast } from "@/hooks/helpers/useToast";
import { useQueryPost } from "@/hooks/react-query";
import { useQueryClient } from "@tanstack/react-query";

interface DealPayload {
  title: string;
  description: string;
  price: number;
}

interface useCreateDealProps {
  onDealCreated: () => void;
}
export const useCreateDeal = ({ onDealCreated }: useCreateDealProps) => {
  const { newToast } = useToast();
  const queryClient = useQueryClient();

  const { post, ...rest } = useQueryPost<DealPayload>({
    url: `/deals`,
  });

  const createDeal = (customerId: string, payload: DealPayload) => {
    post(
      {
        data: payload,
        params: {
          headers: {
            customerId: customerId,
          },
        },
      },
      {
        onSuccess() {
          newToast({ styleType: "success", title: "Deal created!" });
          queryClient.invalidateQueries(["deals"]);
          queryClient.invalidateQueries(["customer-deals"]);
          onDealCreated();
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

  return { createDeal, ...rest };
};
