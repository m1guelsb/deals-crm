import { LinkButton } from "@/components/form";
import { Heading } from "@/components/typography";
import { CSS, styled, theme } from "@/styles/stitches.config";
import { Task as TaskItem } from "@/components/data-display";
import type { Task } from "@/types";
import { NoData, Skeleton } from "@/components/feedback";
import { tasks } from "@/assets/icons";
import { useState } from "react";
import { EditTaskDialog } from "@/components/overlay";

interface DueTasksProps {
  tasksData: Task[] | undefined;
  isLoading: boolean;
  css?: CSS;
}
export const DueTasks = ({ tasksData, isLoading, css }: DueTasksProps) => {
  const [rowTaskId, setRowTaskId] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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

      <DueTasksContainer css={css}>
        <Header>
          <Heading sType={"4"}>Due Tasks</Heading>

          {tasksData && tasksData?.length > 0 && (
            <LinkButton label="View All" href="/app/tasks" />
          )}
        </Header>

        <Content>
          {tasksData?.length
            ? tasksData?.map(({ id, title, dueDate, isCompleted }) => {
                return (
                  <TaskItem
                    key={id}
                    onClick={() => handleEdit(id)}
                    title={title}
                    dueDate={dueDate}
                    isCompleted={isCompleted}
                  />
                );
              })
            : !isLoading && (
                <NoData icon={tasks.src} message="No tasks found" alignY />
              )}

          {isLoading && !tasksData
            ? Array.from(
                {
                  length: 4,
                },
                (_, index) => <Skeleton height="4rem" key={index} />
              )
            : null}
        </Content>
      </DueTasksContainer>
    </>
  );
};

const DueTasksContainer = styled("div", {
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

  borderRadius: theme.radii.md,
  _border: "All",
  borderColor: theme.colors.background3,

  overflow: "auto",
});
