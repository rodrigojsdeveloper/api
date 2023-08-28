import { AppDataSource } from "../../data-source";
import { userAdm } from "../../mocks";
import { DataSource } from "typeorm";
import { app } from "../../app";
import request from "supertest";

describe("Testing all user routes", () => {
  let connection: DataSource;
  let createdUser: any;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => (connection = res))
      .catch((err) =>
        console.error("Error during DataSource initialization", err)
      );

    createdUser = await request(app).post("/users/signup").send(userAdm);
  });

  afterAll(async () => await connection.destroy());

  test("Must be able to create a user", async () => {
    expect(createdUser.status).toBe(201);

    expect(createdUser.body).toHaveProperty("id");
    expect(createdUser.body).toHaveProperty("name");
    expect(createdUser.body).toHaveProperty("email");
    expect(createdUser.body).not.toHaveProperty("password");
    expect(createdUser.body).toHaveProperty("is_adm");
    expect(createdUser.body).toHaveProperty("is_active");
    expect(createdUser.body).toHaveProperty("created_at");
    expect(createdUser.body).toHaveProperty("updated_at");
    expect(createdUser.body).toHaveProperty("properties");
  });

  test("It should prevent creating a user with an existing email", async () => {
    const response = await request(app).post("/users/signup").send(userAdm);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("Must prevent creating a user with a password of less than 8 characters", async () => {
    userAdm.password = "1";

    const response = await request(app).post("/users/signup").send(userAdm);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("It should prevent creating a user with a password without letters", async () => {
    userAdm.password = "12345678@";

    const response = await request(app).post("/users/signup").send(userAdm);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("It should prevent creating a user with a password without numbers", async () => {
    userAdm.password = "Abcdefgh@";

    const response = await request(app).post("/users/signup").send(userAdm);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("It should prevent creating a user with a password without capital letters", async () => {
    userAdm.password = "abcdefgh@1";

    const response = await request(app).post("/users/signup").send(userAdm);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("It should prevent creating a user with a password without lowercase letters", async () => {
    userAdm.password = "ABCDEFGH@1";

    const response = await request(app).post("/users/signup").send(userAdm);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("It should prevent creating a user with a password without special characters", async () => {
    userAdm.password = "Abcd1234";

    const response = await request(app).post("/users/signup").send(userAdm);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
  });

  test("Must be able to list user properties", async () => {
    const response = await request(app).get(`/users/${createdUser.body.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("map");
  });

  test("Must prevent listing user properties with invalid id", async () => {
    const response = await request(app).get(
      "/users/05a429c8-ca25-4007-8854-25c25f734167"
    );

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
  });

  test("Must be able to deactive user", async () => {
    const response = await request(app).delete(`/users/${createdUser.body.id}`);

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
