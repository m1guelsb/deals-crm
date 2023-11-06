import { styled, theme } from "@/styles/stitches.config";

interface DealStatusTagProps {
  status: "CLOSED" | "IN_PROGRESS" | undefined;
}
export const DealStatusTag = (props: DealStatusTagProps) => {
  return (
    <StatusTag status={props.status ?? "CLOSED"}>
      {props?.status === "CLOSED" ? "Closed" : "In Progress"}
    </StatusTag>
  );
};

const StatusTag = styled("span", {
  _alignCenter: true,

  width: "8rem",
  paddingY: "0.3rem",

  fontWeight: theme.fontWeights.bold,

  borderRadius: theme.radii.md,

  variants: {
    status: {
      IN_PROGRESS: {
        color: theme.colors.text1,
        backgroundColor: theme.colors.primary,
      },
      CLOSED: {
        color: theme.colors.text2,
        backgroundColor: theme.colors.background3,
      },
    },
  },
});
