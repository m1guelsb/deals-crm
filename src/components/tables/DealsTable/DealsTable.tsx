import { createColumnHelper } from "@tanstack/react-table";
import { styled, theme } from "@/styles/stitches.config";
import { useQueryGet } from "@/hooks/api/useQueryGet";
import { BaseTable } from "@/components/tables";
import type { Deal } from "@/types";
import { Skeleton } from "@/components/feedback";

export const DealsTable = () => {
  const { data, isLoading } = useQueryGet<Deal[]>({
    url: "/deals",
    queryKeys: ["deals"],
    reqParams: {
      _sort: "title",
    },
    queryConfigs: { refetchOnWindowFocus: false },
  });

  const columnHelper = createColumnHelper<Deal>();
  const columns = [
    columnHelper.accessor("title", {
      header: "Title",
    }),
    columnHelper.accessor("description", {
      header: "Description",
    }),
    columnHelper.accessor("price", {
      header: "Price",
    }),
    columnHelper.accessor("status", {
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue();

        return status ? (
          <StatusTag
            status={status.label === "Closed" ? "closed" : "inProgress"}
          >
            {status?.label?.toUpperCase()}
          </StatusTag>
        ) : (
          <Skeleton />
        );
      },
    }),
  ];

  return (
    <BaseTable
      total={data?.length}
      data={data}
      columns={columns}
      isLoading={isLoading}
    />
  );
};

const StatusTag = styled("span", {
  _alignCenter: true,

  width: "8rem",
  paddingY: "0.3rem",

  fontWeight: theme.fontWeights.bold,

  borderRadius: theme.radii.md,

  variants: {
    status: {
      inProgress: {
        color: theme.colors.text1,
        backgroundColor: theme.colors.primary,
      },
      closed: {
        color: theme.colors.text2,
        backgroundColor: theme.colors.background3,
      },
    },
  },
});
