import { useQueryGet } from "@/hooks/api/useQueryGet";
import { Deal } from "@/types";
import { createColumnHelper } from "@tanstack/react-table";
import { BaseTable } from "@/components/tables";
import { styled, theme } from "@/styles/stitches.config";

export const DealsTable = () => {
  const { data, isLoading, isFetching } = useQueryGet<Deal[]>({
    url: "/deals",
    queryKeys: ["deals"],
    reqParams: {
      _sort: "price",
    },
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
        const value = getValue();

        return value ? (
          <StatusTag status={value === "closed" ? "closed" : "inProgress"}>
            {value === "closed" ? "CLOSED" : "IN PROGRESS"}
          </StatusTag>
        ) : (
          value
        );
      },
    }),
  ];

  return (
    <BaseTable
      total={data?.length}
      data={data}
      columns={columns}
      isLoading={isLoading || isFetching}
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
