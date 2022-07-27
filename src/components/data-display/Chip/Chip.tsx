import { styled, theme } from "@/styles/stitches.config";

interface ChipProps {
  title: string;
  description: string;
}
export const Chip = ({ title, description }: ChipProps) => {
  return (
    <ChipContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </ChipContainer>
  );
};

const ChipContainer = styled("span", {
  height: "5rem",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",

  borderRadius: theme.radii.md,
  backgroundColor: theme.colors.background2,

  _paddingX: "1rem",
});

const Title = styled("h4", {
  fontSize: theme.fontSizes.lg,
  _truncate: true,
});
const Description = styled("p", {
  fontSize: theme.fontSizes.md,
  color: theme.colors.text2,
  _truncate: true,
});
