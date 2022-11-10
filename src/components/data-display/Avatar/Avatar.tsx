import { styled, theme } from "@/styles/stitches.config";
import { sliceAcronym } from "@/utils/functions";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

interface AvatarProps {
  imageSrc: string;
  username: string | undefined;
  size?: `${number}rem`;
}
export const Avatar = ({ imageSrc, username, size }: AvatarProps) => (
  <AvatarContainer title={username} style={{ width: size, height: size }}>
    <Image src={imageSrc} alt={username} />
    <Fallback>{sliceAcronym(username)}</Fallback>
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
