import React from "react";
import { render } from "@testing-library/react";
import { Avatar } from "./Avatar";
import { email } from "@/assets/icons";

describe("Avatar component", () => {
  it("should render correctly", () => {
    const { getByPlaceholderText } = render(
      <Avatar placeholder="avatar" imageSrc={email.src} username={"name"} />
    );

    const avatarEl = getByPlaceholderText("avatar");

    expect(avatarEl).toBeInTheDocument();
  });

});
