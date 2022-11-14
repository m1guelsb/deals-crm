import Head from "next/head";
import { NextPage } from "next";
import { AppLayout } from "@/components/layout";
import { styled } from "@/styles/stitches.config";
import { TasksTable } from "@/components/tables";

const Tasks: NextPage = () => {
  return (
    <>
      <Head>
        <title>Deals CRM | Tasks</title>
      </Head>

      <AppLayout sessionTitle={"Tasks"}>
        <TasksContainer>
          <TasksTable />
        </TasksContainer>
      </AppLayout>
    </>
  );
};

export default Tasks;

const TasksContainer = styled("section", {
  height: "100%",
  padding: "2rem",
});
