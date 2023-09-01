import { loginAdm, property, schedule, userAdm } from "../../mocks";
import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import { app } from "../../app";
import request from "supertest";

describe("Testing all schedule routes", () => {
  let connection: DataSource;
  let login: any;
  let token: string;
  let createdProperty: any;
  let createdSchedule: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during DataSource initialization", err)
      );
    await request(app).post("/api/users/signup").send(userAdm);

    login = await request(app).post("/api/signin").send(loginAdm);

    token = login.body.token;

    createdProperty = await request(app)
      .post("/api/properties")
      .send(property)
      .set("Authorization", `Bearer ${token}`);

    createdSchedule = await request(app)
      .post(`/api/schedules/${createdProperty.body.id}`)
      .send(schedule)
      .set("Authorization", `Bearer ${token}`);
  });

  afterAll(async () => await connection.destroy());

  test("Must be able to create a schedule", async () => {
    expect(createdSchedule.status).toBe(201);

    expect(createdSchedule.body).toHaveProperty("id");
    expect(createdSchedule.body).toHaveProperty("date");
    expect(createdSchedule.body).toHaveProperty("hour");
    expect(createdSchedule.body).toHaveProperty("property");
    expect(createdSchedule.body).toHaveProperty("created_at");
  });

  test("Must prevent creating a tokenless schedule", async () => {
    const response = await request(app)
      .post(`/api/schedules/${createdSchedule.body.id}`)
      .send(schedule);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("Must prevent creating a schedule with invalid property id", async () => {
    const response = await request(app)
      .post("/api/schedules/05a429c8-ca25-4007-8854-25c25f734167")
      .send(schedule)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("Must be able to specific a schedule", async () => {
    const response = await request(app)
      .get(`/api/schedules/${createdSchedule.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("hour");
    expect(response.body).toHaveProperty("property");
    expect(response.body).toHaveProperty("created_at");
  });

  test("Must prevent specified a tokenless schedule", async () => {
    const response = await request(app).get(
      `/api/schedules/${createdSchedule.body.id}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("Must prevent specified a schedule with invalid property id", async () => {
    const response = await request(app)
      .get("/api/schedules/999")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("Must be able to delete a schedule", async () => {
    const response = await request(app)
      .delete(`/api/schedules/${createdSchedule.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  test("Must prevent deletion a tokenless schedule", async () => {
    const response = await request(app).delete(
      `/api/schedules/${createdSchedule.body.id}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("Must prevent deletion a schedule with invalid property id", async () => {
    const response = await request(app)
      .delete("/api/schedules/99")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
