import { styled, theme } from "@/styles/stitches.config";
import Link from "next/link";

interface LinkButtonProps {
  label: string;
  href: string;
}
export const LinkButton = ({ label, href }: LinkButtonProps) => {
  return (
    <Link href={href} passHref>
      <S_LinkButton>{label}</S_LinkButton>
    </Link>
  );
};

const S_LinkButton = styled("a", {
  "height": "2.5rem",

  "_alignCenter": true,

  "_paddingX": "1rem",

  "color": theme.colors.text2,
  "cursor": "pointer",
  "textDecoration": "underline",

  "borderRadius": theme.radii.md,

  "&:hover": {
    backgroundColor: theme.colors.background3,
  },
});
