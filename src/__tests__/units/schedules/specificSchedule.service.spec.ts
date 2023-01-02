import { PropertiesServices } from "../../../services/properties.service";
import { SchedulesServices } from "../../../services/schedules.service";
import { UsersServices } from "../../../services/users.service";
import { property, schedule, userAdm } from "../../../mocks";
import { AppDataSource } from "../../../data-source";
import { DataSource } from "typeorm";

describe("Tests for schedule service", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during DataSource initialization", err)
      );
  });

  afterAll(async () => await connection.destroy());

  it("Must be able to specific schedule", async () => {
    const user = await new UsersServices().create(userAdm);

    const createProperty = await new PropertiesServices().create(
      property,
      user.email
    );

    const createSchedule = await new SchedulesServices().create(
      schedule,
      createProperty.id
    );

    const result = await new SchedulesServices().specific(createSchedule.id);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("date");
    expect(result).toHaveProperty("hour");
    expect(result).toHaveProperty("property");
    expect(result).toHaveProperty("created_at");
  });
});
