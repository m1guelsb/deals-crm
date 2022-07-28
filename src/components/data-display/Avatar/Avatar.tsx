import { styled, theme } from "@/styles/stitches.config";
import { sliceAcronym } from "@/utils/functions/sliceAcronym";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

interface AvatarProps {
  imageSrc: string;
  username: string | undefined;
}
export const Avatar = ({ imageSrc, username }: AvatarProps) => (
  <AvatarContainer title={username}>
    <Image src={imageSrc} alt={username} />
    <Fallback delayMs={200}>{sliceAcronym(username)}</Fallback>
  </AvatarContainer>
);

const AvatarContainer = styled(AvatarPrimitive.Root, {
  width: "3rem",
  height: "3rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "100%",

  overflow: "hidden",
  userSelect: "none",
  cursor: "pointer",
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
  fontSize: theme.fontSizes.lg,
  fontWeight: theme.fontWeights.medium,
});
