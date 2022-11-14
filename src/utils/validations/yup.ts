import { CustomerForm, DealForm, TaskForm } from "@/types";
import { boolean, object, SchemaOf, string } from "yup";

export const signInFormSchema = object().shape({
  username: string().required("Username required"),
  password: string().required("Password required"),
});

export const dealFormSchema: SchemaOf<DealForm> = object({
  title: string().required("Field required"),
  description: string().required("Field required"),
  price: string().required("Field required").min(2, "Field required"),

  customer: object({
    id: string().required("Select a customer"),
    name: string().required("Select a customer"),
  }).required("Select a customer"),
  customerId: string(),

  status: object({
    label: string()
      .equals(["Closed", "In Progress"], "Wrong value")
      .required("Select a option"),
    value: string()
      .equals(["1", "2"], "Wrong value")
      .required("Select a option"),
  }).required("Select a option"),
});

export const customerFormSchema: SchemaOf<CustomerForm> = object({
  name: string().required("Name is required."),
  email: string().required("Email is required.").email("Invalid email"),
  phone: string()
    .required("Phone is required.")
    .matches(/(\d{3})-(\d{3})-(\d{4})$/, { message: "Invalid number" }),
});

export const taskFormSchema: SchemaOf<TaskForm> = object({
  title: string().required("Field required"),
  due_date: string().required("Chose a due date"),
  completed: boolean(),
});
