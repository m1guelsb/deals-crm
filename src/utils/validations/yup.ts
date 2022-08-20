import { DealForm } from "@/types";
import { number, object, SchemaOf, string } from "yup";

export const signInFormSchema = object().shape({
  username: string().required("Username required"),
  password: string().required("Password required"),
});

export const newDealFormSchema: SchemaOf<DealForm> = object({
  title: string().required("Field required"),
  description: string().required("Field required"),
  price: string().required("Field required").min(2, "Field required"),
  customer: object({
    id: string().required("Select a customer"),
    name: string().required("Select a customer"),
  }).required("Select a customer"),
  status: object({
    label: string()
      .equals(["Closed", "In Progress"], "Wrong value")
      .required("Select a option"),
    value: string()
      .equals(["1", "2"], "Wrong value")
      .required("Select a option"),
  }).required("Select a option"),
});
