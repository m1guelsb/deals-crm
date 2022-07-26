import { Icon } from "@/components/media";
import { CSS, styled, theme, VariantProps } from "@/styles/stitches.config";

interface IconButton extends VariantProps<typeof S_IconButton> {
  iconSrc: string;
  css?: CSS;
}
export const IconButton = ({ iconSrc, sType, ...props }: IconButton) => {
  return (
    <S_IconButton sType={sType} {...props}>
      <Icon sType={sType} src={iconSrc} />
    </S_IconButton>
  );
};

const S_IconButton = styled("button", {
  "width": "fit-content",

  "borderRadius": "50%",

  "_alignCenter": true,

  "border": "none",

  "cursor": "pointer",
  "userSelect": "none",

  "transition": "ease .15s",

  "&:hover": {
    filter: "brightness(1.3)",
  },
  "&:active": {
    filter: "brightness(1)",
  },

  "&[disabled]": {
    filter: "brightness(0.5)",
    pointerEvents: "none",
  },

  "variants": {
    sType: {
      primary: {
        backgroundColor: theme.colors.primary,
      },

      secondary: {
        backgroundColor: theme.colors.text1,
      },
    },
    sSize: {
      medium: {
        height: "3rem",
        width: "3rem",
        gap: "0.5rem",
        padding: "1.5rem",
      },
    },
  },

  "defaultVariants": {
    sType: "primary",
    sSize: "medium",
  },
});
