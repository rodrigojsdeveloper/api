import { createPropertyService } from "../../../services/properties/createProperty.service";
import { createUserService } from "../../../services/users/createUser.service";
import { AppDataSource } from "../../../data-source";
import { property, userAdm } from "../../mocks";
import { DataSource } from "typeorm";

describe("Tests for property service", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during DataSource initialization", err)
      );
  });

  afterAll(async () => await connection.destroy());

  it("Must be able to create a property", async () => {
    const user = await createUserService(userAdm);

    const result = await createPropertyService(property, user.email);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("size");
    expect(result).toHaveProperty("value");
    expect(result).toHaveProperty("sold");
    expect(result).toHaveProperty("created_at");
    expect(result).toHaveProperty("updated_at");
    expect(result).toHaveProperty("user");
    expect(result).toHaveProperty("schedules");
  });
});
