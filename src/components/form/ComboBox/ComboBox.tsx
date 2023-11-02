import { useEffect, useState } from "react";
import { useCombobox } from "downshift";
import { styled, theme } from "@/styles/stitches.config";
import { Input } from "@/components/form";
import { CSS } from "@stitches/react";
import { Icon } from "@/components/media";
import { getComboboxOptions } from "@/utils/functions";
import { Spinner } from "@/components/feedback";
import { closeCircle, search } from "@/assets/icons";

interface OptionType {
  label?: string;
  value: number | string;
}

interface ComboboxProps {
  label?: string;
  placeholder?: string;
  searchUrl: string;
  errorMessage?: string;
  value?: OptionType;
  onChange?: (selectedOption: OptionType | null | undefined) => void;
  css?: CSS;
}
export const ComboBox = ({
  label,
  placeholder,
  searchUrl,
  errorMessage,
  value,
  onChange,
  css,
}: ComboboxProps) => {
  const [options, setOptions] = useState<OptionType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getComboboxOptions(searchUrl, "").then((options) => setOptions(options));
  }, [searchUrl]);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    inputValue,
    closeMenu,
    selectedItem,
    selectItem,
  } = useCombobox({
    id: "combo-box",
    onInputValueChange({ inputValue }) {
      if (inputValue) {
        setLoading(true);

        getComboboxOptions(searchUrl, inputValue)
          .then((options) => setOptions(options))
          .finally(() => setLoading(false));
      }
      if (inputValue?.length === 0) {
        onChange?.({ label: "", value: "" });
        closeMenu();
      }
    },
    items: options,
    defaultSelectedItem: value,
    itemToString(item) {
      return item?.label ?? "";
    },
    onSelectedItemChange({ selectedItem }) {
      onChange?.(selectedItem);
    },
  });

  const hasResults =
    isOpen && inputValue && options.length === 0 ? false : true;

  return (
    <Container style={{ position: "relative" }} css={css}>
      <div {...getComboboxProps()}>
        <Input
          {...getInputProps()}
          label={label}
          placeholder={placeholder}
          errorMessage={`${
            !hasResults
              ? "No results found, add a Customer first"
              : errorMessage ?? ""
          }`}
          rightIcon={
            loading ? (
              <Spinner sType={"secondary"} />
            ) : selectedItem?.label ? (
              <Icon
                title="Clear"
                css={{ cursor: "pointer" }}
                onClick={() => {
                  selectItem({ label: "", value: "" });
                }}
                src={closeCircle.src}
              />
            ) : (
              <Icon src={search.src} />
            )
          }
          css={{
            outlineColor: isOpen ? theme.colors.primary : "transparent",
            borderBottomRightRadius: isOpen ? "0" : theme.radii.md,
            borderBottomLeftRadius: isOpen ? "0" : theme.radii.md,
          }}
        />
      </div>
      <Content
        css={{
          width: "100%",
          visibility: isOpen && hasResults ? "visible" : "hidden",
        }}
        {...getMenuProps()}
      >
        {isOpen && hasResults
          ? options.map((option, index) => (
              <Item
                key={`${option.value}${index}`}
                {...getItemProps({ item: option, index })}
              >
                {option.label}
              </Item>
            ))
          : null}
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

  outlineColor: theme.colors.primary,
  outlineStyle: "solid",
  outlineWidth: "0.1rem",

  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
});

const Item = styled("li", {
  minHeight: "3rem",
  display: "flex",
  alignItems: "center",

  _paddingX: "1rem",

  cursor: "pointer",

  "&:hover": {
    backgroundColor: theme.colors.background2,
  },
});
