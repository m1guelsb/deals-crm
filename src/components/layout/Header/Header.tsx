import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { AddNewPopover, ProfilePopover } from "@/components/overlay";
import { Icon } from "@/components/media";
import { Heading } from "@/components/typography";
import { CSS, styled, theme } from "@/styles/stitches.config";
import { Logo as LogoIMG } from "@/assets/images";
import { Button } from "@/components/form";
import { plus } from "@/assets/icons";
import { Avatar } from "@/components/data-display";

interface HeaderProps {
  children: string;
  css?: CSS;
}
export const Header = ({ children, ...props }: HeaderProps) => {
  const { user } = useContext(AuthContext);

  return (
    <HeaderContainer {...props}>
      <LogoBox>
        <Logo>
          <Icon src={LogoIMG.src} sSize={"large"} sType={"baseColor"} />
        </Logo>
      </LogoBox>

      <HeaderBox>
        <Heading as={"h3"} sType={"3"}>
          {children}
        </Heading>

        <RightSide>
          <AddNewPopover>
            <Button rightIcon={<Icon src={plus.src} />}>Add New</Button>
          </AddNewPopover>

          <ProfilePopover>
            <button style={{ all: "unset" }}>
              <Avatar imageSrc={``} username={user?.name} />
            </button>
          </ProfilePopover>
        </RightSide>
      </HeaderBox>
    </HeaderContainer>
  );
};

const HeaderContainer = styled("header", {
  height: "5.5rem",

  display: "flex",
  alignItems: "center",

  backgroundColor: theme.colors.background1,

  _border: "Bottom",
  borderColor: theme.colors.background3,
});

const LogoBox = styled("div", {
  width: "5.5rem",
  height: "5.5rem",

  _alignCenter: true,
  padding: "1.25rem",
  _border: "Right",
  borderColor: theme.colors.background3,
});

const Logo = styled("div", {
  width: "3rem",
  height: "3rem",
  backgroundColor: theme.colors.text1,
  borderRadius: theme.radii.sm,
  padding: "0.5rem",
});

const HeaderBox = styled("div", {
  width: "100%",

  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  _paddingX: "2rem",
});

const RightSide = styled("div", {
  display: "flex",
  alignItems: "center",

  gap: "1.5rem",
});
