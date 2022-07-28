import { styled, theme } from "@/styles/stitches.config";
import { Avatar } from "../Avatar/Avatar";

interface ChipProps {
  title: string;
  description: string;
  imageSrc: string;
}
export const Chip = ({ title, description, imageSrc }: ChipProps) => {
  return (
    <ChipContainer>
      <ImageBox>
        <Avatar imageSrc={imageSrc} username={title} />
      </ImageBox>

      <TextBox>
        <Title>{title}</Title>
        <Description>{description}</Description>
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
  "backgroundColor": theme.colors.background2,

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
