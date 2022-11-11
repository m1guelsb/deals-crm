import { useRef } from "react";
import { useButton } from "@react-aria/button";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { styled, theme } from "@/styles/stitches.config";

export function CalendarButton(props) {
  let ref = useRef();
  let { buttonProps } = useButton(props, ref);
  return (
    <CallenButton
      {...props}
      {...mergeProps(buttonProps)}
      ref={ref}
      css={{
        backgroundColor: props.isDisabled ? theme.colors.background2 : "",
      }}
    >
      {props.children}
    </CallenButton>
  );
}

const CallenButton = styled("button", {
  all: "unset",
  width: "1.5rem",
  height: "1.5rem",
  _alignCenter: true,

  backgroundColor: theme.colors.primary,

  borderRadius: "50%",

  cursor: "pointer",

  fontSize: theme.fontSizes.lg,
});
