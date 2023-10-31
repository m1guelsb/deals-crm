import { IconButton } from "@/components/form";
import Link from "next/link";
import { useRouter } from "next/router";

interface NavButton {
  href: string;
  iconSrc: string;
}
export const NavButton = ({ href, iconSrc }: NavButton) => {
  const { pathname } = useRouter();

  let isActive = false;
  if (pathname === href) {
    isActive = true;
  }
  return (
    <Link href={href} passHref>
      <IconButton
        sType={isActive ? "primary" : "secondary"}
        iconSrc={iconSrc}
      />
    </Link>
  );
};
