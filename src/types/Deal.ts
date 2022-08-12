export interface Deal {
  id: string;
  title: string;
  description: string;
  price: string;
  customer: {
    id: string;
    name: string;
  };
  status:
    | { label: "Closed"; value: "1" }
    | { label: "In Progress"; value: "2" };
}

export interface DealForm extends Omit<Deal, "id"> {}
