import { userRepository } from "../../repositories/user.repository";
import { IUser } from "../../interfaces/user.interface";
import { User } from "../../entities/user.entity";
import { hash } from "bcrypt";

const createUserService = async (user: IUser): Promise<User> => {
  const hashedPassword = await hash(user.password, 10);

  const newUser = new User();
  newUser.name = user.name;
  newUser.email = user.email;
  newUser.password = hashedPassword;
  newUser.is_adm = user.is_adm;

  userRepository.create(newUser);
  await userRepository.save(newUser);

  Reflect.deleteProperty(newUser, "password");

  return newUser;
};

export { createUserService };