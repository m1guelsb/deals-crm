import { styled, theme } from "@/styles/stitches.config";
import { sliceAcronym } from "@/utils/functions";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

interface AvatarProps extends AvatarPrimitive.AvatarProps {
  imageSrc: string;
  username: string | undefined;
  sSize?: "sm" | "md" | "lg";
}
export const Avatar = ({
  imageSrc,
  username,
  sSize,
  ...props
}: AvatarProps) => (
  <AvatarContainer sSize={sSize} title={username} {...props}>
    <Image src={imageSrc} alt={username} />
    <Fallback>{sliceAcronym(username)}</Fallback>
  </AvatarContainer>
);

const AvatarContainer = styled(AvatarPrimitive.Root, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "100%",

  overflow: "hidden",
  userSelect: "none",

  defaultVariants: {
    sSize: "md",
  },

  variants: {
    sSize: {
      sm: {
        height: "1.5rem",
        width: "1.5rem",
        fontSize: theme.fontSizes.md,
      },
      md: {
        height: "3rem",
        width: "3rem",
        fontSize: theme.fontSizes.lg,
      },
      lg: {
        height: "5rem",
        width: "5rem",
        fontSize: theme.fontSizes["2xl"],
      },
    },
  },
});

const Image = styled(AvatarPrimitive.Image, {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: "inherit",
});

const Fallback = styled(AvatarPrimitive.Fallback, {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: theme.colors.text1,

  color: theme.colors.primary,
  fontWeight: theme.fontWeights.medium,
});
