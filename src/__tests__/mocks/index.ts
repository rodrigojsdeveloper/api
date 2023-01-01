import { ISchedule } from "../../interfaces/schedule.interface";
import { IProperty } from "../../interfaces/property.interface";
import { ILogin } from "../../interfaces/login.interface";
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

const loginAdm: ILogin = {
  email: "johndoe@org.com",
  password: "johndoe@123",
};

const loginNotAdm: ILogin = {
  email: "example@org.com",
  password: "example@123",
};

const schedule: ISchedule = {
  date: "02/01/2023",
  hour: "12:09"
};

const property: IProperty = {
  size: 1000,
  value: 20000
}

export { userAdm, userNotAdm, loginAdm, loginNotAdm, schedule, property };
