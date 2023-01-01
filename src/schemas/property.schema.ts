import { IProperty } from "../interfaces/property.interface";
import { SchemaOf } from "yup";
import * as yup from "yup";

const propertySchema: SchemaOf<IProperty> = yup.object().shape({
  value: yup.number().required("value required"),
  size: yup.number().required("size required"),
});

export { propertySchema };
