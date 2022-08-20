import { styled, theme } from "@/styles/stitches.config";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Heading } from "@/components/typography";
import { Skeleton, Spinner } from "@/components/feedback";

interface BaseTableProps {
  total: string | number | undefined;
  data: any[] | undefined;
  columns: ColumnDef<any, any>[];
  isLoading: boolean;
}

export const BaseTable = ({
  total,
  data,
  columns,
  isLoading,
}: BaseTableProps) => {
  const tableData = !data && isLoading ? Array(12).fill({}) : data;

  const tableColumns =
    !data && isLoading
      ? columns.map((column) => ({
          cell: () => <Skeleton />,
          ...column,
        }))
      : columns;

  const table = useReactTable({
    data: tableData ?? [],
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Container>
      <TableHeading>
        <Heading sType={"4"} as="h4">
          Total: {total}
        </Heading>

        {isLoading && <Spinner />}
      </TableHeading>

      <TableContent>
        <Table>
          <TableHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeader key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHeader>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableData key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableData>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContent>
    </Container>
  );
};

const TableHeading = styled("div", {
  height: "3rem",
  display: "flex",
  alignItems: "center",
  gap: "1rem",
});
const Container = styled("div", {
  width: "100%",
  height: "100%",

  display: "flex",
  flexDirection: "column",
  gap: "1rem",

  position: "relative",
});

const TableContent = styled("div", {
  height: "100%",

  display: "flex",
  flexDirection: "column",
  paddingRight: "0.25rem",
  borderRadius: theme.radii.md,

  overflow: "auto",
  position: "relative",

  boxShadow: "inset 0px -9px 12px -10px rgba(0,0,0,0.3)",
});

const Table = styled("table", {
  borderSpacing: "0",
});

const TableRow = styled("tr", {
  "height": "4rem",

  "&:hover": {
    backgroundColor: theme.colors.background2,
  },
});

const TableHead = styled("thead", {
  "height": "2rem",

  "position": "sticky",
  "top": "0",
  "left": "0",
  "boxShadow": "0px 9px 12px -10px rgba(0,0,0,0.3)",

  "textAlign": "left",

  "& :first-child": {
    borderTopLeftRadius: theme.radii.md,
  },

  "& :last-child": {
    borderTopRightRadius: theme.radii.md,
  },
});

const TableHeader = styled("th", {
  _paddingX: "1rem",

  _truncate: true,
  fontWeight: theme.fontWeights.bold,

  color: theme.colors.text2,
  backgroundColor: theme.colors.background2,
});

const TableBody = styled("tbody", {
  height: "100%",
});

const TableData = styled("td", {
  _paddingX: "1rem",

  color: theme.colors.text1,
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",

  _border: "Top",
  borderColor: theme.colors.background3,
});
