import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import { Button } from "./Button";
import { Icon } from "@/components/media";
import { error } from "@/assets/icons";

describe("Button component", () => {
  it("should render correctly", () => {
    render(<Button>Test Button</Button>);

    expect(
      screen.getByRole("button", { name: /Test Button/i })
    ).toBeInTheDocument();
  });

  it("should render with left icon", () => {
    render(
      <Button leftIcon={<Icon role={"img"} src={error.src} />}>
        Test Button
      </Button>
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("should render with right icon", () => {
    render(
      <Button rightIcon={<Icon role={"img"} src={error.src} />}>
        Test Button
      </Button>
    );

    expect(screen.getByRole("img")).toBeInTheDocument();
  });
});
