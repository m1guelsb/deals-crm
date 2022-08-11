import { styled, theme } from "@/styles/stitches.config";
import { useSelect } from "downshift";
import { Icon } from "@/components/media";
import { arrowDown, arrowUp } from "@/assets/icons";

export interface OptionType {
  label: string;
  value: number | string | boolean;
}
interface SelectProps {
  options: OptionType[];
  label: string;
  errorMessage?: string;
  defaultSelected?: OptionType;
  value?: OptionType;
  onChange?: (selectedOptionValue: OptionType | null | undefined) => void;
  notRequired?: boolean;
}

export const Select = ({
  options,
  label,
  errorMessage,
  value,
  onChange,
  notRequired,
}: SelectProps) => {
  const optionsWithNone = [{ label: "None", value: "" }, ...options];

  const optionsList = notRequired ? optionsWithNone : options;

  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
  } = useSelect({
    id: "select-component",
    items: optionsList,
    itemToString(item) {
      return item?.label || "";
    },
    defaultSelectedItem: value,

    onSelectedItemChange(changes) {
      onChange?.(changes.selectedItem);
    },
  });

  return (
    <Container>
      <TriggerWrapper>
        <Label {...getLabelProps()}>{label}</Label>

        <SelectButton
          aria-label="toggle menu"
          type="button"
          {...getToggleButtonProps()}
          css={{
            _border: "All",
            borderColor: isOpen ? theme.colors.primary : "transparent",
            borderBottomRightRadius: isOpen ? "0" : theme.radii.md,
            borderBottomLeftRadius: isOpen ? "0" : theme.radii.md,
          }}
        >
          <span>{selectedItem ? selectedItem.label : "Select"}</span>

          <Icon sSize={"small"} src={isOpen ? arrowUp.src : arrowDown.src} />
        </SelectButton>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </TriggerWrapper>

      <Content
        {...getMenuProps()}
        css={{
          width: "100%",
          visibility: isOpen ? "visible" : "hidden",
        }}
      >
        {isOpen &&
          optionsList.map((item, index) => (
            <Item
              key={`${item.value}${index}`}
              {...getItemProps({ item, index })}
            >
              {item.label}
            </Item>
          ))}
      </Content>
    </Container>
  );
};

const Container = styled("div", {
  position: "relative",
});
const Content = styled("ul", {
  maxHeight: "15rem",

  position: "absolute",
  overflow: "auto",
  zIndex: "5",

  backgroundColor: theme.colors.background3,
  borderBottomLeftRadius: theme.radii.sm,
  borderBottomRightRadius: theme.radii.sm,

  _border: "All",
  borderColor: theme.colors.primary,
  borderTop: "none",

  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
});

const TriggerWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",

  gap: "0.25rem",
});
const SelectButton = styled("button", {
  border: "none",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  cursor: "pointer",

  height: "3rem",
  _paddingX: "1rem",
  borderRadius: theme.radii.md,

  color: theme.colors.text1,
  backgroundColor: theme.colors.background3,
});

const Label = styled("label", {});
const Item = styled("li", {
  "minHeight": "3rem",
  "display": "flex",
  "alignItems": "center",

  "_paddingX": "1rem",

  "cursor": "pointer",

  "&:hover": {
    backgroundColor: theme.colors.background2,
  },
});

const ErrorMessage = styled("span", {
  height: "1rem",
  display: "flex",
  alignItems: "flex-end",

  color: theme.colors.error,

  fontSize: theme.fontSizes.xs,
  _truncate: true,
});
