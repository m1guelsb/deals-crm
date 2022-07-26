import { useContext } from "react";
import { Icon } from "@/components/media";
import { Heading } from "@/components/typography";
import { AuthContext } from "@/contexts/AuthContext";
import { CSS, styled, theme } from "@/styles/stitches.config";
import { Logo as LogoIMG } from "@/assets/images";
import { Button } from "@/components/form";
import { plus } from "@/assets/icons";

interface HeaderProps {
  children: string;
  css?: CSS;
}
export const Header = ({ children, ...props }: HeaderProps) => {
  const { user } = useContext(AuthContext);

  return (
    <S_Header {...props}>
      <LogoContainer>
        <Logo>
          <Icon src={LogoIMG.src} sSize={"large"} sType={"baseColor"} />
        </Logo>
      </LogoContainer>

      <HeaderContainer>
        <Heading as={"h3"} sType={"3"}>
          {children}
        </Heading>

        <RightSide>
          <Button rightIcon={<Icon src={plus.src} />}>Add New</Button>
          {user && <span>{user?.username}</span>}
        </RightSide>
      </HeaderContainer>
    </S_Header>
  );
};

const S_Header = styled("header", {
  height: "5.5rem",

  display: "flex",
  alignItems: "center",

  backgroundColor: theme.colors.background1,

  _border: "Bottom",
  borderColor: theme.colors.background3,
});

const LogoContainer = styled("div", {
  width: "5.5rem",

  _alignCenter: true,
  padding: "1.25rem",
  _border: "Right",
  borderColor: theme.colors.background3,
});

const Logo = styled("div", {
  backgroundColor: theme.colors.text1,
  borderRadius: theme.radii.sm,
  padding: "0.5rem",
});

const HeaderContainer = styled("div", {
  width: "100%",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  padding: "1.25rem",
});

const RightSide = styled("div", {
  display: "flex",
  alignItems: "center",

  gap: "1.5rem",
});
