import { IUser } from "../../interfaces/user.interface";

const userAdm: IUser = {
  name: "johndoe",
  email: "johndoe@org.com",
  password: "johndoe@123",
  is_adm: true,
};

const userNotAdm: IUser = {
  name: "example",
  email: "example@org.com",
  password: "example@123",
  is_adm: false,
};

export { userAdm, userNotAdm };
