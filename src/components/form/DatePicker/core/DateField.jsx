import { useRef } from "react";
import { useLocale } from "@react-aria/i18n";
import { useDateFieldState } from "@react-stately/datepicker";
import { useDateField, useDateSegment } from "@react-aria/datepicker";
import { createCalendar } from "@internationalized/date";
import { styled, theme } from "@/styles/stitches.config";

export function DateField(props) {
  let { locale } = useLocale();
  let state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  let ref = useRef();

  return (
    <div ref={ref} style={{ display: "flex" }}>
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </div>
  );
}

function DateSegment({ segment, state }) {
  return (
    <DateSegmentContainer>
      {segment.isPlaceholder ? "" : segment.text}
    </DateSegmentContainer>
  );
}

const DateSegmentContainer = styled("div", {
  width: "1.3rem",

  color: theme.colors.text1,
  _paddingX: "0.2rem",
  textAlign: "center",
  boxSizing: "content-box",
  outlineColor: theme.colors.primary,
  borderRadius: theme.radii.sm,
});
