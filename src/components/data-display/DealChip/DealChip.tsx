import { styled, theme } from "@/styles/stitches.config";
import type { Deal } from "@/types";
import { DealStatusTag } from "../DealStatusTag/DealStatusTag";
import { currencyMask } from "@/utils/masks/currencyMask";

interface DealChipProps extends Omit<Deal, "id" | "customer"> {}

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
        <Price>{currencyMask(price.toString())}</Price>
        <DealStatusTag status={status} />
      </RightBox>
    </ChipContainer>
  );
};

const ChipContainer = styled("span", {
  height: "5.5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "1rem",

  cursor: "pointer",

  borderRadius: theme.radii.md,
  backgroundColor: theme.colors.background2,

  _paddingX: "1rem",

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
  width: "13rem",
  textAlign: "right",
  alignItems: "end",
  flexDirection: "column",
  gap: "0.5rem",
  _truncate: true,
});
const Title = styled("h4", {
  fontSize: theme.fontSizes.lg,
});
const Price = styled("span", {});
const Description = styled("span", {
  width: "100%",
  _truncate: true,
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
