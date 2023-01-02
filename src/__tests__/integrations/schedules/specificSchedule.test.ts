import { loginAdm, property, schedule, userAdm } from "../../../mocks";
import { AppDataSource } from "../../../data-source";
import { DataSource } from "typeorm";
import { app } from "../../../app";
import request from "supertest";

describe("Tests for schedules routes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during DataSource initialization", err)
      );

    await request(app).post("/users/signup").send(userAdm);
  });

  afterAll(async () => await connection.destroy());

  test("Must be able to specific a schedule", async () => {
    const login = await request(app).post("/signin").send(loginAdm);

    const token: string = login.body.token;

    const createProperty = await request(app)
      .post("/properties")
      .send(property)
      .set("Authorization", `Bearer ${token}`);

    const createSchedule = await request(app)
      .post(`/schedules/${createProperty.body.id}`)
      .send(schedule)
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .get(`/schedules/${createSchedule.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("date");
    expect(response.body).toHaveProperty("hour");
    expect(response.body).toHaveProperty("property");
    expect(response.body).toHaveProperty("created_at");
  });

  test("Must prevent specified a tokenless schedule", async () => {
    const login = await request(app).post("/signin").send(loginAdm);

    const token: string = login.body.token;

    const createProperty = await request(app)
      .post("/properties")
      .send(property)
      .set("Authorization", `Bearer ${token}`);

    const createSchedule = await request(app)
      .post(`/schedules/${createProperty.body.id}`)
      .send(schedule)
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app).get(
      `/schedules/${createSchedule.body.id}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("Must prevent specified a schedule with invalid property id", async () => {
    const login = await request(app).post("/signin").send(loginAdm);

    const token: string = login.body.token;

    const response = await request(app)
      .get("/schedules/67")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
