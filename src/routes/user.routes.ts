import { Router } from "express";

import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";
import { isActiveMiddleware } from "../middlewares/isActive.middleware";
import { tokenMiddleware } from "../middlewares/token.middleware";

import { UsersController } from "../controllers/users.controller";

import { userSchema } from "../schemas/user.schema";

const routes = Router();

const usersRoutes = (): Router => {
  routes.post(
    "/signup",
    schemaValidationMiddleware(userSchema),
    new UsersController().create
  );

  routes.get("/", new UsersController().list);

  routes.get("/:id", new UsersController().listProperties);

  routes.delete(
    "/:id",
    tokenMiddleware,
    isActiveMiddleware,
    new UsersController().deactivate
  );

  routes.patch("/:id", new UsersController().activate);

  return routes;
};

export { usersRoutes };
