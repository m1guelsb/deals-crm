import Link from "next/link";
import { Heading } from "@/components/typography";
import { CSS, styled, theme } from "@/styles/stitches.config";
import { LinkButton } from "@/components/form";
import type { Deal } from "@/types/Deal";
import { DealChip } from "@/components/data-display";

interface RecentDealsProps {
  dealsData: Deal[] | undefined;
  css?: CSS;
}
export const RecentDeals = ({ dealsData, css }: RecentDealsProps) => {
  return (
    <RecentDealsContainer css={css}>
      <Header>
        <Heading sType={"4"}>Recent Deals</Heading>

        <LinkButton label="View All" href="/app/deals" />
      </Header>

      <Content>
        {dealsData?.map(({ id, description, price, status, title }) => (
          <Link href={`/app/deals/${id}`} key={id}>
            <a style={{ color: "unset", textDecoration: "none" }}>
              <DealChip
                title={title}
                description={description}
                status={status}
                price={price}
              />
            </a>
          </Link>
        ))}
      </Content>
    </RecentDealsContainer>
  );
};

const RecentDealsContainer = styled("div", {
  height: "100%",

  display: "flex",
  flexDirection: "column",
  gap: "1rem",

  borderRadius: theme.radii.md,
});

const Header = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const Content = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});
