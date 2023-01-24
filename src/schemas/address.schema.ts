import { IAddress } from "../interfaces/address.interface";
import { SchemaOf } from "yup";
import * as yup from "yup";

const addressSchema: SchemaOf<IAddress> = yup.object().shape({
  zip_code: yup
    .string()
    .required("zip_code is a required field")
    .max(8, "Maximum 8 caracters"),
  country: yup.string().required("country is a required field"),
  state: yup.string().required("state is a required field"),
  city: yup.string().required("city is a required field"),
  district: yup.string().required("district is a required field"),
  street: yup.string().required("street is a required field"),
  number: yup
    .number()
    .required("number is a required field")
    .typeError("number must be a number")
    .positive()
    .integer(),
  complement: yup.string(),
});

export { addressSchema };
