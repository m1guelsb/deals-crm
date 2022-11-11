import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { styled, theme } from "@/styles/stitches.config";
import { useQueryGet } from "@/hooks/api/useQueryGet";
import { BaseTable } from "@/components/tables";
import type { Deal } from "@/types";
import { NoData, Skeleton } from "@/components/feedback";
import { Icon } from "@/components/media";
import { EditDealDialog, NewDealDialog } from "@/components/overlay";
import { deals, edit } from "@/assets/icons";
import { DealStatusTag } from "@/components/data-display";
import Link from "next/link";
import { Button } from "@/components/form";

export const DealsTable = () => {
  const { data, isLoading: dealsLoad } = useQueryGet<Deal[]>({
    url: "/deals",
    queryKeys: ["deals"],
    params: {
      _sort: "title",
    },
    queryConfigs: { refetchOnWindowFocus: false },
  });
  const [rowDealId, setRowDealId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleDealEdit = (rowDealId: string) => {
    setRowDealId(rowDealId);
    setIsOpen(true);
  };

  const columnHelper = createColumnHelper<Deal>();
  const columns = [
    columnHelper.accessor("title", {
      header: "Title",
      cell: ({ row, getValue }) => {
        const title = getValue<string>();
        return title ? (
          <Link href={`deals/${row.getValue("id")}`} passHref>
            <LinkCell>{title}</LinkCell>
          </Link>
        ) : (
          <Skeleton />
        );
      },
    }),
    columnHelper.accessor("description", {
      header: "Description",
      cell: ({ row, getValue }) => {
        const description = getValue();
        return description ? (
          <Link href={`deals/${row.getValue("id")}`} passHref>
            <LinkCell>{description}</LinkCell>
          </Link>
        ) : (
          <Skeleton />
        );
      },
    }),
    columnHelper.accessor("price", {
      header: "Price",
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue();

        return status ? <DealStatusTag status={status.label} /> : <Skeleton />;
      },
    }),
    columnHelper.accessor("id", {
      header: "Edit",
      cell: ({ getValue }) => {
        const rowDealId = getValue();
        return (
          <ButtonCell
            onClick={() => handleDealEdit(rowDealId)}
            title="Edit Deal"
          >
            <Icon src={edit.src} />
          </ButtonCell>
        );
      },
    }),
  ];

  return (
    <>
      <EditDealDialog
        dealId={rowDealId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {data && data?.length > 0 ? (
        <BaseTable
          total={data?.length}
          data={data}
          columns={columns}
          isLoading={dealsLoad}
        />
      ) : (
        !dealsLoad && (
          <NoDataWrapper>
            <NoData message="No deals found" />

            <NewDealDialog>
              <Button sType={"primary"} rightIcon={<Icon src={deals.src} />}>
                Add new deal
              </Button>
            </NewDealDialog>
          </NoDataWrapper>
        )
      )}
    </>
  );
};

const ButtonCell = styled("button", {
  "border": "unset",
  "backgroundColor": "transparent",
  "width": "100%",
  "height": "3rem",
  "display": "flex",
  "alignItems": "center",

  "cursor": "pointer",
  "opacity": "0.3",

  "&:hover": {
    opacity: "1",
  },
  "&[disabled]": { opacity: "0.3" },
});
const LinkCell = styled("a", {
  all: "unset",

  width: "100%",
  height: "3rem",
  display: "flex",
  alignItems: "center",

  cursor: "pointer",
});
const NoDataWrapper = styled("div", {
  height: "100%",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.5rem",
});
