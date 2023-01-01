import { userRepository } from "../../repositories/user.repository";
import { IUser } from "../../interfaces/user.interface";
import { User } from "../../entities/user.entity";
import { BadRequestError } from "../../helpers";
import { hash } from "bcrypt";

const createUserService = async (user: IUser): Promise<User> => {
  if (await userRepository.findOneBy({ email: user.email })) {
    throw new BadRequestError("Email already exists");
  }

  const hashedPassword = await hash(user.password, 10);

  const newUser = new User();
  newUser.name = user.name;
  newUser.email = user.email;
  newUser.password = hashedPassword;
  newUser.is_adm = user.is_adm;
  newUser.schedules = [];

  userRepository.create(newUser);
  await userRepository.save(newUser);

  Reflect.deleteProperty(newUser, "password");

  return newUser;
};

export { createUserService };
