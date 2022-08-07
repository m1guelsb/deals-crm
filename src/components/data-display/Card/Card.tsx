import { styled, theme } from "@/styles/stitches.config";
import { Icon } from "@/components/media";
import { Heading } from "@/components/typography";
import { Skeleton } from "@/components/feedback";

interface CardProps {
  title: string;
  value: string | undefined;
  iconSrc: string;
}
export const Card = ({ title, value, iconSrc }: CardProps) => {
  return (
    <CardContainer>
      <TextBox>
        <Title title={title}>{title}</Title>

        <Heading as={"h2"} sType={"3"} title={value} css={{ width: "100%" }}>
          {value ? value : <Skeleton />}
        </Heading>
      </TextBox>

      <IconBox>
        <Icon
          css={{ "& svg": { height: "3rem", width: "3rem" } }}
          src={iconSrc}
        />
      </IconBox>
    </CardContainer>
  );
};

const IconBox = styled("div", {
  height: "5rem",
  width: "5rem",

  _alignCenter: true,
  borderRadius: "50%",
  padding: "1rem",
  opacity: "0.5",
});
const CardContainer = styled("div", {
  "height": "10rem",
  "maxWidth": "22rem",

  "flex": "1",

  "display": "flex",
  "alignItems": "center",
  "justifyContent": "space-between",
  "gap": "0.25rem",

  "padding": "1.5rem",

  "backgroundColor": theme.colors.background2,

  "borderRadius": theme.radii.md,

  "&:nth-child(1)": {
    [`& ${IconBox}`]: {
      backgroundColor: theme.colors.success,
      _iconColor: { fill: theme.colors.background2 },
    },
  },

  "&:nth-child(2)": {
    [`& ${IconBox}`]: {
      backgroundColor: theme.colors.info,
      _iconColor: { fill: theme.colors.background2 },
    },
  },

  "&:nth-child(3)": {
    [`& ${IconBox}`]: {
      backgroundColor: theme.colors.error,
      _iconColor: { fill: theme.colors.background3 },
    },
  },
});

const TextBox = styled("div", {
  _truncate: true,
});
const Title = styled("h5", {
  fontSize: theme.fontSizes.md,
  fontWeight: theme.fontWeights.bold,
});
