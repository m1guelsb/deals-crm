import Head from "next/head";
import { NextPage } from "next";
import { AppLayout } from "@/components/layout";
import { styled } from "@/styles/stitches.config";

const Dashboard: NextPage = () => {
  return (
    <>
      <Head>
        <title>Deals CMS | Dashboard</title>
      </Head>

      <AppLayout sessionTitle={"Dashboard"}>
        <DashboardContainer>Dashboard</DashboardContainer>
      </AppLayout>
    </>
  );
};

export default Dashboard;

const DashboardContainer = styled("section", {
  padding: "1.5rem",
});
