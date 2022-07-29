import Link from "next/link";
import { Heading } from "@/components/typography";
import { CSS, styled, theme } from "@/styles/stitches.config";
import { Costumer } from "@/types/Costumer";
import { Chip } from "@/components/data-display";
import { LinkButton } from "@/components/form";

interface LastCostumersProps {
  costumersData: Costumer[] | undefined;
  css?: CSS;
}
export const LastCostumers = ({ costumersData, css }: LastCostumersProps) => {
  return (
    <LastCostumersContainer css={css}>
      <Header>
        <Heading sType={"4"}>Recent Customers</Heading>

        <LinkButton label="View All" href="/app/costumers" />
      </Header>

      <Content>
        {costumersData?.map(({ id, name, email, image }) => (
          <Link href={`/app/costumers/${id}`} key={id}>
            <a style={{ color: "unset", textDecoration: "none" }}>
              <Chip title={name} description={email} imageSrc={image} />
            </a>
          </Link>
        ))}
      </Content>
    </LastCostumersContainer>
  );
};

const LastCostumersContainer = styled("div", {
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
