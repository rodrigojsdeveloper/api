import { IAddress } from "./address.interface";

interface IProperty {
  value: number;
  size: number;
  address: IAddress | Partial<IAddress>;
}

export { IProperty };
