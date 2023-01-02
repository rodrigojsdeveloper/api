import { userRepository } from "../repositories/user.repository";
import { BadRequestError } from "../errors/badRequest.error";
import { NotFoundError } from "../errors/notFound.error";
import { Property } from "../entities/property.entity";
import { IUser } from "../interfaces/user.interface";
import { User } from "../entities/user.entity";
import { hash } from "bcrypt";

class UsersServices {
  async create(user: IUser): Promise<User> {
    if (await userRepository.findOneBy({ email: user.email })) {
      throw new BadRequestError("Email already exists");
    }

    const hashedPassword = await hash(user.password, 10);

    const newUser = new User();
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.password = hashedPassword;
    newUser.is_adm = user.is_adm;
    newUser.properties = [];

    userRepository.create(newUser);
    await userRepository.save(newUser);

    Reflect.deleteProperty(newUser, "password");

    return newUser;
  }

  async listProperties(user_id: string): Promise<Array<Property>> {
    const user = await userRepository.findOne({
      where: { id: user_id },
      relations: ["properties"],
    });

    if (!user) {
      throw new NotFoundError("User");
    }

    return user.properties;
  }

  async deactivate(user_id: string): Promise<void> {
    const user = await userRepository.findOneBy({ id: user_id });

    if (!user) {
      throw new NotFoundError("User");
    }

    user.is_active = false;

    await userRepository.save(user);
  }
}

export { UsersServices };
