import { useRef } from "react";
import { useCalendarState } from "@react-stately/calendar";
import { useCalendar } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { createCalendar } from "@internationalized/date";
import { CalendarGrid } from "./CalendarGrid";
import { styled } from "@/styles/stitches.config";
import { CalendarButton } from "./CalendarButton";

export function Calendar(props) {
  let { locale } = useLocale();
  let state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  let ref = useRef();
  let { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
    props,
    state,
    ref
  );

  return (
    <CalendarContainer {...calendarProps} ref={ref}>
      <CalendarHeader>
        <h3>{title}</h3>

        <CalendarButtons>
          <CalendarButton {...prevButtonProps}>{"<"}</CalendarButton>

          <CalendarButton {...nextButtonProps}>{">"}</CalendarButton>
        </CalendarButtons>
      </CalendarHeader>
      <CalendarGrid state={state} />
    </CalendarContainer>
  );
}

const CalendarContainer = styled("div", {
  display: "inline-block",
  color: "$text1",
  padding: "0.75rem",
});
const CalendarHeader = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBottom: "0.5rem",
});
const CalendarButtons = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});
