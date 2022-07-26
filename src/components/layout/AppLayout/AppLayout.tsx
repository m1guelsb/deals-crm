import { styled } from "@/styles/stitches.config";
import { ReactElement } from "react";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";

interface AppLayoutProps {
  sessionTitle: string;
  children: ReactElement;
}

export const AppLayout = ({ sessionTitle, children }: AppLayoutProps) => {
  return (
    <Container>
      <Header css={{ gridArea: "header" }}>{sessionTitle}</Header>

      <Sidebar css={{ gridArea: "sidebar" }} />

      <AppContent css={{ gridArea: "content" }}>{children}</AppContent>
    </Container>
  );
};

const AppContent = styled("main", {
  height: "100%",
});

const Container = styled("div", {
  height: "100%",

  display: "grid",

  gridTemplateColumns: "auto 1fr",
  gridTemplateRows: "auto 1fr",
  gridTemplateAreas: `
  "header  header"
  "sidebar content"`,
});
