export interface Task {
  id: string;
  title: string;
  due_date: string;
  completed: boolean;
  deal?: {
    id: string;
    title: string;
  };
}
export interface TaskForm extends Omit<Task, "id" | "deal"> {}
