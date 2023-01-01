import { DataSource } from "typeorm";

require("dotenv").config();

const port = process.env.POSTGRES_PORT as number | undefined;

const AppDataSource = new DataSource(
  process.env.NODE_ENV == "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        entities: [`${__dirname}/**/entities/*.{ts,js}`],
        synchronize: true,
      }
    : {
        type: "postgres",
        host: process.env.POSTGRES_HOST,
        port: port,
        username: process.env.POSTGRES_USERNAME,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DATABASE,
        synchronize: false,
        entities: [`${__dirname}/**/entities/*.{ts,js}`],
        migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
      }
);

export { AppDataSource };
