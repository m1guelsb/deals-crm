import Head from "next/head";
import { NextPage } from "next";
import { AppLayout } from "@/components/layout";
import { styled, theme } from "@/styles/stitches.config";
import { useQueryGet } from "@/hooks/api/useQueryGet";
import { Customer, Deal } from "@/types";
import Router, { useRouter } from "next/router";
import {
  Avatar,
  CustomerDeals,
  DealStatusTag,
  DealTasks,
  DisplayChip,
} from "@/components/data-display";
import Link from "next/link";
import { Heading } from "@/components/typography";
import { IconButton } from "@/components/form";
import { edit, trash } from "@/assets/icons";
import {
  AlertDialog,
  EditCustomerDialog,
  EditDealDialog,
} from "@/components/overlay";
import { useState } from "react";
import { Skeleton } from "@/components/feedback";
import { useQueryDelete } from "@/hooks/api/useQueryDelete";
import { useToast } from "@/hooks/helpers/useToast";

const CustomerSlug: NextPage = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { newToast } = useToast();

  const customerId = String(useRouter().query["customer-slug"]);

  const { data: customer, isLoading: customerLoad } = useQueryGet<Customer>({
    url: `/customers/${customerId}`,
    queryKeys: ["customer", customerId ?? ""],
    queryConfigs: {
      enabled: !!customerId,
    },
  });

  const { queryDelete, isLoading: deleteCustomerLoad } = useQueryDelete({
    url: `/customers/${customer?.id}`,
  });

  const { data: customerDeals, isLoading: customerDealsLoad } = useQueryGet<
    Deal[]
  >({
    url: `/customers/${customerId}/deals`,
    queryKeys: ["deals", customerId ?? ""],
    queryConfigs: {
      enabled: !!customer,
    },
  });

  return (
    <>
      {customer && (
        <EditCustomerDialog
          isOpen={editModalOpen}
          setIsOpen={setEditModalOpen}
          customerId={customer?.id}
        />
      )}

      <Head>
        <title>Deals CRM | Customer - {customer?.name}</title>
      </Head>

      <AppLayout sessionTitle={`Customer`}>
        <CustomerContainer>
          <CustomerHeader>
            <Avatar
              username={customer?.name}
              imageSrc={customer?.image ?? ""}
              size={"5rem"}
            />
            <Heading sType={"3"}>{customer?.name ?? ""}</Heading>
          </CustomerHeader>

          <CustomerDetails css={{ gridColumn: "1", gridRow: "2" }}>
            <DisplayChip title="Email" data={customer?.email} />
            <DisplayChip title="Phone" data={customer?.phone} />

            <Actions>
              <IconButton
                onClick={() => setEditModalOpen(true)}
                iconSrc={edit.src}
                title="Edit customer"
              />

              <AlertDialog
                onConfirm={() =>
                  queryDelete(undefined, {
                    onSuccess() {
                      newToast({
                        styleType: "success",
                        title: "Customer deleted!",
                      });
                      Router.push("/app/customers");
                    },
                    onError() {
                      newToast({
                        styleType: "error",
                        title: "Unknown error",
                      });
                    },
                  })
                }
                isLoading={deleteCustomerLoad}
                title="Delete customer?"
              >
                <IconButton sType={"tertiary"} iconSrc={trash.src} />
              </AlertDialog>
            </Actions>
          </CustomerDetails>

          <CustomerDeals
            customerId={customerId}
            css={{ gridColumn: "2", gridRow: "1 / 4" }}
          />
        </CustomerContainer>
      </AppLayout>
    </>
  );
};

export default CustomerSlug;

const CustomerContainer = styled("section", {
  height: "100%",
  padding: "2rem",

  display: "grid",
  gridTemplateColumns: "3fr 1.5fr",
  gridTemplateRows: "auto 1fr",
  gridGap: "1rem",
});

const CustomerHeader = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});
const CustomerDetails = styled("div", {
  height: "10rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  padding: "1rem",
  borderRadius: theme.radii.md,

  backgroundColor: theme.colors.background2,
});

const Actions = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});
