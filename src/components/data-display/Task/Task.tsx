import { completed, notCompleted, warning } from "@/assets/icons";
import { Icon } from "@/components/media";
import { styled, theme } from "@/styles/stitches.config";
import { isToday, isTomorrow, format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Task as TaskType } from "@/types";
import { ComponentProps } from "react";

interface TaskProps
  extends ComponentProps<typeof TaskContainer>,
    Omit<TaskType, "id"> {
  title: string;
}

export const Task = ({
  title,
  dueDate,
  isCompleted,
  css,
  ...props
}: TaskProps) => {
  const due = format(parseISO(dueDate), "dd/MM/yyyy", { locale: ptBR });

  const isClose = isTomorrow(parseISO(dueDate)) || isToday(parseISO(dueDate));

  return (
    <TaskContainer css={css} {...props}>
      <DueDate dueDate={isClose ? "close" : "far"}>{due}</DueDate>

      <Title title={title}>{title}</Title>

      {isCompleted ? (
        <DueStatus title="Task completed">
          <Icon
            src={completed.src}
            css={{ _iconColor: { fill: theme.colors.success } }}
          />
        </DueStatus>
      ) : !isCompleted && isClose ? (
        <DueStatus title="Task date is close">
          <Icon
            src={warning.src}
            css={{ _iconColor: { fill: theme.colors.error } }}
          />
        </DueStatus>
      ) : (
        <DueStatus title="Task uncompleted">
          <Icon
            src={notCompleted.src}
            css={{ _iconColor: { fill: theme.colors.text2 } }}
          />
        </DueStatus>
      )}
    </TaskContainer>
  );
};

const TaskContainer = styled("button", {
  height: "2.5rem",
  width: "100%",
  display: "flex",
  alignItems: "center",
  gap: "2rem",
  _paddingX: "1rem",
  borderRadius: theme.radii.sm,
  cursor: "pointer",
  backgroundColor: "$background1",
  color: "$text1",
  outline: "none",
  border: "none",
  "&:hover": {
    backgroundColor: theme.colors.background3,
  },
});

const DueDate = styled("span", {
  width: "4rem",
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
