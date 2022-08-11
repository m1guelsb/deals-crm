import { styled, theme } from "@/styles/stitches.config";
import type { Deal } from "@/types";

interface DealChipProps extends Omit<Deal, "id"> {}

export const DealChip = ({
  title,
  description,
  price,
  status,
}: DealChipProps) => {
  return (
    <ChipContainer>
      <TextBox>
        <Title>{title}</Title>
        <Description>{description}</Description>
      </TextBox>
      <RightBox>
        <Price>{price}</Price>
        <StatusTag
          status={status.value === "inprogress" ? "inProgress" : "closed"}
        >
          {status.value === "inprogress" ? "IN PROGRESS" : "CLOSED"}
        </StatusTag>
      </RightBox>
    </ChipContainer>
  );
};

const ChipContainer = styled("span", {
  "height": "5.5rem",
  "display": "flex",
  "alignItems": "center",
  "justifyContent": "space-between",
  "gap": "1rem",

  "borderRadius": theme.radii.md,
  "backgroundColor": theme.colors.background2,

  "_paddingX": "1rem",

  "&:hover": {
    backgroundColor: theme.colors.background3,
  },
});

const TextBox = styled("span", {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  _truncate: true,
});
const RightBox = styled("span", {
  display: "flex",
  textAlign: "right",
  flexDirection: "column",
  gap: "0.5rem",
  _truncate: true,
});
const Title = styled("h4", {
  fontSize: theme.fontSizes.lg,
});
const Price = styled("span", {});
const Description = styled("span", {
  fontSize: theme.fontSizes.md,
  color: theme.colors.text2,
});

const StatusTag = styled("span", {
  _alignCenter: true,

  width: "8rem",
  paddingY: "0.3rem",

  fontWeight: theme.fontWeights.bold,

  borderRadius: theme.radii.md,

  variants: {
    status: {
      inProgress: {
        color: theme.colors.text1,
        backgroundColor: theme.colors.primary,
      },
      closed: {
        color: theme.colors.text2,
        backgroundColor: theme.colors.background3,
      },
    },
  },
});
