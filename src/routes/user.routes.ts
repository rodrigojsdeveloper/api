import { Router } from "express";

import { createUserController } from "../controllers/users/createUser.controller";

import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";

import { userSchema } from "../schemas/user.schema";

const routes = Router();

const usersRoutes = (): Router => {
  routes.post("", schemaValidationMiddleware(userSchema), createUserController);

  return routes;
};

export { usersRoutes };
