import Link from "next/link";
import { IconButton, LinkButton } from "@/components/form";
import { Heading } from "@/components/typography";
import { CSS, styled, theme } from "@/styles/stitches.config";
import { Task as TaskItem } from "@/components/data-display";
import type { Task } from "@/types";
import { Skeleton } from "@/components/feedback";
import { useQueryGet } from "@/hooks/api/useQueryGet";
import { plus } from "@/assets/icons";
import { NewTaskDialog } from "@/components/overlay";

interface DealTasksProps {
  dealId: string;
  css?: CSS;
}
export const DealTasks = ({ dealId, css }: DealTasksProps) => {
  const { data: tasksData, isLoading: tasksLoad } = useQueryGet<Task[]>({
    queryKeys: ["deal-tasks", dealId],
    url: `/deals/${dealId}/tasks`,
    queryConfigs: {
      enabled: !!dealId,
    },
  });

  return (
    <TasksContainer css={css}>
      <Header>
        <Heading sType={"4"}>Deal Tasks</Heading>

        <NewTaskDialog dealId={dealId}>
          <IconButton title="Add task" iconSrc={plus.src} sSize={"small"} />
        </NewTaskDialog>
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

        {tasksLoad && !tasksData
          ? Array(5)
              .fill({})
              .map((item, index) => <Skeleton height="2.5rem" key={index} />)
          : null}
      </Content>
    </TasksContainer>
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

  borderRadius: theme.radii.md,
  _border: "All",
  borderColor: theme.colors.background3,
});
