export interface Deal {
  id: number;
  customerId: number;
  title: string;
  description: string;
  price: string;
  status:
    | { label: "Closed"; value: "closed" }
    | { label: "In Progress"; value: "inprogress" };
}

export interface DealForm extends Omit<Deal, "id"> {}
