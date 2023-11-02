import { Picker } from "./core/Picker";
import { today, getLocalTimeZone, parseDate } from "@internationalized/date";
import { useState } from "react";
import { ErrorMessage } from "../Input/input.styles";
import { styled } from "@/styles/stitches.config";

interface DatePickerProps {
  value: any;
  onChange: (value: string) => void;
  errorMessage?: string;
}

export const DatePicker = ({
  errorMessage,
  onChange,
  value,
}: DatePickerProps) => {
  const [dateValue, setDateValue] = useState(value);

  const onDatePick = (pickedDate: string) => {
    setDateValue(pickedDate);
    onChange(pickedDate);
  };

  return (
    <DatePickerContainer aria-label="date-picker">
      <Picker
        value={dateValue}
        onChange={(value: string) => onDatePick(value)}
        minValue={today(getLocalTimeZone())}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </DatePickerContainer>
  );
};

const DatePickerContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
});
