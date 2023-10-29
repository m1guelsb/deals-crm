import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { styled } from "@/styles/stitches.config";
import { useQueryGet } from "@/hooks/api/useQueryGet";
import { BaseTable } from "@/components/tables";
import type { Customer } from "@/types";
import { NoData, Skeleton } from "@/components/feedback";
import { Icon } from "@/components/media";
import {
  EditCustomerDialog,
  NewCustomerDialog,
  NewDealDialog,
} from "@/components/overlay";
import { costumers, edit } from "@/assets/icons";
import { Avatar } from "@/components/data-display";
import Link from "next/link";
import { Button } from "@/components/form";

export const CustomersTable = () => {
  const { data, isLoading: customersLoad } = useQueryGet<Customer[]>({
    url: "/customers",
    queryKeys: ["customers"],
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
      {data && data?.length > 0 ? (
        <BaseTable
          total={data?.length}
          data={data}
          columns={columns}
          isLoading={customersLoad}
        />
      ) : (
        !customersLoad && (
          <NoDataWrapper>
            <NoData message="No customers found" />

            <NewCustomerDialog>
              <Button
                sType={"primary"}
                rightIcon={<Icon src={costumers.src} />}
              >
                Add new customer
              </Button>
            </NewCustomerDialog>
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

const ImageBox = styled("span", {
  width: "fit-content",
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
