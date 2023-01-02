import { AppDataSource } from "../../../data-source";
import { userAdm } from "../../../mocks";
import { DataSource } from "typeorm";
import { app } from "../../../app";
import request from "supertest";

describe("Tests for users routes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during DataSource initialization", err)
      );
  });

  afterAll(async () => await connection.destroy());

  test("Must be able to deactive user", async () => {
    const createUser = await request(app).post("/users/signup").send(userAdm);

    const response = await request(app).delete(`/users/${createUser.body.id}`);

    expect(response.status).toBe(204);
  });

  test("Must prevent deactivate user with invalid id", async () => {
    const response = await request(app).delete(
      "/users/05a429c8-ca25-4007-8854-25c25f734167"
    );

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
