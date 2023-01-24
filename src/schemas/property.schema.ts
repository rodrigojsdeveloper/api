import { IProperty } from "../interfaces/property.interface";
import { addressSchema } from "./address.schema";
import { SchemaOf } from "yup";
import * as yup from "yup";

const propertySchema: SchemaOf<IProperty> = yup.object().shape({
  value: yup.number().required("value required"),
  size: yup.number().required("size required"),
  address: addressSchema,
});

export { propertySchema };
