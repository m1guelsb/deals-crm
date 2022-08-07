import { keyframes, styled, theme } from "@/styles/stitches.config";

const skeletonAnim = keyframes({
  "0%": {
    backgroundPosition: "0% 50%",
  },
  "100%": {
    backgroundPosition: "200% 50%",
  },
});
const SkeletonEl = styled("div", {
  borderRadius: theme.radii.md,
  backgroundImage: `linear-gradient(to right, ${theme.colors.background3}, ${theme.colors.background2},${theme.colors.background1},${theme.colors.background2}, ${theme.colors.background3})`,
  backgroundSize: "200% 100%",
  animation: `${skeletonAnim}  0.8s ease-out infinite`,
});

interface SkeletonProps {
  height?: string;
  width?: string;
}

export const Skeleton = ({
  height = "3rem",
  width = "100%",
}: SkeletonProps) => {
  return <SkeletonEl css={{ height: height, width: width }} />;
};
