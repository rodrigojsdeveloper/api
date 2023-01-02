import { PropertiesServices } from "../../../services/properties.service";
import { UsersServices } from "../../../services/users.service";
import { AppDataSource } from "../../../data-source";
import { property, userAdm } from "../../../mocks";
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

  it("Must be able to sell a property", async () => {
    const user = await new UsersServices().create(userAdm);

    const createProperty = await new PropertiesServices().create(
      property,
      user.email
    );

    const result = await new PropertiesServices().sale(createProperty.id);

    expect(result).toHaveProperty("message");
  });
});
