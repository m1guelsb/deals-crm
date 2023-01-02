import Head from "next/head";
import { NextPage } from "next";
import { AppLayout } from "@/components/layout";
import { styled, theme } from "@/styles/stitches.config";
import { useQueryGet } from "@/hooks/api/useQueryGet";
import { Customer, Deal } from "@/types";
import Router, { useRouter } from "next/router";
import {
  Avatar,
  DealStatusTag,
  DealTasks,
  DisplayChip,
} from "@/components/data-display";
import Link from "next/link";
import { Heading } from "@/components/typography";
import { IconButton } from "@/components/form";
import { edit, trash } from "@/assets/icons";
import { AlertDialog, EditDealDialog } from "@/components/overlay";
import { useState } from "react";
import { Skeleton } from "@/components/feedback";
import { useQueryDelete } from "@/hooks/api/useQueryDelete";
import { useToast } from "@/hooks/helpers/useToast";

const DealSlug: NextPage = () => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const { newToast } = useToast();

  const dealId = String(useRouter().query["deal-slug"]);

  const { data: deal, isLoading: dealLoad } = useQueryGet<Deal>({
    url: `/deals/${dealId}`,
    queryKeys: ["deal", dealId ?? ""],
    queryConfigs: {
      enabled: !!dealId,
    },
  });

  const { data: customer, isLoading: customerLoad } = useQueryGet<Customer>({
    url: `/customers/${deal?.customerId}`,
    queryKeys: ["customer", deal?.customerId ?? ""],
    queryConfigs: {
      enabled: !!deal,
    },
  });

  const { queryDelete, isLoading: deleteCustomerLoad } = useQueryDelete({
    url: `/deals/${deal?.id}`,
  });

  return (
    <>
      {deal && (
        <EditDealDialog
          isOpen={editModalOpen}
          setIsOpen={setEditModalOpen}
          dealId={deal?.id}
        />
      )}

      <Head>
        <title>Deals CRM | Deal - {deal?.title}</title>
      </Head>

      <AppLayout sessionTitle={`Deal: ${deal?.title ?? ""}`}>
        <DealContainer>
          <Link href={`/app/customers/${customer?.id}`} passHref>
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

          <DealHeader css={{ gridColumn: "1", gridRow: "2" }}>
            <Title>
              {deal ? (
                <>
                  <Heading sType={"3"}>{deal?.title}</Heading>

                  <Description>{deal?.description}</Description>
                </>
              ) : (
                dealLoad && (
                  <>
                    <Skeleton width="25rem" />
                    <Skeleton height="2rem" width="15rem" />
                  </>
                )
              )}
            </Title>

            <DisplayChip title="Price" data={deal?.price.toString()} />

            {deal && <DealStatusTag status={deal?.status} />}
            <Actions>
              <IconButton
                onClick={() => setEditModalOpen(true)}
                iconSrc={edit.src}
                title="Edit deal"
              />

              <AlertDialog
                onConfirm={() =>
                  queryDelete(undefined, {
                    onSuccess() {
                      newToast({
                        styleType: "success",
                        title: "Deal deleted!",
                      });
                      Router.push("/app/deals");
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
                title="Delete deal?"
              >
                <IconButton sType={"tertiary"} iconSrc={trash.src} />
              </AlertDialog>
            </Actions>
          </DealHeader>

          <DealTasks
            dealId={dealId}
            css={{ gridColumn: "2", gridRow: "1 / 4" }}
          />
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
  gridTemplateRows: "auto auto 1fr",
  gridGap: "1rem",
});

const CustomerDetails = styled("a", {
  all: "unset",
  height: "fit-content",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  padding: "1rem",

  _border: "All",
  borderColor: theme.colors.background3,
  borderRadius: theme.radii.md,

  cursor: "pointer",

  "&:hover": {
    backgroundColor: theme.colors.background2,
  },
});

const DealHeader = styled("header", {
  height: "10rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  padding: "1rem",
  borderRadius: theme.radii.md,

  backgroundColor: theme.colors.background2,
});
const Title = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
});
const Description = styled("span", {
  fontSize: theme.fontSizes.lg,
});
const Actions = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});
