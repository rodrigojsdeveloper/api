interface IUser {
  name: string;
  email: string;
  password: string;
  is_adm: boolean;
}

interface IUserUpdate {
  name?: string;
  email?: string;
  password?: string;
  is_adm?: boolean;
}

export { IUser, IUserUpdate };
