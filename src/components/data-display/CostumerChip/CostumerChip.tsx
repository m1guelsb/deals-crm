import { styled, theme } from "@/styles/stitches.config";
import { Avatar } from "@/components/data-display";
import type { Costumer } from "@/types";

interface CostumerChipProps extends Omit<Costumer, "id" | "phone"> {}

export const CostumerChip = ({ name, email, image }: CostumerChipProps) => {
  return (
    <ChipContainer>
      <ImageBox>
        <Avatar imageSrc={image} username={name} />
      </ImageBox>

      <TextBox>
        <Title>{name}</Title>
        <Description>{email}</Description>
      </TextBox>
    </ChipContainer>
  );
};

const ChipContainer = styled("span", {
  "height": "5rem",
  "display": "flex",
  "alignItems": "center",
  "gap": "1rem",

  "borderRadius": theme.radii.md,

  "_paddingX": "1rem",

  "&:hover": {
    backgroundColor: theme.colors.background3,
  },
});

const ImageBox = styled("span", {
  width: "fit-content",
});
const TextBox = styled("span", {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  _truncate: true,
});
const Title = styled("h4", {
  fontSize: theme.fontSizes.lg,
});
const Description = styled("span", {
  fontSize: theme.fontSizes.md,
  color: theme.colors.text2,
});
