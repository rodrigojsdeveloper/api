import { Router } from "express";

import { createUserController } from "../controllers/users/createUser.controller";

const routes = Router();

const usersRoutes = (): Router => {
  routes.post("", createUserController);

  return routes;
};

export { usersRoutes };
