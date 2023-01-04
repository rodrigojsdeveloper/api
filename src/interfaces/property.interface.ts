import { IAddress } from "./address.interface";

interface IProperty {
  value: number;
  size: number;
  address: IAddress | object | Partial<IAddress>;
}

export { IProperty };
