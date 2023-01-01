import { createPropertyService } from "../../../services/properties/createProperty.service";
import { deletePropertyService } from "../../../services/properties/deleteProperty.service";
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

  it("Must be able to delete a property", async () => {
    const user = await createUserService(userAdm);

    const createProperty = await createPropertyService(property, user.email);

    const result = await deletePropertyService(createProperty.id);

    expect(result).toBeUndefined();
  });
});
