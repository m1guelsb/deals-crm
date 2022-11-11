import { useRef } from "react";
import { useCalendarCell } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { isSameDay, getDayOfWeek } from "@internationalized/date";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { styled, theme } from "@/styles/stitches.config";

export function CalendarCell({ state, date }) {
  let ref = useRef();
  let {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    formattedDate,
    isInvalid,
  } = useCalendarCell({ date }, state, ref);
  let { locale } = useLocale();
  let { focusProps, isFocusVisible } = useFocusRing();

  return (
    <td
      {...cellProps}
      style={{
        position: "relative",
        zIndex: isFocusVisible ? "10" : "0",
      }}
    >
      <DateContainer
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideVisibleRange}
        disabled={isDisabled}
        css={{
          backgroundColor: isSelected
            ? isInvalid
              ? theme.colors.error
              : theme.colors.primary
            : "",
        }}
      >
        <InnerDate
          css={{
            "color":
              isDisabled && !isInvalid
                ? theme.colors.text3
                : theme.colors.text1,
            "backgroundColor":
              !isSelected && !isDisabled ? theme.colors.background2 : "",
            "&:hover": {
              backgroundColor:
                !isSelected && !isDisabled ? theme.colors.background3 : "",
            },
          }}
        >
          {formattedDate}
        </InnerDate>
      </DateContainer>
    </td>
  );
}

const DateContainer = styled("button", {
  all: "unset",
  width: "2.3rem",
  height: "2.3rem",

  borderRadius: "50%",
});

const InnerDate = styled("div", {
  width: "100%",
  height: "100%",
  borderRadius: "50%",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
