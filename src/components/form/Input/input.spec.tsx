import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { Input } from "./Input";
import { Icon } from "@/components/media";
import { error } from "@/assets/icons";

describe("Input component", () => {
  it("should render correctly", () => {
    render(<Input placeholder="Test Input" />);

    expect(screen.getByPlaceholderText("Test Input")).toBeInTheDocument();
  });

  it("should render with label", () => {
    render(<Input placeholder="Test Input" label="Test Label" />);

    expect(screen.getByPlaceholderText("Test Input")).toBeInTheDocument();
  });

  it("should render with error", () => {
    render(<Input placeholder="Test Input" errorMessage="Test Error" />);

    expect(screen.getByPlaceholderText("Test Input")).toBeInTheDocument();
  });

  it("should render with left icon", () => {
    render(
      <Input
        placeholder="Test Input"
        leftIcon={<Icon role={"img"} src={error.src} />}
      />
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("should render with right icon", () => {
    render(
      <Input
        placeholder="Test Input"
        rightIcon={<Icon role={"img"} src={error.src} />}
      />
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
