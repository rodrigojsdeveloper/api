import { IAddress, IAddressUpdate } from "./address.interface";

interface IProperty {
  value: number;
  size: number;
  address: IAddress;
}

interface IPropertyUpdate {
  value?: number;
  size?: number;
  address?: IAddressUpdate;
}

export { IProperty, IPropertyUpdate };
