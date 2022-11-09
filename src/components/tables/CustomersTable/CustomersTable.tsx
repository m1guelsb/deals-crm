import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { styled } from "@/styles/stitches.config";
import { useQueryGet } from "@/hooks/api/useQueryGet";
import { BaseTable } from "@/components/tables";
import type { Customer } from "@/types";
import { Skeleton } from "@/components/feedback";
import { Icon } from "@/components/media";
import { EditCustomerDialog } from "@/components/overlay";
import { edit } from "@/assets/icons";
import { Avatar } from "@/components/data-display";
import Link from "next/link";

export const CustomersTable = () => {
  const { data, isLoading: customersLoad } = useQueryGet<Customer[]>({
    url: "/customers",
    queryKeys: ["customers"],
    params: {
      _sort: "name",
    },
    queryConfigs: { refetchOnWindowFocus: false },
  });
  const [rowCustomerId, setRowCustomerId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleDealEdit = (rowDealId: string) => {
    setRowCustomerId(rowDealId);
    setIsOpen(true);
  };

  const columnHelper = createColumnHelper<Customer>();
  const columns = [
    columnHelper.accessor("image", {
      header: "Avatar",
      cell: ({ row, getValue }) => {
        const avatar = getValue();
        return (
          <Link href={`customers/${row.getValue("id")}`} passHref>
            <ImageBox>
              <Avatar imageSrc={avatar} username={row.getValue("name")} />
            </ImageBox>
          </Link>
        );
      },
    }),
    columnHelper.accessor("name", {
      header: "Name",
      cell: ({ row, getValue }) => {
        const name = getValue();
        return name ? (
          <Link href={`customers/${row.getValue("id")}`} passHref>
            <LinkCell>{name}</LinkCell>
          </Link>
        ) : (
          <Skeleton />
        );
      },
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: ({ row, getValue }) => {
        const email = getValue();
        return email ? (
          <Link href={`customers/${row.getValue("id")}`} passHref>
            <LinkCell>{email}</LinkCell>
          </Link>
        ) : (
          <Skeleton />
        );
      },
    }),
    columnHelper.accessor("phone", {
      header: "Phone",
    }),
    columnHelper.accessor("id", {
      header: "Edit",
      cell: ({ getValue }) => {
        const rowCustomerId = getValue();
        return (
          <ButtonCell
            onClick={() => handleDealEdit(rowCustomerId)}
            title="Edit Customer"
          >
            <Icon src={edit.src} />
          </ButtonCell>
        );
      },
    }),
  ];

  return (
    <>
      <EditCustomerDialog
        customerId={rowCustomerId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <BaseTable
        total={data?.length}
        data={data}
        columns={columns}
        isLoading={customersLoad}
      />
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

const ImageBox = styled("span", {
  width: "fit-content",
});
