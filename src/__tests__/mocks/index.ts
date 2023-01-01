import { iLogin } from "../../interfaces/login.interface";
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

const loginAdm: iLogin = {
  email: "johndoe@org.com",
  password: "johndoe@123",
};

const loginNotAdm: iLogin = {
  email: "example@org.com",
  password: "example@123",
};

export { userAdm, userNotAdm, loginAdm, loginNotAdm };
