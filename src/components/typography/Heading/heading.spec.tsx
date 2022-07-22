import { render, screen } from "@testing-library/react";
import { Heading } from "./Heading";

describe("Heading component", () => {
  it("should render correctly", () => {
    render(<Heading>Test Heading</Heading>);

    expect(screen.getByText(/Test Heading/i)).toBeInTheDocument();
  });
});
