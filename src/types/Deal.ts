export interface Deal {
  id: number;
  title: string;
  description: string;
  price: string;
  status: "closed" | "inprogress";
}
