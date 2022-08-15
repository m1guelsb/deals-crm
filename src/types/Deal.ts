export interface Deal {
  id: string;
  title: string;
  description: string;
  price: string;
  customer: {
    id: string;
    name: string;
  };
  status: { label: "Closed" | "In Progress"; value: "1" | "2" };
}

export interface DealForm extends Omit<Deal, "id"> {}
