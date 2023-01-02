import { loginAdm, property, userAdm, userNotAdm } from "../../../mocks";
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

  test("Must be able to list properties", async () => {
    const login = await request(app).post("/signin").send(loginAdm);

    const token: string = login.body.token;

    const response = await request(app)
      .get("/properties")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });

  test("Must prevent listing a tokenless properties", async () => {
    const response = await request(app).get("/properties");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });
});
