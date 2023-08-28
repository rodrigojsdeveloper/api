import { PropertiesServices } from "../../services/properties.service";
import { SchedulesServices } from "../../services/schedules.service";
import { UsersServices } from "../../services/users.service";
import { property, schedule, userAdm } from "../../mocks";
import { Schedule } from "../../entities/schedule.entity";
import { Property } from "../../entities/property.entity";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { DataSource } from "typeorm";

describe("Testing all schedule services", () => {
  let connection: DataSource;
  let createdUser: User;
  let createdProperty: Property;
  let createdSchedule: Schedule;

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

    createdSchedule = await new SchedulesServices().create(
      schedule,
      createdProperty.id
    );
  });

  afterAll(async () => await connection.destroy());

  it("Must be able to create a schedule", async () => {
    schedule.hour = "16:30";

    const result = await new SchedulesServices().create(
      schedule,
      createdProperty.id
    );

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("date");
    expect(result).toHaveProperty("hour");
    expect(result).toHaveProperty("property");
    expect(result).toHaveProperty("created_at");
  });

  it("Must be able to specific schedule", async () => {
    const result = await new SchedulesServices().specific(createdSchedule.id);

    expect(result).toHaveProperty("id");
    expect(result).toHaveProperty("date");
    expect(result).toHaveProperty("hour");
    expect(result).toHaveProperty("property");
    expect(result).toHaveProperty("created_at");
  });

  it("Must be able to delete schedule", async () => {
    const result = await new SchedulesServices().delete(createdSchedule.id);

    expect(result).toBeUndefined();
  });
});
