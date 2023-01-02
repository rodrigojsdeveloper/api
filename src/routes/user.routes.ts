import { Router } from "express";

import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";

import { UsersControllers } from "../controllers/users.controller";

import { userSchema } from "../schemas/user.schema";

const routes = Router();

const usersRoutes = (): Router => {
  routes.post(
    "/signup",
    schemaValidationMiddleware(userSchema),
    new UsersControllers().createUserController
  );

  routes.get("/:id", new UsersControllers().listUserPropertiesController);

  routes.delete("/:id", new UsersControllers().deactivateUserController);

  return routes;
};

export { usersRoutes };
