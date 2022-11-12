import * as C from "@radix-ui/react-checkbox";
import { Icon } from "@/components/media";
import { completed } from "@/assets/icons";
import { CSS, styled, theme } from "@/styles/stitches.config";

interface CheckboxProps {
  value: boolean;
  onChange: () => void;
  css?: CSS;
}

export const Checkbox = ({ value, onChange, css }: CheckboxProps) => (
  <form>
    <CheckboxContainer css={css}>
      <Label htmlFor="c1">Is completed?</Label>

      <CheckboxRoot
        checked={value}
        onCheckedChange={onChange}
        id="c1"
        css={{
          backgroundColor: value ? theme.colors.primary : theme.colors.text1,
        }}
      >
        <CheckboxIndicator
          css={{
            color: value ? theme.colors.text1 : theme.colors.primary,
          }}
        >
          ✖
        </CheckboxIndicator>
      </CheckboxRoot>
    </CheckboxContainer>
  </form>
);

const CheckboxContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  alignSelf: "center",
});
const CheckboxRoot = styled(C.Root, {
  "all": "unset",
  "backgroundColor": theme.colors.text1,
  "width": "1.7rem",
  "height": "1.7rem",
  "borderRadius": theme.radii.sm,

  "_alignCenter": true,
  "&:focus": { boxShadow: theme.colors.primary },

  "_border": "All",
  "borderColor": theme.colors.primary,

  "cursor": "pointer",
});

const CheckboxIndicator = styled(C.Indicator, {
  // width: "1.6rem",
  // height: "1.6rem",
  // borderRadius: "0.4rem",

  // backgroundColor: theme.colors.primary,

  fontSize: theme.fontSizes.lg,
  color: theme.colors.primary,
});

const Label = styled("label", {
  fontSize: theme.fontSizes.lg,
  userSelect: "none",
});
