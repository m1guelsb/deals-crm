import { plus } from "@/assets/icons";
import { Skeleton } from "@/components/feedback";
import { IconButton } from "@/components/form";
import { NewDealDialog } from "@/components/overlay";
import { Heading } from "@/components/typography";
import { useQueryGet } from "@/hooks/api/useQueryGet";
import { CSS, styled, theme } from "@/styles/stitches.config";
import { Deal } from "@/types";
import Link from "next/link";
import { DealChip } from "../DealChip/DealChip";

interface customerDealsProps {
  customerId: string;
  css?: CSS;
}

export const CustomerDeals = ({ customerId, css }: customerDealsProps) => {
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
        {dealsData?.map(({ id, title, description, price, status }) => {
          return (
            <Link href={`/app/deals/${id}`} key={id}>
              <a style={{ color: "unset", textDecoration: "none" }}>
                <DealChip
                  title={title}
                  description={description}
                  price={price}
                  status={status}
                />
              </a>
            </Link>
          );
        })}

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
  paddingRight: "0.25rem",
  gap: "0.5rem",

  overflow: "auto",

  borderRadius: theme.radii.md,
});