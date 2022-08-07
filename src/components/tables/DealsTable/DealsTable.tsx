import { useQueryGet } from "@/hooks/api/useQueryGet";
import { Deal } from "@/types";
import { createColumnHelper } from "@tanstack/react-table";
import { BaseTable } from "@/components/tables";

export const DealsTable = () => {
  const { data, isLoading, isFetching } = useQueryGet<Deal[]>({
    url: "/deals",
    queryKeys: ["deals"],
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
      cell: (info) => info.getValue(),
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
