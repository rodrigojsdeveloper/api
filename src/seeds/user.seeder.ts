import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { IUser } from "../interfaces/user.interface";
import { User } from "../entities/user.entity";
import { DataSource } from "typeorm";
import { hash } from "bcrypt";

const UserSeerder = class UserSeerder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const userRepository = dataSource.getRepository(User);

    const user: IUser = {
      name: "johndoe",
      email: "johndoe@org.com",
      password: await hash("Johndoe@123", 10),
      is_adm: true,
    };

    const anotherUser: IUser = {
      name: "example",
      email: "example@org.com",
      password: await hash("Example@123", 10),
      is_adm: false,
    };

    if (!(await userRepository.findOneBy({ email: user.email }))) {
      const createdUser = userRepository.create(user);
      await userRepository.save(createdUser);
    }

    if (!(await userRepository.findOneBy({ email: anotherUser.email }))) {
      const createdAnotherUser = userRepository.create(anotherUser);
      await userRepository.save(createdAnotherUser);
    }
  }
};

export { UserSeerder };
