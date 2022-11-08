import { CSS, styled, theme } from "@/styles/stitches.config";
import { NavButton } from "./NavButton";
import { costumers, dashboard, deals, tasks } from "@/assets/icons";

interface SidebarProps {
  css?: CSS;
}
export const Sidebar = ({ ...props }: SidebarProps) => {
  return (
    <S_Sidebar {...props}>
      <NavButton href="/app" iconSrc={dashboard.src} />
      <NavButton href="/app/deals" iconSrc={deals.src} />
      <NavButton href="/app/customers" iconSrc={costumers.src} />
      <NavButton href="/app/tasks" iconSrc={tasks.src} />
    </S_Sidebar>
  );
};

const S_Sidebar = styled("aside", {
  height: "100%",
  width: "5.5rem",

  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1rem",

  _paddingY: "1.25rem",

  backgroundColor: "$background1",
  _border: "Right",

  borderColor: theme.colors.background3,
});
