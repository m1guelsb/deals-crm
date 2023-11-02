import { useCalendarGrid } from "@react-aria/calendar";
import { getWeeksInMonth } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { CalendarCell } from "./CalendarCell";

export function CalendarGrid({ state, ...props }) {
  let { locale } = useLocale();
  let { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);

  // Get the number of weeks in the month so we can render the proper number of rows.
  let weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <table {...gridProps} cellPadding="0" style={{ flex: 1 }}>
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <th style={{ textAlign: "center" }} key={`${index}-${day}`}>
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell
                    key={`${i}-${date}`}
                    state={state}
                    date={date}
                  />
                ) : (
                  <td key={`${i}-${date}`} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
