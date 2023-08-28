import { PropertiesServices } from "../../services/properties.service";
import { property, updatedProperty, userAdm } from "../../mocks";
import { UsersServices } from "../../services/users.service";
import { Property } from "../../entities/property.entity";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { DataSource } from "typeorm";

describe("Testing all property services", () => {
  let connection: DataSource;
  let createdUser: User;
  let createdProperty: Property;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during DataSource initialization", err)
      );

    createdUser = await new UsersServices().create(userAdm);

    createdProperty = await new PropertiesServices().create(
      property,
      createdUser.email
    );
  });

  afterAll(async () => await connection.destroy());

  it("Must be able to create a property", async () => {
    const result = await new PropertiesServices().create(
      property,
      createdUser.email
    );

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("size");
    expect(result).toHaveProperty("value");
    expect(result).toHaveProperty("sold");
    expect(result).toHaveProperty("created_at");
    expect(result).toHaveProperty("updated_at");
    expect(result).toHaveProperty("schedules");
  });

  it("Must be able to list properties", async () => {
    const result = await new PropertiesServices().list();

    expect(result).toHaveProperty("map");
  });

  it("Must be able to specific a property", async () => {
    const result = await new PropertiesServices().specific(createdProperty.id);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("size");
    expect(result).toHaveProperty("value");
    expect(result).toHaveProperty("sold");
    expect(result).toHaveProperty("created_at");
    expect(result).toHaveProperty("updated_at");
    expect(result).toHaveProperty("schedules");
  });

  it("Must be able to update a property", async () => {
    const result = await new PropertiesServices().update(
      updatedProperty,
      createdProperty.id
    );

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("size");
    expect(result).toHaveProperty("value");
    expect(result).toHaveProperty("sold");
    expect(result).toHaveProperty("created_at");
    expect(result).toHaveProperty("updated_at");
    expect(result).toHaveProperty("schedules");
  });

  it("Must be able to sell a property", async () => {
    const result = await new PropertiesServices().sale(createdProperty.id);

    expect(result).toHaveProperty("message");
  });

  it("Must be able to delete a property", async () => {
    const result = await new PropertiesServices().delete(createdProperty.id);

    expect(result).toBeUndefined();
  });
});
