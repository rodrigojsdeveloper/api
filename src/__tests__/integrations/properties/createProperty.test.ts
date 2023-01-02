import { loginAdm, loginNotAdm, property, schedule, userAdm, userNotAdm } from "../../mocks";
import { AppDataSource } from "../../../data-source";
import { DataSource } from "typeorm";
import { app } from "../../../app";
import request from "supertest";

describe("Tests for properties routes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during DataSource initialization", err)
      );
    await request(app).post("/users/signup").send(userAdm);
    await request(app).post("/users/signup").send(userNotAdm);
  });

  afterAll(async () => await connection.destroy());

  test("Must be able to create a property", async () => {
    const login = await request(app).post("/signin").send(loginAdm);

    const token: string = login.body.token;

    const response = await request(app)
      .post("/properties")
      .send(property)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("value");
    expect(response.body).toHaveProperty("size");
    expect(response.body).toHaveProperty("sold");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
    expect(response.body).toHaveProperty("schedules");
    expect(response.body).toHaveProperty("user");
  });

  test("Must prevent creating a tokenless property", async () => {
    const response = await request(app)
      .post("/properties")
      .send(property);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("Must prevent the creation of a property with a user that is not admin", async () => {
    const login = await request(app).post("/signin").send(loginNotAdm);

    const token: string = login.body.token;

    const response = await request(app)
      .post("/properties")
      .send(property)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });
});
