import { IUser } from "../interfaces/user.interface";
import { SchemaOf } from "yup";
import * as yup from "yup";

const userSchema: SchemaOf<IUser> = yup.object().shape({
  name: yup.string().required("name required"),
  email: yup.string().required("email required"),
  password: yup.string().required("password required"),
  is_adm: yup.boolean().required("is_adm required"),
});

export { userSchema };
