import { Router } from "express";

import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";

import { UsersController } from "../controllers/users.controller";

import { userSchema } from "../schemas/user.schema";

const routes = Router();

const usersRoutes = (): Router => {
  routes.post(
    "/signup",
    schemaValidationMiddleware(userSchema),
    new UsersController().create
  );

  routes.get("/:id", new UsersController().listProperties);

  routes.delete("/:id", new UsersController().deactivate);

  return routes;
};

export { usersRoutes };
