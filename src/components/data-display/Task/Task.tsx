import { warning } from "@/assets/icons";
import { Icon } from "@/components/media";
import { CSS, styled, theme } from "@/styles/stitches.config";
import { isTomorrow } from "date-fns";
import type { Task as TaskType } from "@/types";

interface TaskProps extends Omit<TaskType, "id"> {
  css?: CSS;
}

export const Task = ({ title, due_date, completed, css }: TaskProps) => {
  const dueDate = new Date(due_date).toLocaleDateString("en-US", {
    dateStyle: "medium",
  });

  const isClose =
    isTomorrow(new Date(dueDate)) ||
    new Date().getDate() === new Date(due_date).getDate();

  return (
    <TaskContainer css={css}>
      <DueDate dueDate={isClose ? "close" : "far"}>{dueDate}</DueDate>

      <Title title={title}>{title}</Title>

      {isClose && (
        <DueStatus>
          <Icon
            src={warning.src}
            css={{ _iconColor: { fill: theme.colors.error } }}
          />
        </DueStatus>
      )}
    </TaskContainer>
  );
};

const TaskContainer = styled("span", {
  "height": "2.5rem",
  "display": "flex",
  "alignItems": "center",
  "gap": "0.5rem",

  "_paddingX": "1rem",

  "borderRadius": theme.radii.sm,

  "&:hover": {
    backgroundColor: theme.colors.background3,
  },
});

const DueDate = styled("span", {
  minWidth: "6.5rem",

  variants: {
    dueDate: {
      far: {
        color: theme.colors.text2,
      },
      close: {
        color: theme.colors.error,
      },
    },
  },
});

const DueStatus = styled("span", {
  _alignCenter: true,
  gap: "0.5rem",

  color: theme.colors.error,
});

const Title = styled("span", {
  width: "100%",
  alignItems: "center",
  textAlign: "left",
  _truncate: true,
});
