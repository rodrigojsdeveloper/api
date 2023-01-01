import { AppDataSource } from "../../../data-source";
import { userAdm } from "../../mocks";
import { DataSource } from "typeorm";
import { app } from "../../../app";
import request from "supertest";

describe("Tests for user routes", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during DataSource initialization", err)
      );
  });

  afterAll(async () => await connection.destroy());

  test("Must be able to create a user", async () => {
    const response = await request(app).post("/users/signup").send(userAdm);

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
    expect(response.body).not.toHaveProperty("password");
    expect(response.body).toHaveProperty("is_adm");
    expect(response.body).toHaveProperty("is_active");
    expect(response.body).toHaveProperty("created_at");
    expect(response.body).toHaveProperty("updated_at");
    expect(response.body).toHaveProperty("properties");
  });

  test("It should prevent creating a user with an existing email", async () => {
    const response = await request(app).post("/users/signup").send(userAdm);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("Must prevent creating a user with a password of less than 8 characters", async () => {
    userAdm.password = "1"

    const response = await request(app).post("/users/signup").send(userAdm);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("It should prevent creating a user with a password without letters", async () => {
    userAdm.password = "12345678@"

    const response = await request(app).post("/users/signup").send(userAdm);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("It should prevent creating a user with a password without numbers", async () => {
    userAdm.password = "Abcdefgh@"

    const response = await request(app).post("/users/signup").send(userAdm);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("It should prevent creating a user with a password without capital letters", async () => {
    userAdm.password = "abcdefgh@1"

    const response = await request(app).post("/users/signup").send(userAdm);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("It should prevent creating a user with a password without lowercase letters", async () => {
    userAdm.password = "ABCDEFGH@1"

    const response = await request(app).post("/users/signup").send(userAdm);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("It should prevent creating a user with a password without special characters", async () => {
    userAdm.password = "Abcd1234"

    const response = await request(app).post("/users/signup").send(userAdm);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });
});
