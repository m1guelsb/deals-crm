import React from "react";
import { getByRole, render } from "@testing-library/react";
import { Card } from "./Card";
import { dollar, email } from "@/assets/icons";

describe("Card component", () => {
  it("should render correctly", () => {
    const { getByText } = render(
      <Card title="Card title" value={"Card value"} iconSrc={dollar.src} />
    );

    const cardEl = getByText("Card title");

    expect(cardEl).toBeInTheDocument();
  });

  it("should have a title", () => {
    const { getByText } = render(
      <Card title="Card title" value={"Card value"} iconSrc={dollar.src} />
    );

    const cardEl = getByText("Card title");

    expect(cardEl).toBeInTheDocument();
  });

  it("should have a value", () => {
    const { getByText } = render(
      <Card title="Card title" value={"Card value"} iconSrc={dollar.src} />
    );

    const cardEl = getByText("Card value");

    expect(cardEl).toBeInTheDocument();
  });
});
