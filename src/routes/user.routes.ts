import { Router } from "express";

import { schemaValidationMiddleware } from "../middlewares/schemaValidation.middleware";

import { UsersControllers } from "../controllers/users.controller";

import { userSchema } from "../schemas/user.schema";

const routes = Router();

const usersRoutes = (): Router => {
  routes.post(
    "/signup",
    schemaValidationMiddleware(userSchema),
    new UsersControllers().create
  );

  routes.get("/:id", new UsersControllers().listProperties);

  routes.delete("/:id", new UsersControllers().deactivate);

  return routes;
};

export { usersRoutes };
