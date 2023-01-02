import { Router } from "express";

import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";

import { UserController } from "../controllers/user.controller";

import { userSchema } from "../schemas/user.schema";

const routes = Router();

const usersRoutes = (): Router => {
  routes.post(
    "/signup",
    schemaValidationMiddleware(userSchema),
    new UserController().createUserController
  );

  routes.get("/:id", new UserController().listUserPropertiesController);

  routes.delete("/:id", new UserController().deactivateUserController);

  return routes;
};

export { usersRoutes };
