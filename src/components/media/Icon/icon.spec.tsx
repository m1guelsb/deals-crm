import { render, screen } from "@testing-library/react";
import { Icon } from "@/components/media";
import { error } from "@/assets/icons";

describe("Icon component", () => {
  it("should render correctly", () => {
    render(<Icon role={"figure"} src={error.src} />);

    expect(screen.getByRole("figure")).toBeInTheDocument();
  });
});
