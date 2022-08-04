import Head from "next/head";
import { NextPage } from "next";
import { AppLayout } from "@/components/layout";
import { styled } from "@/styles/stitches.config";
import { costumers, deals, dollar } from "@/assets/icons";
import { useQueryGet } from "@/hooks/api/useQueryGet";
import { Card, DueTasks, RecentCostumers } from "@/components/data-display";
import { RecentDeals } from "@/components/data-display/RecentDeals/RecentDeals";
import type { Costumer } from "@/types/Costumer";
import type { Task } from "@/types/Task";
import type { Deal } from "@/types/Deal";

const Dashboard: NextPage = () => {
  const { data: costumersData } = useQueryGet<Costumer[]>({
    queryKeys: ["costumers"],
    url: `/costumers`,
  });

  const { data: tasksData } = useQueryGet<Task[]>({
    queryKeys: ["tasks"],
    url: `/tasks`,
    reqParams: {
      _page: 1,
      _limit: 5,
      _sort: "due_date",
    },
  });

  const { data: dealsData } = useQueryGet<Deal[]>({
    queryKeys: ["deals"],
    url: `/deals`,
    reqParams: {
      _sort: "title",
    },
  });

  const monthEarningsTotal = dealsData
    ?.slice(0, 4)
    ?.map((deal) => Number(deal.price.replace("$", "")))
    .reduce((a, b) => a + b, 0);

  return (
    <>
      <Head>
        <title>Deals CMS | Dashboard</title>
      </Head>

      <AppLayout sessionTitle={"Dashboard"}>
        <DashboardContainer>
          <CardsWrapper
            css={{ gridColumn: "1", gridRowStart: "1", gridRowEnd: "2" }}
          >
            <Card
              title="Month Earnings"
              value={monthEarningsTotal ? `$${monthEarningsTotal}` : ""}
              iconSrc={dollar.src}
            />
            <Card
              title="Deals"
              value={dealsData?.length.toString()}
              iconSrc={deals.src}
            />
            <Card
              title="Costumers"
              value={costumersData?.length.toString()}
              iconSrc={costumers.src}
            />
          </CardsWrapper>

          <RecentDeals
            dealsData={dealsData?.slice(0, 7)}
            css={{ gridColumn: "1", gridRowStart: "2", gridRowEnd: "4" }}
          />

          <DueTasks
            tasksData={tasksData}
            css={{ gridColumn: "2", gridRowStart: "1", gridRowEnd: "3" }}
          />
          <RecentCostumers
            costumersData={costumersData?.slice(0, 6)}
            css={{ gridColumn: "2", gridRowStart: "3", gridRowEnd: "4" }}
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
  gridTemplateColumns: "7fr 3fr",
  gridTemplateRows: "auto auto 1fr",

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
