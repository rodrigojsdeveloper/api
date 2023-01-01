import { allUserPropertiesService } from "../../../services/users/allUserProperties.service";
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

  it("Must be able to list user properties", async () => {
    const user = await createUserService(userAdm);

    const result = await allUserPropertiesService(user.id);

    expect(result).toHaveProperty("map");
  });
});
