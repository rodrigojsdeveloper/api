import {
  loginAdm,
  loginNotAdm,
  property,
  updatedProperty,
  userAdm,
  userNotAdm,
} from "../../../mocks";
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

  test("Must be able to update a property", async () => {
    const login = await request(app).post("/signin").send(loginAdm);

    const token: string = login.body.token;

    const createProperty = await request(app)
      .post("/properties")
      .send(property)
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .patch(`/properties/${createProperty.body.id}`)
      .send(updatedProperty)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("value");
    expect(response.body).toHaveProperty("size");
    expect(response.body).toHaveProperty("sold");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
    expect(response.body).toHaveProperty("schedules");
  });

  test("Must prevent updated a tokenless property", async () => {
    const createProperty = await request(app)
      .post("/properties")
      .send(property);

    const response = await request(app)
      .patch(`/properties/${createProperty.body.id}`)
      .send(updatedProperty);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("Must prevent the updation of a property with a user that is not admin", async () => {
    const login = await request(app).post("/signin").send(loginNotAdm);

    const token: string = login.body.token;

    const createProperty = await request(app)
      .post("/properties")
      .send(property)
      .set("Authorization", `Bearer ${token}`);

    const response = await request(app)
      .patch(`/properties/${createProperty.body.id}`)
      .send(updatedProperty)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("Must prevent updated a property with invalid id", async () => {
    const login = await request(app).post("/signin").send(loginAdm);

    const token: string = login.body.token;

    const response = await request(app)
      .patch("/properties/05a429c8-ca25-4007-8854-25c25f734167")
      .send(updatedProperty)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
