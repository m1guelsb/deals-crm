import { CustomerForm, TaskForm } from "@/types";
import { boolean, object, SchemaOf, string } from "yup";

export const signInFormSchema = object().shape({
  email: string().max(255).email("Invalid email").required("Email required"),
  password: string().max(255).required("Password required"),
});

export const signUpFormSchema = object().shape({
  name: string().max(100).required("Name required"),
  email: string().max(255).email("Invalid email").required("Email required"),
  password: string().min(6).max(255).required("Password required"),
});

export const dealFormSchema = object({
  title: string().max(100).required("Field required"),
  description: string().max(100).required("Field required"),
  price: string().required("Field required").min(2, "Field required"),
  customerId: string().required("Select a customer"),
  status: string().equals(["CLOSED", "IN_PROGRESS"], "Wrong value"),
});

export const customerFormSchema: SchemaOf<CustomerForm> = object({
  name: string().max(100).required("Name is required."),
  email: string()
    .max(255)
    .required("Email is required.")
    .email("Invalid email"),
  phone: string()
    .required("Phone is required.")
    .matches(/(\d{3})-(\d{3})-(\d{4})$/, { message: "Invalid number" }),
});

export const taskFormSchema: SchemaOf<TaskForm> = object({
  title: string().max(100).required("Field required"),
  dueDate: string().max(10).required("Chose a due date"),
  isCompleted: boolean(),
});
