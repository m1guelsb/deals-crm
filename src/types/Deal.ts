export interface Deal {
  id: string;
  title: string;
  description: string;
  price: number;
  customerId: string;
  status?: "CLOSED" | "IN_PROGRESS";
}

export interface DealForm extends Omit<Deal, "id"> {}
