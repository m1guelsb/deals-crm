import Head from "next/head";
import { NextPage } from "next";
import { AppLayout } from "@/components/layout";
import { styled } from "@/styles/stitches.config";
import { DealsTable } from "@/components/tables";

const Deals: NextPage = () => {
  return (
    <>
      <Head>
        <title>Deals CRM | Deals</title>
      </Head>

      <AppLayout sessionTitle={"Deals"}>
        <DealsContainer>
          <DealsTable />
        </DealsContainer>
      </AppLayout>
    </>
  );
};

export default Deals;

const DealsContainer = styled("section", {
  height: "100%",
  padding: "2rem",
});
