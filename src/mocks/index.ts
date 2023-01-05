import { IProperty } from "../interfaces/property.interface";
import { ISchedule } from "../interfaces/schedule.interface";
import { IAddress } from "../interfaces/address.interface";
import { ILogin } from "../interfaces/login.interface";
import { IUser } from "../interfaces/user.interface";

const userAdm: IUser = {
  name: "johndoe",
  email: "johndoe@org.com",
  password: "Johndoe@123",
  is_adm: true,
};

const userNotAdm: IUser = {
  name: "example",
  email: "example@org.com",
  password: "Example@123",
  is_adm: false,
};

const loginAdm: ILogin = {
  email: "johndoe@org.com",
  password: "Johndoe@123",
};

const loginNotAdm: ILogin = {
  email: "example@org.com",
  password: "Example@123",
};

const schedule: ISchedule = {
  date: "02/01/2023",
  hour: "12:09",
};

const address: IAddress = {
  country: "United State",
  state: "Califórnia",
  city: "Mountain View",
  district: "Amphitheatre Pkwy",
  street: "Amphitheatre Pkwy",
  number: 1600,
  complement: "Googleplex",
  zip_code: "94043",
};

const property: IProperty = {
  size: 1000,
  value: 20000,
  address,
};

const updatedProperty: Partial<IProperty> = {
  value: 10000,
};

export {
  userAdm,
  userNotAdm,
  loginAdm,
  loginNotAdm,
  schedule,
  property,
  updatedProperty,
};
