import React from "react";
import { render } from "@testing-library/react";
import { CustomerChip } from "./CustomerChip";
import { Card } from "../Card/Card";
import { dollar } from "@/assets/icons";

describe("Card component", () => {
  it("should render correctly", () => {
    const { getByText } = render(
      <CustomerChip
        name={"customer name"}
        email={"email@gmail.com"}
        image={"./image"}
      />
    );

    const Element = getByText("customer name");

    expect(Element).toBeInTheDocument();
  });

  it("should have customer name", () => {
    const { getByText } = render(
      <CustomerChip
        name={"customer name"}
        email={"email@gmail.com"}
        image={"./image"}
      />
    );

    const Element = getByText("customer name");

    expect(Element).toBeInTheDocument();
  });

  it("should have customer email", () => {
    const { getByText } = render(
      <CustomerChip
        name={"customer name"}
        email={"email@gmail.com"}
        image={"./image"}
      />
    );

    const Element = getByText("email@gmail.com");

    expect(Element).toBeInTheDocument();
  });

});
