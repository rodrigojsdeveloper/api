import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import { app } from "../../app";
import request from "supertest";
import {
  loginAdm,
  loginNotAdm,
  property,
  userAdm,
  userNotAdm,
  updatedProperty,
} from "../../mocks";

describe("Testing all property routes", () => {
  let connection: DataSource;
  let login: any;
  let token: string;
  let createdProperty: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during DataSource initialization", err)
      );

    await request(app).post("/api/users/signup").send(userAdm);
    await request(app).post("/api/users/signup").send(userNotAdm);

    login = await request(app).post("/api/signin").send(loginAdm);

    token = login.body.token;

    createdProperty = await request(app)
      .post("/api/properties")
      .send(property)
      .set("Authorization", `Bearer ${token}`);
  });

  afterAll(async () => await connection.destroy());

  test("Must be able to create a property", async () => {
    const response = await request(app)
      .post("/api/properties")
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
  });

  test("Must prevent creating a tokenless property", async () => {
    const response = await request(app).post("/api/properties").send(property);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("Must prevent the creation of a property with a user that is not admin", async () => {
    const login = await request(app).post("/api/signin").send(loginNotAdm);

    const token: string = login.body.token;

    const response = await request(app)
      .post("/api/properties")
      .send(property)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("Must be able to list properties", async () => {
    const response = await request(app)
      .get("/api/properties")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });

  test("Must prevent listing a tokenless properties", async () => {
    const response = await request(app).get("/api/properties");

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("Must be able to specific a property", async () => {
    const response = await request(app)
      .get(`/api/properties/${createdProperty.body.id}`)
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

  test("Must prevent specified a tokenless property", async () => {
    const response = await request(app).get(
      `/api/properties/${createdProperty.body.id}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("Must prevent specified a property with invalid id", async () => {
    const response = await request(app)
      .get("/api/properties/05a429c8-ca25-4007-8854-25c25f734167")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("Must be able to sale a property", async () => {
    const response = await request(app)
      .post(`/api/properties/${createdProperty.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message");
  });

  test("Must prevent sale a tokenless property", async () => {
    createdProperty;

    const response = await request(app).post(
      `/api/properties/${createdProperty.body.id}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("Must prevent sale a property with invalid id", async () => {
    const response = await request(app)
      .post("/api/properties/05a429c8-ca25-4007-8854-25c25f734167")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("Must be able to update a property", async () => {
    const response = await request(app)
      .patch(`/api/properties/${createdProperty.body.id}`)
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

  test("Must prevent updation a tokenless property", async () => {
    const response = await request(app)
      .patch(`/api/properties/${createdProperty.body.id}`)
      .send(updatedProperty);

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("Must prevent the updation of a property with a user that is not admin", async () => {
    const login = await request(app).post("/api/signin").send(loginNotAdm);

    const token: string = login.body.token;

    const response = await request(app)
      .patch(`/api/properties/${createdProperty.body.id}`)
      .send(updatedProperty)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("Must prevent updation a property with invalid id", async () => {
    const response = await request(app)
      .patch("/api/properties/05a429c8-ca25-4007-8854-25c25f734167")
      .send(updatedProperty)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("Must be able to delete a property", async () => {
    const response = await request(app)
      .delete(`/api/properties/${createdProperty.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(204);
  });

  test("Must prevent deletion of a tokenless property", async () => {
    const response = await request(app).delete(
      `/api/properties/${createdProperty.body.id}`
    );

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty("message");
  });

  test("Must prevent the deletion of a property with a user that is not admin", async () => {
    const login = await request(app).post("/api/signin").send(loginNotAdm);

    const token: string = login.body.token;

    const response = await request(app)
      .delete(`/api/properties/${createdProperty.body.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message");
  });

  test("Must prevent deletion a property with invalid id", async () => {
    const response = await request(app)
      .delete("/api/properties/05a429c8-ca25-4007-8854-25c25f734167")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });
});
