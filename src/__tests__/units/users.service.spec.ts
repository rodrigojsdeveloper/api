import { UsersServices } from "../../services/users.service";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { userAdm } from "../../mocks";
import { DataSource } from "typeorm";

describe("Testing all user services", () => {
  let connection: DataSource;
  let createdUser: User;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during DataSource initialization", err)
      );

    createdUser = await new UsersServices().create(userAdm);
  });

  afterAll(async () => await connection.destroy());

  it("Must be able to create a user", async () => {
    expect(createdUser).toHaveProperty("id");
    expect(createdUser).toHaveProperty("name");
    expect(createdUser).toHaveProperty("email");
    expect(createdUser).not.toHaveProperty("password");
    expect(createdUser).toHaveProperty("is_adm");
    expect(createdUser).toHaveProperty("is_active");
    expect(createdUser).toHaveProperty("created_at");
    expect(createdUser).toHaveProperty("updated_at");
    expect(createdUser).toHaveProperty("properties");
  });

  it("Must be able to list user properties", async () => {
    const result = await new UsersServices().listProperties(createdUser.id);

    expect(result).toHaveProperty("map");
  });

  it("Must be able to deactive a user", async () => {
    const result = await new UsersServices().deactivate(createdUser.id);

    expect(result).toBeUndefined();
  });
});
