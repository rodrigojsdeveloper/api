import { PropertiesServices } from "../../../services/properties.service";
import { property, updatedProperty, userAdm } from "../../../mocks";
import { UsersServices } from "../../../services/users.service";
import { AppDataSource } from "../../../data-source";
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

  it("Must be able to update a property", async () => {
    const user = await new UsersServices().create(userAdm);

    const createProperty = await new PropertiesServices().create(
      property,
      user.email
    );

    const result = await new PropertiesServices().update(
      updatedProperty,
      createProperty.id
    );

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("size");
    expect(result).toHaveProperty("value");
    expect(result).toHaveProperty("sold");
    expect(result).toHaveProperty("created_at");
    expect(result).toHaveProperty("updated_at");
    expect(result).toHaveProperty("schedules");
  });
});
