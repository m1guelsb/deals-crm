import { completed, notCompleted, warning } from "@/assets/icons";
import { Icon } from "@/components/media";
import { CSS, styled, theme } from "@/styles/stitches.config";
import { isToday, isTomorrow, format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Task as TaskType } from "@/types";

interface TaskProps extends Omit<TaskType, "id"> {
  css?: CSS;
}

export const Task = ({
  title,
  due_date,
  completed: isCompleted,
  css,
}: TaskProps) => {
  const dueDate = format(new Date(due_date), "dd/MM/yyyy", { locale: ptBR });

  const isClose = isTomorrow(new Date(due_date)) || isToday(new Date(due_date));

  return (
    <TaskContainer css={css}>
      <DueDate dueDate={isClose ? "close" : "far"}>{dueDate}</DueDate>

      <Title title={title}>{title}</Title>

      {isClose && !isCompleted && (
        <DueStatus title="Task date is close">
          <Icon
            src={warning.src}
            css={{ _iconColor: { fill: theme.colors.error } }}
          />
        </DueStatus>
      )}

      {isCompleted ? (
        <DueStatus title="Task completed">
          <Icon
            src={completed.src}
            css={{ _iconColor: { fill: theme.colors.success } }}
          />
        </DueStatus>
      ) : (
        <DueStatus title="Task incompleted">
          <Icon
            src={notCompleted.src}
            css={{ _iconColor: { fill: theme.colors.text2 } }}
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
