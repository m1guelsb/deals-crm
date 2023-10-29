import { render } from "@testing-library/react";
import { DealChip } from "./DealChip";

describe("DealChip component", () => {
  it("should render correctly", () => {
    const { getByText } = render(
      <DealChip
        title="deal title"
        customerId="1"
        description="deal description"
        price="deal price"
        status={{ label: "In Progress", value: "1" }}
      />
    );

    const Element = getByText("deal title");

    expect(Element).toBeInTheDocument();
  });

  it("should have title", () => {
    const { getByText } = render(
      <DealChip
        title="deal title"
        customerId="1"
        description="deal description"
        price="deal price"
        status={{ label: "In Progress", value: "1" }}
      />
    );

    const Element = getByText("deal title");

    expect(Element).toBeInTheDocument();
  });

  it("should have description", () => {
    const { getByText } = render(
      <DealChip
        title="deal title"
        customerId="1"
        description="deal description"
        price="deal price"
        status={{ label: "In Progress", value: "1" }}
      />
    );

    const Element = getByText("deal description");

    expect(Element).toBeInTheDocument();
  });

  it("should have price", () => {
    const { getByText } = render(
      <DealChip
        title="deal title"
        customerId="1"
        description="deal description"
        price="69.55"
        status={{ label: "In Progress", value: "1" }}
      />
    );

    const Element = getByText("69.55");

    expect(Element).toBeInTheDocument();
  });

  it("should have price", () => {
    const { getByText } = render(
      <DealChip
        title="deal title"
        customerId="1"
        description="deal description"
        price="69.55"
        status={{ label: "In Progress", value: "1" }}
      />
    );

    const Element = getByText("69.55");

    expect(Element).toBeInTheDocument();
  });
});
