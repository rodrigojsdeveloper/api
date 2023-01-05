import { runSeeder, Seeder, SeederFactoryManager } from "typeorm-extension";
import { DataSource } from "typeorm";

const MainSeeder = class UserSeerder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    await runSeeder(dataSource, UserSeerder);
  }
};

export { MainSeeder };
