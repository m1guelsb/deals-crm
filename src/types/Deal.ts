export interface Deal {
  id: number;
  customerId: number;
  title: string;
  description: string;
  price: string;
  status: "closed" | "inprogress";
}
