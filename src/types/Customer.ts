export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string;
}

export interface CustomerForm extends Omit<Customer, "id" | "image"> {}
