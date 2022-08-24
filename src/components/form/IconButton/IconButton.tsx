/* eslint-disable react/display-name */
import { Icon } from "@/components/media";
import { CSS, styled, theme, VariantProps } from "@/styles/stitches.config";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface IconButtonProps
  extends VariantProps<typeof S_IconButton>,
    ButtonHTMLAttributes<HTMLButtonElement> {
  iconSrc: string;
  css?: CSS;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ iconSrc, sType, ...props }, ref) => {
    return (
      <S_IconButton ref={ref} sType={sType} {...props}>
        <Icon sType={sType} src={iconSrc} />
      </S_IconButton>
    );
  }
);

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
      tertiary: {
        "backgroundColor": "transparent",
        "color": theme.colors.error,

        "&:hover": {
          backgroundColor: theme.colors.background2,
        },
      },
    },
    sSize: {
      small: {
        height: "2.5rem",
        width: "2.5rem",
      },
      medium: {
        height: "3rem",
        width: "3rem",
      },
    },
  },

  "defaultVariants": {
    sType: "primary",
    sSize: "medium",
  },
});
