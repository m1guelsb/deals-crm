import { useEffect, useRef, useState } from "react";
import { useDatePickerState } from "@react-stately/datepicker";
import { useDatePicker } from "@react-aria/datepicker";
import { Calendar } from "./Calendar";
import { BasePopover, Arrow } from "@/components/overlay/popovers/BasePopover";
import { styled, theme } from "@/styles/stitches.config";
import { Content as PopoverContent } from "@radix-ui/react-popover";
import { DateField } from "./DateField";
import { calendar } from "@/assets/icons";
import { Icon } from "@/components/media";

export function Picker(props) {
  let state = useDatePickerState(props);
  let ref = useRef();
  let {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker(props, state, ref);

  const [open, setOpenChange] = useState(false);

  useEffect(() => {
    setOpenChange(false);
  }, [props.value]);

  return (
    <DatePickerContainer aria-label="picker">
      <Label {...labelProps}>Due Date</Label>
      <DateInputsContainer {...groupProps} ref={ref}>
        <BasePopover
          open={open}
          onOpenChange={setOpenChange}
          {...dialogProps}
          trigger={
            <PickButton>
              <DateFieldContainer>
                <DateField {...fieldProps} />
              </DateFieldContainer>

              <FieldButton {...buttonProps}>
                <Icon src={calendar.src} />
              </FieldButton>
            </PickButton>
          }
        >
          <Content>
            <Calendar {...calendarProps} />

            <Arrow />
          </Content>
        </BasePopover>
      </DateInputsContainer>
    </DatePickerContainer>
  );
}

const PickButton = styled("button", {
  all: "unset",
  display: "flex",
  cursor: "pointer",
});
const FieldButton = styled("span", {
  width: "3rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  backgroundColor: theme.colors.primary,
  borderTopRightRadius: theme.radii.md,
  borderBottomRightRadius: theme.radii.md,

  cursor: "pointer",
});
const DateFieldContainer = styled("div", {
  height: "3rem",
  width: "11.7rem",
  display: "flex",
  alignItems: "center",
  backgroundColor: theme.colors.background3,

  _paddingX: "0.8rem",

  borderTopLeftRadius: theme.radii.md,
  borderBottomLeftRadius: theme.radii.md,
});
const DatePickerContainer = styled("div", {
  position: "relative",
  display: "inline-flex",
  flexDirection: "column",
  textAlign: "left",
});
const DateInputsContainer = styled("div", {
  display: "flex",
});

export const Content = styled(PopoverContent, {
  height: "fit-content",

  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",

  backgroundColor: theme.colors.background1,

  borderRadius: theme.radii.md,
  _border: "All",
  borderColor: theme.colors.primary,

  "@media (prefers-reduced-motion: no-preference)": {
    animationDuration: "400ms",
    animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    willChange: "transform, opacity",
  },
});
export const Label = styled("span", {
  color: theme.colors.text1,
  marginBottom: "0.25rem",

  variants: {
    sSize: {
      medium: {
        fontSize: theme.fontSizes.md,
      },
    },
  },
  defaultVariants: {
    sSize: "medium",
  },
});
