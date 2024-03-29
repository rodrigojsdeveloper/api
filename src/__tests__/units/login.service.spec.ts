import { UsersService } from "../../services/users.service";
import { LoginService } from "../../services/login.service";
import { AppDataSource } from "../../data-source";
import { loginAdm, userAdm } from "../../mocks";
import { DataSource } from "typeorm";

describe("Testing all login services", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during DataSource initialization", err)
      );

    await new UsersService().create(userAdm);
  });

  afterAll(async () => await connection.destroy());

  it("Must be able to login", async () => {
    const result = await new LoginService().create(loginAdm);

    expect(result).toHaveProperty("token");
  });
});
