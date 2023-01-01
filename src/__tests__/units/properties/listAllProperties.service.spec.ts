import { listAllPropertiesService } from "../../../services/properties/listAllProperties.service";
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

  it("Must be able to list properties", async () => {
    const result = await listAllPropertiesService();

    expect(result).toHaveProperty("map");
  });
});
