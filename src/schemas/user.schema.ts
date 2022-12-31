import { IUser } from "../interfaces/user.interface";
import { SchemaOf } from "yup";
import * as yup from "yup";

const userSchema: SchemaOf<IUser> = yup.object().shape({
  name: yup.string().required("name required"),
  email: yup.string().required("email required").email("Invalid email"),
  password: yup
    .string()
    .required("password required")
    .min(8, "Minimum 8 caracters")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#])(?:([0-9a-zA-Z$*&@#])(?!\1)){8,}$/i,
      "Password requires uppercase, lowercase, numbers, and special characters"
    ),
  is_adm: yup.boolean().required("is_adm required"),
});

export { userSchema };
