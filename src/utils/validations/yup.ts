import { DealForm } from "@/types";
import { number, object, SchemaOf, string } from "yup";

export const signInFormSchema = object().shape({
  username: string().required("Username required"),
  password: string().required("Password required"),
});

export const newDealFormSchema: SchemaOf<DealForm> = object({
  customerId: number().required("Select a customer"),
  title: string().required("Field required"),
  description: string().required("Field required"),
  price: string().required("Field required"),
  status: object({
    label: string()
      .equals(["In Progress", "Closed"], "Select a option")
      .required("Select a option"),
    value: string()
      .equals(["inprogress", "closed"], "Select a option")
      .required("Select a option"),
  }).required("Select a option"),
});
