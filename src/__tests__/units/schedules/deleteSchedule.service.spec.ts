import { createPropertyService } from "../../../services/properties/createProperty.service";
import { deleteScheduleService } from "../../../services/schedules/deleteSchedule.service";
import { createScheduleService } from "../../../services/schedules/createSchedule.service";
import { createUserService } from "../../../services/users/createUser.service";
import { property, schedule, userAdm } from "../../mocks";
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

  it("Must be able to delete schedule", async () => {
    const user = await createUserService(userAdm);

    const createProperty = await createPropertyService(property, user.email);

    const createSchedule = await createScheduleService(
      schedule,
      createProperty.id
    );

    const result = await deleteScheduleService(createSchedule.id);

    expect(result).toBeUndefined();
  });
});
