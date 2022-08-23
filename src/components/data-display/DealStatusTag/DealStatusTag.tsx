import { styled, theme } from "@/styles/stitches.config";

interface DealStatusTagProps {
  status: "Closed" | "In Progress";
}
export const DealStatusTag = ({ status }: DealStatusTagProps) => {
  return (
    <StatusTag status={status === "Closed" ? "closed" : "inProgress"}>
      {status?.toUpperCase()}
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
      inProgress: {
        color: theme.colors.text1,
        backgroundColor: theme.colors.primary,
      },
      closed: {
        color: theme.colors.text2,
        backgroundColor: theme.colors.background3,
      },
    },
  },
});
