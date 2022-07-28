import Link from "next/link";
import { Heading } from "@/components/typography";
import { styled, theme } from "@/styles/stitches.config";
import { Costumer } from "@/types/Costumer";
import { Chip } from "@/components/data-display";

interface LastCostumersProps {
  costumersData: Costumer[] | undefined;
}
export const LastCostumers = ({ costumersData }: LastCostumersProps) => {
  return (
    <LastCostumersContainer>
      <Header>
        <Heading sType={"4"}>Recent Customers</Heading>

        <Link href={"/app/customers"} passHref>
          <LinkButton>See All</LinkButton>
        </Link>
      </Header>

      <Content>
        {costumersData?.map(({ id, name, email }) => (
          <Chip key={id} title={name} description={email} />
        ))}
      </Content>
    </LastCostumersContainer>
  );
};

const LastCostumersContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",

  borderRadius: theme.radii.md,

  gridArea: "side",
});

const Header = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const Content = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const LinkButton = styled("a", {
  color: theme.colors.text2,
  cursor: "pointer",
  textDecoration: "underline",
});
