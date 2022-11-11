import Link from "next/link";
import { LinkButton } from "@/components/form";
import { Heading } from "@/components/typography";
import { CSS, styled, theme } from "@/styles/stitches.config";
import { Task as TaskItem } from "@/components/data-display";
import type { Task } from "@/types";
import { NoData, Skeleton } from "@/components/feedback";
import { tasks } from "@/assets/icons";

interface DueTasksProps {
  tasksData: Task[] | undefined;
  isLoading: boolean;
  css?: CSS;
}
export const DueTasks = ({ tasksData, isLoading, css }: DueTasksProps) => {
  return (
    <DueTasksContainer css={css}>
      <Header>
        <Heading sType={"4"}>Due Tasks</Heading>
        <LinkButton label="View All" href="/app/tasks" />
      </Header>

      <Content>
        {tasksData?.map(({ id, title, due_date, completed }) => {
          return (
            <Link href={`/app/tasks/${id}`} key={id}>
              <a style={{ color: "unset", textDecoration: "none" }}>
                <TaskItem
                  css={{ cursor: "pointer" }}
                  title={title}
                  due_date={due_date}
                  completed={completed}
                />
              </a>
            </Link>
          );
        })}

        {tasksData?.length === 0 && (
          <NoData icon={tasks.src} message="No tasks found" alignY />
        )}

        {isLoading && !tasksData
          ? Array(5)
              .fill({})
              .map((item, index) => <Skeleton height="2.5rem" key={index} />)
          : null}
      </Content>
    </DueTasksContainer>
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
});
