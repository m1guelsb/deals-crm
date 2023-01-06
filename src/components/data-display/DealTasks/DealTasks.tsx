import Link from "next/link";
import { IconButton, LinkButton } from "@/components/form";
import { Heading } from "@/components/typography";
import { CSS, styled, theme } from "@/styles/stitches.config";
import { Task as TaskItem } from "@/components/data-display";
import type { Task } from "@/types";
import { NoData, Skeleton } from "@/components/feedback";
import { useQueryGet } from "@/hooks/react-query/useQueryGet";
import { plus, tasks } from "@/assets/icons";
import { EditTaskDialog, NewTaskDialog } from "@/components/overlay";
import { useState } from "react";

interface DealTasksProps {
  dealId: string;
  css?: CSS;
}
export const DealTasks = ({ dealId, css }: DealTasksProps) => {
  const [rowTaskId, setRowTaskId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { data: tasksData, isLoading: tasksLoad } = useQueryGet<Task[]>({
    queryKeys: ["deal-tasks", dealId],
    url: `/deals/${dealId}/tasks`,
    queryConfigs: {
      enabled: !!dealId,
    },
  });

  const handleEdit = (rowTaskId: string) => {
    setRowTaskId(rowTaskId);
    setIsOpen(true);
  };

  return (
    <>
      <EditTaskDialog
        taskId={rowTaskId}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <TasksContainer css={css}>
        <Header>
          <Heading sType={"4"}>Deal Tasks</Heading>

          <NewTaskDialog dealId={dealId}>
            <IconButton title="Add task" iconSrc={plus.src} sSize={"small"} />
          </NewTaskDialog>
        </Header>

        <Content>
          {tasksData && tasksData?.length > 0
            ? tasksData?.map(({ id, title, due_date, completed }) => {
                return (
                  <button
                    key={id}
                    style={{ all: "unset" }}
                    onClick={() => handleEdit(id)}
                  >
                    <TaskItem
                      css={{ cursor: "pointer" }}
                      title={title}
                      due_date={due_date}
                      completed={completed}
                    />
                  </button>
                );
              })
            : !tasksLoad && (
                <NoData icon={tasks.src} message="No tasks found" alignY />
              )}

          {tasksLoad && !tasksData
            ? Array.from(
                {
                  length: 12,
                },
                (_, index) => <Skeleton height="4rem" key={index} />
              )
            : null}
        </Content>
      </TasksContainer>
    </>
  );
};

const TasksContainer = styled("div", {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",

  borderRadius: theme.radii.md,
});

const Header = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
});

const Content = styled("div", {
  height: "100%",

  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",

  overflow: "auto",

  borderRadius: theme.radii.md,
  _border: "All",
  borderColor: theme.colors.background3,
});
