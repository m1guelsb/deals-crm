import { useState } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import { styled, theme } from "@/styles/stitches.config";
import { useQueryGet } from "@/hooks/react-query/useQueryGet";
import { BaseTable } from "@/components/tables";
import type { Task } from "@/types";
import { NoData, Skeleton } from "@/components/feedback";
import { Icon } from "@/components/media";
import { EditTaskDialog } from "@/components/overlay";
import { completed, edit, notCompleted, tasks, warning } from "@/assets/icons";
import { format, isToday, isTomorrow, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export const TasksTable = () => {
  const { data, isLoading: tasksLoad } = useQueryGet<Task[]>({
    url: "/tasks",
    queryKeys: ["tasks"],
    queryConfigs: { refetchOnWindowFocus: false },
  });
  const [rowTaskId, setRowTaskId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = (rowTaskId: string) => {
    setRowTaskId(rowTaskId);
    setIsOpen(true);
  };

  const columnHelper = createColumnHelper<Task>();
  const columns = [
    columnHelper.accessor("isCompleted", {
      header: "Status",
      cell: ({ row, getValue }) => {
        const isCompleted = getValue();

        const dueDate = row.getValue<string>("dueDate");

        const isClose =
          isTomorrow(parseISO(dueDate)) || isToday(parseISO(dueDate));
        return (
          <StatusBox>
            {isClose && !isCompleted && (
              <Icon
                src={warning.src}
                css={{ _iconColor: { fill: theme.colors.error } }}
              />
            )}
            {isCompleted ? (
              <Icon
                src={completed.src}
                css={{ _iconColor: { fill: theme.colors.success } }}
              />
            ) : (
              <Icon src={notCompleted.src} />
            )}
          </StatusBox>
        );
      },
    }),
    columnHelper.accessor("dueDate", {
      header: "Due date",
      cell: ({ row, getValue }) => {
        const dueDate = format(parseISO(getValue()), "dd/MM/yyyy", {
          locale: ptBR,
        });

        const isClose =
          isTomorrow(parseISO(dueDate)) || isToday(parseISO(dueDate));

        return dueDate ? (
          <DueDate dueDate={isClose ? "close" : "far"}>{dueDate}</DueDate>
        ) : (
          <Skeleton />
        );
      },
    }),
    columnHelper.accessor("title", {
      header: "Title",
      cell: ({ row, getValue }) => {
        const title = getValue();
        return title ? <TaskCell>{title}</TaskCell> : <Skeleton />;
      },
    }),
    columnHelper.accessor("id", {
      header: "Edit",
      cell: ({ getValue }) => {
        const rowCustomerId = getValue();
        return (
          <ButtonCell
            onClick={() => handleEdit(rowCustomerId)}
            title="Edit Task"
          >
            <Icon src={edit.src} />
          </ButtonCell>
        );
      },
    }),
  ];

  return (
    <>
      <EditTaskDialog
        taskId={rowTaskId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      {data && data?.length > 0 ? (
        <BaseTable
          total={data?.length}
          data={data}
          columns={columns}
          isLoading={tasksLoad}
        />
      ) : (
        !tasksLoad && (
          <NoDataWrapper>
            <NoData message="No tasks found" icon={tasks.src} />
          </NoDataWrapper>
        )
      )}
    </>
  );
};

const ButtonCell = styled("button", {
  border: "unset",
  backgroundColor: "transparent",
  width: "100%",
  height: "3rem",
  display: "flex",
  alignItems: "center",

  cursor: "pointer",
  opacity: "0.3",

  "&:hover": {
    opacity: "1",
  },
  "&[disabled]": { opacity: "0.3" },
});
const TaskCell = styled("a", {
  all: "unset",

  width: "100%",
  height: "3rem",
  display: "flex",
  alignItems: "center",
});
const DueDate = styled("span", {
  minWidth: "6.5rem",

  variants: {
    dueDate: {
      far: {
        color: theme.colors.text1,
      },
      close: {
        color: theme.colors.error,
      },
    },
  },
});

const StatusBox = styled("span", {
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
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
