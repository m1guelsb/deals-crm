export interface Task {
  id: string;
  title: string;
  dueDate: string;
  isCompleted?: boolean;
  dealId?: string;
}
export interface TaskForm extends Omit<Task, "id" | "dealId"> {}
