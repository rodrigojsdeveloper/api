import { Router } from "express";

import { allUserPropertiesController } from "../controllers/users/allUserProperties.controller";
import { deactivateUserController } from "../controllers/users/deactivateUser.controller";
import { createUserController } from "../controllers/users/createUser.controller";

import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";

import { userSchema } from "../schemas/user.schema";

const routes = Router();

const usersRoutes = (): Router => {
  routes.post(
    "/signup",
    schemaValidationMiddleware(userSchema),
    createUserController
  );

  routes.get("/:id", allUserPropertiesController);

  routes.delete("/:id", deactivateUserController);

  return routes;
};

export { usersRoutes };
