import { deals, plus } from "@/assets/icons";
import { NoData, Skeleton } from "@/components/feedback";
import { IconButton } from "@/components/form";
import { NewDealDialog } from "@/components/overlay";
import { Heading } from "@/components/typography";
import { DealChip } from "@/components/data-display";
import { useQueryGet } from "@/hooks/react-query/useQueryGet";
import { CSS, styled, theme } from "@/styles/stitches.config";
import { Deal } from "@/types";
import Link from "next/link";

interface CustomerDealsProps {
  customerId: string;
  css?: CSS;
}

export const CustomerDeals = ({ customerId, css }: CustomerDealsProps) => {
  const { data: dealsData, isLoading: dealsLoad } = useQueryGet<Deal[]>({
    queryKeys: ["customer-deals", customerId],
    url: `/customers/${customerId}/deals`,
    queryConfigs: {
      enabled: !!customerId,
    },
  });

  return (
    <DealsContainer css={css}>
      <Header>
        <Heading sType={"4"}>Customer Deals</Heading>

        <NewDealDialog>
          <IconButton title="Add deal" iconSrc={plus.src} sSize={"small"} />
        </NewDealDialog>
      </Header>

      <Content>
        {dealsData && dealsData?.length > 0
          ? dealsData?.map(
              ({ id, title, description, price, status, customerId }) => {
                return (
                  <Link href={`/app/deals/${id}`} key={id}>
                    <DealChip
                      title={title}
                      description={description}
                      price={price}
                      status={status}
                      customerId={customerId}
                    />
                  </Link>
                );
              }
            )
          : !dealsLoad && (
              <NoData icon={deals.src} message="No deals found" alignY />
            )}

        {dealsLoad && !dealsData
          ? Array.from(
              {
                length: 6,
              },
              (_, index) => <Skeleton height="8rem" key={index} />
            )
          : null}
      </Content>
    </DealsContainer>
  );
};
const DealsContainer = styled("div", {
  height: "100%",
  width: "30rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",

  borderRadius: theme.radii.md,
});

const Header = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const Content = styled("div", {
  height: "100%",

  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",

  overflow: "auto",

  borderRadius: theme.radii.md,
  _border: "All",
  borderColor: theme.colors.background3,
});
