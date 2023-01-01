import { createUserService } from "../../../services/users/createUser.service";
import { AppDataSource } from "../../../data-source";
import { userAdm } from "../../mocks";
import { DataSource } from "typeorm";

describe("Tests for user service", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during DataSource initialization", err)
      );
  });

  afterAll(async () => await connection.destroy());

  it("Must be able to create a user", async () => {
    const result = await createUserService(userAdm);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("name");
    expect(result).toHaveProperty("email");
    expect(result).not.toHaveProperty("password");
    expect(result).toHaveProperty("is_adm");
    expect(result).toHaveProperty("is_active");
    expect(result).toHaveProperty("created_at");
    expect(result).toHaveProperty("updated_at");
    expect(result).toHaveProperty("properties");
  });
});
