import { styled, theme } from "@/styles/stitches.config";
import { Avatar } from "@/components/data-display";

interface CostumerChipProps {
  name: string;
  email: string;
  image: string;
}

export const CustomerChip = ({ name, email, image }: CostumerChipProps) => {
  return (
    <ChipContainer>
      <ImageBox>
        <Avatar role={"img"} imageSrc={image} username={name} />
      </ImageBox>

      <TextBox>
        <Title>{name}</Title>
        <Description>{email}</Description>
      </TextBox>
    </ChipContainer>
  );
};

const ChipContainer = styled("span", {
  height: "5rem",
  display: "flex",
  alignItems: "center",
  gap: "1rem",

  cursor: "pointer",

  borderRadius: theme.radii.md,

  _paddingX: "1rem",

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
