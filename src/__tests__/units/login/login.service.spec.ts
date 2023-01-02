import { createUserService } from "../../../services/users/createUser.service";
import { loginService } from "../../../services/login/login.service";
import { AppDataSource } from "../../../data-source";
import { loginAdm, userAdm } from "../../../mocks";
import { DataSource } from "typeorm";

describe("Tests for login service", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during DataSource initialization", err)
      );

    await createUserService(userAdm);
  });

  afterAll(async () => await connection.destroy());

  it("Must be able to login", async () => {
    const result = await loginService(loginAdm);

    expect(result).toHaveProperty("token");
  });
});
