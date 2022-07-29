import Head from "next/head";
import { useContext } from "react";
import { NextPage } from "next";
import { AppLayout } from "@/components/layout";
import { styled } from "@/styles/stitches.config";
import { costumers, deals, dollar } from "@/assets/icons";
import { AuthContext } from "@/contexts/AuthContext";
import { useReactQuery } from "@/hooks/query/useReactQuery";
import { Card, DueTasks, LastCostumers } from "@/components/data-display";
import type { Costumer } from "@/types/Costumer";
import type { Task } from "@/types/Task";

const Dashboard: NextPage = () => {
  const { user } = useContext(AuthContext);

  const { data: costumersData } = useReactQuery<Costumer[]>({
    queryKey: "costumers",
    url: `/costumers`,
    requestConfigs: {
      params: {
        _page: 1,
        _limit: 5,
      },
    },
  });

  const { data: tasksData } = useReactQuery<Task[]>({
    queryKey: "tasks",
    url: `/tasks`,
    requestConfigs: {
      params: {
        _page: 1,
        _limit: 4,
        _sort: "due_date",
      },
    },
  });

  return (
    <>
      <Head>
        <title>Deals CMS | Dashboard</title>
      </Head>

      <AppLayout sessionTitle={"Dashboard"}>
        <DashboardContainer>
          <CardsWrapper css={{ gridColumn: "1", gridRow: "1" }}>
            <Card title="Month Earnings" value="$2313" iconSrc={dollar.src} />
            <Card title="Active Deals" value="21" iconSrc={deals.src} />
            <Card title="Costumers" value="42" iconSrc={costumers.src} />
          </CardsWrapper>

          <LastCostumers
            costumersData={costumersData}
            css={{ gridColumn: "2", gridRow: "1" }}
          />

          <DueTasks
            tasksData={tasksData}
            css={{ gridColumn: "2", gridRow: "2" }}
          />
        </DashboardContainer>
      </AppLayout>
    </>
  );
};

export default Dashboard;

const DashboardContainer = styled("section", {
  height: "100%",
  padding: "2rem",

  display: "grid",
  gridTemplateColumns: "2.5fr 28rem",
  gridTemplateRows: "1fr 1fr",

  alignItems: "start",

  gridGap: "2rem",
});

const CardsWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
  gap: "1.5rem",

  gridColumn: "1",
  gridRow: "1",
});
