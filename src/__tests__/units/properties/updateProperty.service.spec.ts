import { createPropertyService } from "../../../services/properties/createProperty.service";
import { updatePropertyService } from "../../../services/properties/updateProperty.service";
import { createUserService } from "../../../services/users/createUser.service";
import { property, updatedProperty, userAdm } from "../../../mocks";
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

  it("Must be able to specific a property", async () => {
    const user = await createUserService(userAdm);

    const createProperty = await createPropertyService(property, user.email);

    const result = await updatePropertyService(
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
