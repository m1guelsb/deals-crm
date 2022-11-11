import { Icon } from "@/components/media";
import { styled } from "@/styles/stitches.config";
import React from "react";

interface NoDataProps {
  icon?: string;
  message: string;
  alignY?: boolean;
}

export const NoData = ({ icon, message, alignY }: NoDataProps) => {
  return (
    <NoDataContainer css={{ margin: alignY ? "auto 0" : "" }}>
      {icon && <Icon src={icon} />}
      <p>{message}</p>
    </NoDataContainer>
  );
};

const NoDataContainer = styled("span", {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",

  placeSelf: "center",
});
