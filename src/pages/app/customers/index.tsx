import Head from "next/head";
import { NextPage } from "next";
import { AppLayout } from "@/components/layout";
import { styled } from "@/styles/stitches.config";
import { CustomersTable } from "@/components/tables";

const Customers: NextPage = () => {
  return (
    <>
      <Head>
        <title>Deals CRM | Customers</title>
      </Head>

      <AppLayout sessionTitle={"Customers"}>
        <CustomersContainer>
          <CustomersTable />
        </CustomersContainer>
      </AppLayout>
    </>
  );
};

export default Customers;

const CustomersContainer = styled("section", {
  height: "100%",
  padding: "2rem",
});
