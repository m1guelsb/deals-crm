import { ReactElement, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { styled, theme } from "@/styles/stitches.config";
import { Content as PopoverContent } from "@radix-ui/react-popover";
import {
  BasePopover,
  Arrow,
  popoverSlideDown,
} from "@/components/overlay/popovers/BasePopover";
import { AlertDialog } from "@/components/overlay";
import { Avatar } from "@/components/data-display";
import { Button } from "@/components/form";
import { signOut } from "@/contexts/AuthContext";
import { Icon } from "@/components/media";
import { logout } from "@/assets/icons";

interface PopoverProps {
  children: ReactElement;
}
export const ProfilePopover = ({ children }: PopoverProps) => {
  const { user } = useContext(AuthContext);

  return (
    <BasePopover trigger={children}>
      <Content sideOffset={5} align={"end"}>
        <ProfileWrapper>
          <Avatar imageSrc={``} username={user?.username} />

          <Username>{user?.username}</Username>
        </ProfileWrapper>

        <AlertDialog title="Logout?" onConfirm={() => signOut()}>
          <Button
            sType={"tertiary"}
            rightIcon={<Icon src={logout.src} />}
            css={{
              width: "100%",
              borderTopLeftRadius: "0",
              borderTopRightRadius: "0",
            }}
          >
            Logout
          </Button>
        </AlertDialog>

        <Arrow />
      </Content>
    </BasePopover>
  );
};

const Content = styled(PopoverContent, {
  "height": "fit-content",

  "display": "flex",
  "flexDirection": "column",
  "alignItems": "stretch",

  "backgroundColor": theme.colors.background2,

  "borderRadius": theme.radii.md,
  "_border": "All",
  "borderColor": theme.colors.primary,

  "@media (prefers-reduced-motion: no-preference)": {
    "animationDuration": "400ms",
    "animationTimingFunction": "cubic-bezier(0.16, 1, 0.3, 1)",
    "willChange": "transform, opacity",
    '&[data-state="open"]': {
      '&[data-side="bottom"]': { animationName: popoverSlideDown },
    },
  },
});

const ProfileWrapper = styled("div", {
  height: "5rem",
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  padding: "1rem",

  _border: "Bottom",
  borderColor: theme.colors.primary,
});

const Username = styled("span", {
  fontSize: theme.fontSizes.lg,
  _lineClamp: 2,
});
