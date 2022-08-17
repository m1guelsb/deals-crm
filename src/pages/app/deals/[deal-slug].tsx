import Head from "next/head";
import { NextPage } from "next";
import { AppLayout } from "@/components/layout";
import { styled, theme } from "@/styles/stitches.config";
import { useQueryGet } from "@/hooks/api/useQueryGet";
import { Customer, Deal } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Avatar, DisplayChip } from "@/components/data-display";
import { Skeleton } from "@/components/feedback";
import Link from "next/link";

const DealSlug: NextPage = () => {
  const dealSlug = String(useRouter().query["deal-slug"]);

  const [dealId, setDealId] = useState("");
  useEffect(() => {
    setDealId(dealSlug);
  }, [dealSlug]);

  const { data: deal } = useQueryGet<Deal>({
    url: `/deals/${dealId}`,
    queryKeys: ["deal-slug", dealId],
    queryConfigs: {
      enabled: !!dealId,
    },
  });

  const { data: customer, isLoading: customerLoad } = useQueryGet<Customer>({
    url: `/customers/${deal?.customer.id}`,
    queryKeys: ["customer-slug", deal?.customer.id ?? ""],
    queryConfigs: {
      enabled: !!deal,
    },
  });

  return (
    <>
      <Head>
        <title>Deals CMS | Deal - {deal?.title}</title>
      </Head>

      <AppLayout sessionTitle={"Deals"}>
        <DealContainer>
          <Link href={`/customers/${customer?.id}`} passHref>
            <CustomerDetails>
              <Avatar
                username={customer?.name}
                imageSrc={customer?.image ?? ""}
              />

              <DisplayChip title="Customer" data={customer?.name} />
              <DisplayChip title="Email" data={customer?.email} />
              <DisplayChip title="Phone" data={customer?.phone} />
            </CustomerDetails>
          </Link>
        </DealContainer>
      </AppLayout>
    </>
  );
};

export default DealSlug;

const DealContainer = styled("section", {
  height: "100%",
  padding: "2rem",

  display: "grid",
  gridTemplateColumns: "3fr 1.5fr",
});

const CustomerDetails = styled("a", {
  "all": "unset",
  "height": "fit-content",
  "display": "flex",
  "alignItems": "center",
  "justifyContent": "space-between",

  "padding": "1rem",

  "_border": "All",
  "borderColor": theme.colors.background3,
  "borderRadius": theme.radii.md,

  "cursor": "pointer",

  "&:hover": {
    backgroundColor: theme.colors.background2,
  },
});
