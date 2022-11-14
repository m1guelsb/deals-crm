import Link from "next/link";
import { Heading } from "@/components/typography";
import { CSS, styled, theme } from "@/styles/stitches.config";
import { LinkButton } from "@/components/form";
import { DealChip } from "@/components/data-display";
import type { Deal } from "@/types";
import { NoData, Skeleton } from "@/components/feedback";
import { deals } from "@/assets/icons";

interface RecentDealsProps {
  dealsData: Deal[] | undefined;
  isLoading: boolean;
  css?: CSS;
}
export const RecentDeals = ({
  dealsData,
  isLoading,
  css,
}: RecentDealsProps) => {
  return (
    <RecentDealsContainer css={css}>
      <Header>
        <Heading sType={"4"}>Recent Deals</Heading>

        {dealsData && dealsData?.length > 0 && (
          <LinkButton label="View All" href="/app/deals" />
        )}
      </Header>

      <Content>
        {dealsData?.map(
          ({ id, description, price, status, title, customerId }) => (
            <Link href={`/app/deals/${id}`} key={id}>
              <a style={{ color: "unset", textDecoration: "none" }}>
                <DealChip
                  title={title}
                  description={description}
                  status={status}
                  price={price}
                  customerId={customerId}
                />
              </a>
            </Link>
          )
        )}

        {dealsData?.length === 0 && (
          <NoData icon={deals.src} message="No deals found" alignY />
        )}

        {isLoading && !dealsData
          ? Array(7)
              .fill({})
              .map((item, index) => <Skeleton height="5.5rem" key={index} />)
          : null}
      </Content>
    </RecentDealsContainer>
  );
};

const RecentDealsContainer = styled("div", {
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
  gap: "0.35rem",

  borderRadius: theme.radii.md,
  _border: "All",
  borderColor: theme.colors.background3,

  overflow: "auto",
});
