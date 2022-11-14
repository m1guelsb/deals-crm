export interface Task {
  id: string;
  title: string;
  due_date: string;
  completed?: boolean;
  dealId?: string;
}
export interface TaskForm extends Omit<Task, "id" | "dealId"> {}
