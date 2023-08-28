import { UsersServices } from "../../services/users.service";
import { LoginServices } from "../../services/login.service";
import { AppDataSource } from "../../data-source";
import { loginAdm, userAdm } from "../../mocks";
import { DataSource } from "typeorm";

describe("Tests for login service", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during DataSource initialization", err)
      );

    await new UsersServices().create(userAdm);
  });

  afterAll(async () => await connection.destroy());

  it("Must be able to login", async () => {
    const result = await new LoginServices().create(loginAdm);

    expect(result).toHaveProperty("token");
  });
});
