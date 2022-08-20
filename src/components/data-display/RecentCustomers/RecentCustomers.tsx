import Link from "next/link";
import { Heading } from "@/components/typography";
import { CSS, styled, theme } from "@/styles/stitches.config";
import { CustomerChip } from "@/components/data-display";
import { LinkButton } from "@/components/form";
import { Skeleton } from "@/components/feedback";
import type { Customer } from "@/types";

interface RecentCostumersProps {
  costumersData: Customer[] | undefined;
  isLoading: boolean;
  css?: CSS;
}
export const RecentCostumers = ({
  costumersData,
  isLoading,
  css,
}: RecentCostumersProps) => {
  return (
    <RecentCostumersContainer css={css}>
      <Header>
        <Heading sType={"4"}>Recent Customers</Heading>

        <LinkButton label="View All" href="/app/costumers" />
      </Header>

      <Content>
        {costumersData?.map(({ id, name, email, image }) => (
          <Link href={`/app/costumers/${id}`} key={id}>
            <a style={{ color: "unset", textDecoration: "none" }}>
              <CustomerChip name={name} email={email} image={image} />
            </a>
          </Link>
        ))}

        {isLoading && !costumersData
          ? Array(6)
              .fill({})
              .map((item, index) => <Skeleton height="5rem" key={index} />)
          : null}
      </Content>
    </RecentCostumersContainer>
  );
};

const RecentCostumersContainer = styled("div", {
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
  display: "flex",
  flexDirection: "column",
  gap: "0.35rem",

  borderRadius: theme.radii.md,
  _border: "All",
  borderColor: theme.colors.background3,
});