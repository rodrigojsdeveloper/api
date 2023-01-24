import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import { MainSeeder } from "./seeds/main.seeder";

require("dotenv").config();

const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: false,
  entities: [`${__dirname}/**/entities/*.{ts,js}`],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  seeds: [MainSeeder],
};

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        entities: [`${__dirname}/**/entities/*.{ts,js}`],
        synchronize: true,
      }
    : options
);

export { AppDataSource };
